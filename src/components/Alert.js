import '../styles/alert.sass'

import { ref, computed, h, nextTick, onMounted, defineComponent } from 'vue'
import {
  TITLE_TEXT_MAX_LENGTH,
  MESSAGE_TYPE_INFO,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_CONFIRM,
  DIALOG_HEADER_CLASS
} from '../constants'
import { textTruncate, getLanguage, calculateDialogZIndex, getAlertIcon } from '../utils/helper'
import { commonProps, commonEmits, useDialog } from '../utils/dialog'
import { useRenderPopup } from '../utils/render'
// import { closeDialog } from '../dialogs'

export default defineComponent({
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
    shaking: { type: Boolean, default: true },
    icon: { type: Boolean, default: true },
    cancelCallback: { type: Function, default: undefined }
  },
  emits: commonEmits,
  setup (props, { emit }) {
    const { show, dialogStyles, closeDialog } = useDialog(props, emit)
    const {
      generateBackdrop,
      generateDialogContainer,
      generateDialogContent
    } = useRenderPopup(props, show)
    const { dialogZIndex, backdropZIndex } = calculateDialogZIndex(props.dialogIndex)
    const lang = getLanguage(props.language)

    const btnOk = ref()
    const header = ref()
    const bodyHeight = ref(0)

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

    function generateHeader () {
      if (!props.header) return

      const text = textTruncate(props.title, TITLE_TEXT_MAX_LENGTH)
      return h('div', { class: DIALOG_HEADER_CLASS, ref: header }, h('h3', text))
    }
    function generateButtons () {
      const buttons = []
      // Okay button
      const okButtonOption = {
        type: 'button',
        class: 'v-dialog-btn__ok',
        ref: btnOk,
        onClick: () => { closeDialog(props.callback) }
      }
      buttons.push(h('button', okButtonOption, lang.btnOk))
      // Cancel button
      if (props.messageType === MESSAGE_TYPE_CONFIRM) {
        const cancelButtonOption = {
          type: 'button',
          class: 'v-dialog-btn__cancel',
          onClick: () => { closeDialog(props.cancelCallback) }
        }
        buttons.push(h('button', cancelButtonOption, lang.btnCancel))
      }

      return h('div', { class: 'v-dialog-alert__buttons' }, buttons)
    }
    function generateBody () {
      const contents = []

      if (props.icon) {
        contents.push(
          h('div', { class: 'v-dialog-alert__icon' }, h(getAlertIcon(props.messageType)))
        )
      }
      contents.push(
        h('div', {
          class: 'v-dialog-alert__message',
          innerHTML: props.message
        })
      )

      const bodyOption = {
        class: ['v-dialog-body v-dialog-alert', { 'no-icon': !props.icon }],
        style: {
          height: bodyHeight.value + 'px'
        }
      }
      return h('div', bodyOption, [
        h('div', { class: 'v-dialog-alert__content' }, contents),
        generateButtons()
      ])
    }

    onMounted(() => {
      show.value = true

      nextTick(() => {
        const headerHeight = header.value?.offsetHeight || 0
        bodyHeight.value = props.height - headerHeight

        btnOk.value.focus()
      })
    })

    return () => {
      const dialog = h(
        'div',
        {
          class: 'v-dialog-dialog',
          style: dialogStyles.value
        },
        generateDialogContent({
          className: ['v-dialog-content', shadow.value],
          transitionName: 'v-dialog--candy',
          child: [generateHeader(), generateBody()]
        })
      )

      return [
        generateDialogContainer(dialog, { dialogZIndex }, closeDialog),
        generateBackdrop({ backdropZIndex })
      ]
    }
  }
})
