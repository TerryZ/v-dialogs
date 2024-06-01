import {
  colorfulShadowTypes,
  ALERT_MAX_CONTENT_LENGTH,
  ALERT_WIDTH_LARGE,
  ALERT_HEIGHT_LARGE,
  ALERT_HEIGHT,
  ALERT_HEIGHT_NO_HEADER,
  ALERT_WIDTH,
  defaultAlertOptions
} from '../constants'
import { useDialog } from '../utils/dialog'
import { createDialog } from './manage'
import { parseArgumentsToProps } from './helper'

import TheDialogAlert from '../modules/alert/DialogAlert'

export function useAlert (props, emit) {
  const { messageType, colorfulShadow } = props
  const {
    setDialogSize,
    closeDialog,
    ...restItems
  } = useDialog(props, emit)
  const { width, height } = getAlertSize(props)

  // console.log(width)
  // console.log(height)

  setDialogSize(width, height)

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

  return {
    ...restItems,
    width,
    height,
    closeDialog,
    getShadowClass,
    cancelAlert
  }
}

/**
 * Get Alert dialog size
 * @param {object} props
 * @returns {object} dialog size
 */
export function getAlertSize (props) {
  const { message, header } = props
  // large text
  if (message.length > ALERT_MAX_CONTENT_LENGTH) {
    return { width: ALERT_WIDTH_LARGE, height: ALERT_HEIGHT_LARGE }
  }

  const height = header ? ALERT_HEIGHT : ALERT_HEIGHT_NO_HEADER
  return { width: ALERT_WIDTH, height }
}

/**
 * Open a message alert dialog
 *
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns
 */
export function DialogAlert () {
  const userProps = parseArgumentsToProps(...arguments)
  const props = Object.assign({}, defaultAlertOptions, userProps)

  return createDialog(TheDialogAlert, props)
}
