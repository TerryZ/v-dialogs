import '../styles/alert.sass'

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

import mixins from '../mixins'
import render from '../mixins/render'

export default {
  name: 'DialogAlert',
  mixins: [mixins, render],
  props: {
    /**
     * Dialog message type (work on alert, toast mode)
     *
     * -'info' - default
     * -'warning'
     * -'error'
     * -'success'
     * -'confirm'
     */
    messageType: { type: String, default: MESSAGE_TYPE_INFO },
    icon: { type: Boolean, default: true },
    iconClassName: { type: String, default: '' }
  },
  computed: {
    shadow () {
      const { messageType } = this
      if (messageType === MESSAGE_TYPE_WARNING || messageType === MESSAGE_TYPE_ERROR || messageType === MESSAGE_TYPE_SUCCESS) {
        return `v-dialog__shadow--${messageType.toLowerCase()}`
      }
      return ''
    },
    classes () {
      return {
        'v-dialog': true,
        'v-dialog--buzz-out': this.shake
      }
    },
    iconClass () {
      return this.icon ? this.iconClassName : 'no-icon'
    }
  },
  render (h) {
    const contents = []

    contents.push(this.generateHeader())
    contents.push(this.generateBody())

    const dialog = h('div', {
      class: 'v-dialog-dialog',
      style: this.dialogStyles
    }, [
      this.generateDialogContent({
        className: ['v-dialog-content', this.shadow],
        transitionName: 'v-dialog--candy',
        child: contents
      })
    ])

    return h('div', [
      this.generateDialogScreen(dialog),
      this.generateBackdrop()
    ])
  },
  methods: {
    generateHeader () {
      const { titleContent } = this
      if (titleContent === false) return

      const h = this.$createElement
      const text = textTruncate(titleContent, TITLE_TEXT_MAX_LENGTH)
      const headerText = h('h3', text)
      return h('div', { class: DIALOG_HEADER_CLASS }, [headerText])
    },
    generateBody () {
      const h = this.$createElement
      // dialog body
      const contentOption = {
        class: 'v-dialog-alert__content',
        domProps: {
          innerHTML: this.message
        }
      }
      const bodyOption = {
        class: 'v-dialog-body',
        style: {
          height: this.bodyHeight + 'px'
        }
      }
      return h('div', bodyOption, [
        h('div', { class: ['v-dialog-alert', this.iconClass] }, [
          h('div', contentOption),
          this.generateButtons()
        ])
      ])
    },
    generateButtons () {
      const h = this.$createElement
      const i18n = getLanguage(this.language)
      const buttons = []
      // Okey button
      const okButtonOption = {
        attrs: {
          type: 'button'
        },
        class: 'v-dialog-btn__ok',
        ref: 'btnOk',
        on: {
          click: () => { this.closeDialog(false) }
        }
      }
      buttons.push(h('button', okButtonOption, i18n.btnOk))
      // Cancel button
      if (this.messageType === MESSAGE_TYPE_CONFIRM) {
        const cancelButtonOption = {
          attrs: {
            type: 'button'
          },
          class: 'v-dialog-btn__cancel',
          on: {
            click: () => { this.closeDialog(true) }
          }
        }
        buttons.push(h('button', cancelButtonOption, i18n.btnCancel))
      }

      return h('div', { class: 'v-dialog-alert__buttons' }, buttons)
    }
  },
  mounted () {
    this.$nextTick(() => {
      const { height } = this
      const header = this.$el.querySelector(`.${DIALOG_HEADER_CLASS}`)
      const headerHeight = this.titleContent ? header.offsetHeight : 0
      this.bodyHeight = height - headerHeight

      this.dialogTop = calculateDialogTop(height)
      this.$refs.btnOk.focus()
    })
  }
}
