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
  MESSAGE_TYPE_CONFIRM
} from '../constants'
import { useDialog } from './base-dialog'
import { createDialog } from './manage'
import { parseArgumentsToProps, getLanguage } from './helper'

import TheDialogAlert from '../modules/alert/DialogAlert'
import { onMounted } from 'vue'

export function useAlert (props, emit) {
  const { messageType, colorfulShadow } = props
  const {
    setDialogSize,
    openDialog,
    closeDialog,
    closeWithCallback,
    setPosition,
    setupAutomaticClose,
    setupPositionAdjustBehavior,
    ...restItems
  } = useDialog(props, emit)
  const { width, height } = getAlertSize(props)

  const lang = getLanguage(props.language)

  setDialogSize(width, height)
  // setupPositionAdjustBehavior(setPosition)
  setupAutomaticClose(closeWithCallback)

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
    closeDialog,
    cancelAlert,
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
export function getAlertSize (props) {
  const { message } = props
  // large text
  if (message.length > ALERT_MAX_CONTENT_LENGTH) {
    return { width: ALERT_WIDTH_LARGE, height: ALERT_HEIGHT_LARGE }
  }

  return { width: ALERT_WIDTH, height: ALERT_HEIGHT }
}

export function getAlertTypeClass (type) {
  const types = [
    MESSAGE_TYPE_WARNING,
    MESSAGE_TYPE_ERROR,
    MESSAGE_TYPE_SUCCESS,
    MESSAGE_TYPE_CONFIRM
  ]
  if (!types.includes(type)) return ''
  return `alert-${type}`
}

export const isConfirmType = type => MESSAGE_TYPE_CONFIRM === type

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
