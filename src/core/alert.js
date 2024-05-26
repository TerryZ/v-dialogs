import {
  MESSAGE_TYPE_CONFIRM,
  colorfulShadowTypes
} from '../constants'
import { useDialog } from '../utils/dialog'

export function useAlert (props, emit) {
  const { messageType, colorfulShadow } = props
  const { show, dialogStyles, closeDialog } = useDialog(props, emit)

  const isConfirmType = props.messageType === MESSAGE_TYPE_CONFIRM
  function getShadowClass () {
    if (!colorfulShadow || !colorfulShadowTypes.includes(messageType)) {
      return ''
    }
    return `v-dialog__shadow--${messageType?.toLowerCase()}`
  }
  function closeAlert () {
    closeDialog(props.callback)
  }
  function cancelAlert () {
    closeDialog(props.cancelCallback)
  }

  return {
    show,
    dialogStyles,
    closeDialog,
    getShadowClass,
    isConfirmType,
    closeAlert,
    cancelAlert
  }
}
