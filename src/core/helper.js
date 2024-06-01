import {
  MESSAGE_TYPE_CONFIRM,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS
} from '../constants'
import { commonProps, commonEmits } from '../utils/dialog'

export const isConfirmType = type => MESSAGE_TYPE_CONFIRM === type

export function mergeDialogProps (props) {
  return { ...commonProps, ...props }
}

export function mergeDialogEmits (emits = []) {
  return [...commonEmits, ...emits]
}

/**
 * Get default title
 *
 * @param {string} type - message type
 * @param {object} lang
 * @returns
 */
export function getDefaultTitle (type, lang) {
  switch (type) {
    case MESSAGE_TYPE_WARNING: return lang.titleWarning
    case MESSAGE_TYPE_ERROR: return lang.titleError
    case MESSAGE_TYPE_SUCCESS: return lang.titleSuccess
    case MESSAGE_TYPE_CONFIRM: return lang.titleConfirm
    default: return lang.titleInfo
  }
}

/**
 * Parse multiple parameters to props
 * @param {any[]} args - arguments
 *
 * @example
 *
 * DialogAlert(message)
 * DialogAlert(message, callback)
 * DialogAlert(message, options)
 * DialogAlert(message, callback, options)
 * DialogAlert(message, options, callback)
 *
 * @returns {object}
 */
export function parseArgumentsToProps (param1, param2, param3) {
  if (
    (typeof param2 === 'object' && typeof param3 === 'object') ||
    (typeof param2 === 'function' && typeof param3 === 'function')
  ) {
    console.warn('Invalid parameters for v-dialogs')
    return
  }

  const params = Array.from(arguments)

  const props = params.find(val => typeof val === 'object') || {}
  props.message = params.find(val => typeof val === 'string') || ''
  props.callback = params.find(val => typeof val === 'function')

  return props
}

export function outsideClick (props, close, shaking) {
  if (!props.backdrop) return

  if (props.backdropClose) return close && close()

  if (!props.shaking) return
  // shake animation playing
  if (shaking.value) return

  // play shake animation
  shaking.value = true
  setTimeout(() => { shaking.value = false }, 750)
}
