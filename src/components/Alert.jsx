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
    colorfulShadow: { type: Boolean, default: true },
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
      if (!props.colorfulShadow) return ''
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

      return (
        <div class={DIALOG_HEADER_CLASS} ref={header}>
          <h3>{text}</h3>
        </div>
      )
    }
    function generateButtons () {
      const buttons = []
      // Okay button
      buttons.push(
        <button
          type='button'
          class='v-dialog-btn__ok'
          ref={btnOk}
          onClick={() => closeDialog(props.callback)}
        >{lang.btnOk}</button>
      )
      // Cancel button
      if (props.messageType === MESSAGE_TYPE_CONFIRM) {
        buttons.push(
          <button
            type='button'
            class='v-dialog-btn__cancel'
            onClick={() => closeDialog(props.cancelCallback)}
          >{lang.btnCancel}</button>
        )
      }
      return (
        <div class='v-dialog-alert__buttons'>{buttons}</div>
      )
    }
    function generateBody () {
      const contents = []

      if (props.icon) {
        contents.push(
          <div class='v-dialog-alert__icon'>
            { h(getAlertIcon(props.messageType)) }
          </div>
        )
      }
      contents.push(
        <div class='v-dialog-alert__message' v-html={props.message} />
      )

      return (
        <div
          class={['v-dialog-body v-dialog-alert', { 'no-icon': !props.icon }]}
          style={{ height: bodyHeight.value + 'px' }}
        >
          <div class='v-dialog-alert__content'>{contents}</div>
          {generateButtons()}
        </div>
      )
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
      const body = (
        <div class='v-dialog-dialog' style={dialogStyles.value}>
          {
            generateDialogContent({
              className: ['v-dialog-content', shadow.value],
              transitionName: 'v-dialog--candy',
              child: [generateHeader(), generateBody()]
            })
          }
        </div>
      )

      const container = generateDialogContainer(body, { dialogZIndex }, closeDialog)
      const backdrop = generateBackdrop({ backdropZIndex })

      return [backdrop, container]
    }
  }
})
