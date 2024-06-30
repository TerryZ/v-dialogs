import {
  colorfulShadowTypes,
  ALERT_HEIGHT,
  ALERT_WIDTH,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_CONFIRM,
  messageTypes
} from '../constants'
import { useDialog } from './base-dialog'
import { createDialog } from './manage'
import { parseArgumentsToProps, getLanguage, messageTypeQuickAccess } from './helper'

import TheDialogAlert from '../modules/alert/DialogAlert'
import { onMounted } from 'vue'

export function useAlert (props, emit) {
  const { messageType, colorfulShadow } = props
  const {
    setDialogSize,
    openDialog,
    closeDialog,
    closeWithCallback,
    ...restItems
  } = useDialog(props, emit)
  const lang = getLanguage(props.language)

  setDialogSize(ALERT_WIDTH, ALERT_HEIGHT)

  const isConfirmType = () => MESSAGE_TYPE_CONFIRM === messageType
  function getAlertTypeClass () {
    const types = [
      MESSAGE_TYPE_WARNING,
      MESSAGE_TYPE_ERROR,
      MESSAGE_TYPE_SUCCESS,
      MESSAGE_TYPE_CONFIRM
    ]
    if (!types.includes(messageType)) return ''
    return `alert-${messageType}`
  }
  function getShadowClass () {
    if (
      !colorfulShadow ||
      !colorfulShadowTypes.includes(messageType)
    ) return ''
    return `v-dialog__shadow--${messageType?.toLowerCase()}`
  }
  function cancelAlert () {
    closeDialog(props.cancelCallback)
  }

  onMounted(() => {
    openDialog()
  })

  return {
    ...restItems,
    lang,
    cancelAlert,
    isConfirmType,
    getAlertTypeClass,
    closeWithCallback,
    backdropCloseDialog: closeWithCallback,
    getShadowClass
  }
}

/**
 * Open a message alert dialog
 *
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns {function} call the function to close dialog
 */
export function DialogAlert () {
  return createDialog(TheDialogAlert, parseArgumentsToProps(...arguments))
}

export const {
  DialogAlertInfo,
  DialogAlertWarning,
  DialogAlertError,
  DialogAlertSuccess,
  DialogAlertConfirm
} = messageTypeQuickAccess(
  [MESSAGE_TYPE_CONFIRM, ...messageTypes],
  'DialogAlert',
  TheDialogAlert
)
