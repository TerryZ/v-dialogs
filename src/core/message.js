import {
  colorfulShadowTypes,
  MESSAGE_WIDTH,
  MESSAGE_HEIGHT,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_CONFIRM
} from '../constants'
import { useDialog } from './base'
import { createDialog } from './manage'
import { parseArgumentsToProps, getLanguage } from './helper'

import TheDialogMessage from '../modules/message/DialogMessage'

export function useMessage (props, emit) {
  const {
    setDialogSize,
    closeDialogWithCallback,
    shouldControlOverflow,
    ...restItems
  } = useDialog(props, emit)

  shouldControlOverflow.value = false

  setDialogSize(MESSAGE_WIDTH, MESSAGE_HEIGHT)

  return {
    ...restItems,
    lang: getLanguage(props.language),
    closeDialogWithCallback,
    backdropCloseDialog: closeDialogWithCallback
  }
}

export function getAlertClass (type) {
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
 * Open a message notification dialog
 *
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns {function} call the function to close dialog
 */
export function DialogMessage () {
  return createDialog(TheDialogMessage, parseArgumentsToProps(...arguments))
}
