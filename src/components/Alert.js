import '../styles/alert.sass'

import { ref, computed, h, nextTick, onMounted } from 'vue'
import {
  TITLE_TEXT_MAX_LENGTH,
  MESSAGE_TYPE_INFO,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_CONFIRM,
  DIALOG_HEADER_CLASS
} from '../constants'
import { getLanguage } from '../language'
import { calculateDialogTop, textTruncate } from '../utils/helper'
import { commonProps } from '../utils/dialog'

export default {
  name: 'DialogAlert',
  props: {
    ...commonProps,
    /**
     * Message type
     *
     * - `info` - default
     * - `warning`
     * - `error`
     * - `success`
     * - `confirm`
     */
    messageType: { type: String, default: MESSAGE_TYPE_INFO },
    icon: { type: Boolean, default: true },
    iconClassName: { type: String, default: '' }
  },
  setup (props) {
    const btnOk = ref()

    const shadow = computed(() => {
      if (
        props.messageType === MESSAGE_TYPE_WARNING ||
        props.messageType === MESSAGE_TYPE_ERROR ||
        props.messageType === MESSAGE_TYPE_SUCCESS
      ) {
        return `v-dialog__shadow--${props.messageType.toLowerCase()}`
      }
      return ''
    })
    const iconClass = computed(() => props.icon ? props.iconClassName : 'no-icon')

    function generateHeader () {
      const { titleContent } = this
      if (titleContent === false) return

      const text = textTruncate(titleContent, TITLE_TEXT_MAX_LENGTH)
      return h('div', { class: DIALOG_HEADER_CLASS }, h('h3', text))
    }
    function generateButtons () {
      const i18n = getLanguage(this.language)
      const buttons = []
      // Okay button
      const okButtonOption = {
        type: 'button',
        class: 'v-dialog-btn__ok',
        ref: btnOk,
        onClick: () => { this.closeDialog(false) }
      }
      buttons.push(h('button', okButtonOption, i18n.btnOk))
      // Cancel button
      if (props.messageType === MESSAGE_TYPE_CONFIRM) {
        const cancelButtonOption = {
          type: 'button',
          class: 'v-dialog-btn__cancel',
          onClick: () => { this.closeDialog(true) }
        }
        buttons.push(h('button', cancelButtonOption, i18n.btnCancel))
      }

      return h('div', { class: 'v-dialog-alert__buttons' }, buttons)
    }
    function generateBody () {
      // dialog body
      const contentOption = {
        class: 'v-dialog-alert__content',
        innerHTML: props.message
      }
      const bodyOption = {
        class: 'v-dialog-body',
        style: {
          height: this.bodyHeight + 'px'
        }
      }
      return h('div', bodyOption, [
        h('div', { class: ['v-dialog-alert', iconClass.value] }, [
          h('div', contentOption),
          generateButtons()
        ])
      ])
    }

    onMounted(() => {
      nextTick(() => {
        const header = this.$el.querySelector(`.${DIALOG_HEADER_CLASS}`)
        const headerHeight = this.titleContent ? header.offsetHeight : 0
        this.bodyHeight = props.height - headerHeight

        this.dialogTop = calculateDialogTop(props.height)
        btnOk.value.focus()
      })
    })

    return () => {
      const contents = []

      contents.push(generateHeader())
      contents.push(generateBody())

      const dialog = h('div', {
        class: 'v-dialog-dialog',
        style: this.dialogStyles
      }, [
        this.generateDialogContent({
          className: ['v-dialog-content', shadow.value],
          transitionName: 'v-dialog--candy',
          child: contents
        })
      ])

      return h('div', [
        this.generateDialogScreen(dialog),
        this.generateBackdrop()
      ])
    }
  }
}
