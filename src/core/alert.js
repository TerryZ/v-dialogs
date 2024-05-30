import { colorfulShadowTypes } from '../constants'
import { useDialog } from '../utils/dialog'

export function useAlert (props, emit) {
  const { messageType, colorfulShadow } = props
  const { show, dialogStyles, closeDialog } = useDialog(props, emit)

  function getShadowClass () {
    if (
      !colorfulShadow ||
      !colorfulShadowTypes.includes(messageType)
    ) return ''
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
    closeAlert,
    cancelAlert
  }
}
