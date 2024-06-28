import {
  colorfulShadowTypes,
  ALERT_MAX_CONTENT_LENGTH,
  ALERT_WIDTH_LARGE,
  ALERT_HEIGHT_LARGE,
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
  const { width, height } = getAlertSize(props)
  const lang = getLanguage(props.language)

  setDialogSize(width, height)

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
 * Get Alert dialog size
 * @param {object} props
 * @returns {object} dialog size
 */
function getAlertSize (props) {
  const { message } = props
  // large text
  if (message.length > ALERT_MAX_CONTENT_LENGTH) {
    return { width: ALERT_WIDTH_LARGE, height: ALERT_HEIGHT_LARGE }
  }

  return { width: ALERT_WIDTH, height: ALERT_HEIGHT }
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
