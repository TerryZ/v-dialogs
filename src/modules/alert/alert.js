import {
  colorfulShadowTypes,
  ALERT_WIDTH,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_CONFIRM,
  quickAccessTypes
} from '../../constants'
import { useDialog } from '../../core/base-dialog'
import { createDialog } from '../../core/manage'
import { parseArgumentsToProps, getLanguage, messageTypeQuickAccess } from '../../core/helper'

import TheDialogAlert from './DialogAlert'
import { onMounted } from 'vue'

export function useAlert (props, emit, expose) {
  const { messageType, colorfulShadow } = props
  const {
    setDialogSize,
    openDialog,
    closeDialog,
    closeWithCallback,
    ...restItems
  } = useDialog(props, emit)
  const lang = getLanguage(props.language)
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

  setDialogSize(ALERT_WIDTH, 'auto')

  onMounted(openDialog)

  expose({
    close: closeWithCallback
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
  [...quickAccessTypes, MESSAGE_TYPE_CONFIRM],
  'DialogAlert',
  TheDialogAlert
)
