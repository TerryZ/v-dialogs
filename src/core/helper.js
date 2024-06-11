import {
  MESSAGE_TYPE_CONFIRM,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  START_Z_INDEX,
  Z_INDEX_INCREMENT,
  TITLE_TEXT_MAX_LENGTH
} from '../constants'
import languages, { EN } from '../language'
import { baseProps, baseEmits } from './base'

export function mergeDialogProps (props) {
  return { ...baseProps, ...props }
}

export function mergeDialogEmits (emits = []) {
  return [...baseEmits, ...emits]
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

/**
 * Calculate the top of the dialog
 * @param {number} height - dialog height
 */
export function calculateDialogTop (height) {
  const browserHeight = window.innerHeight || document.documentElement.clientHeight
  return (browserHeight - height) / 2
}

export function calculateDialogZIndex (index) {
  // setup dialog and backdrop z-index
  const dialogZIndex = START_Z_INDEX + (Z_INDEX_INCREMENT * index)
  const backdropZIndex = dialogZIndex - 10
  return { dialogZIndex, backdropZIndex }
}
/**
 * Get language resource by language code
 * @param {string} code - language code
 * @returns {object} language resource
 */
export function getLanguage (lang = EN) {
  const key = String(lang).toLowerCase()

  if (key in languages) return languages[key]

  return languages[EN]
}

/**
 * Text truncation
 * @param {string} text - source string
 * @param {number} keepLength - save string length
 * @returns {string} truncated string
 */
export function textTruncate (text, keepLength = TITLE_TEXT_MAX_LENGTH) {
  if (typeof text !== 'string') return ''
  if (text.length <= keepLength) return text
  return text.substring(0, keepLength) + '...'
}

export function isDocumentBodyOverflowing () {
  return document.body.scrollHeight > window.innerHeight
}

export function hideDocumentBodyOverflow () {
  if (!isDocumentBodyOverflowing()) return
  if (document.body.style.overflowY === 'hidden') return

  const documentWidth = document.documentElement.clientWidth
  const scrollBarWidth = window.innerWidth - documentWidth
  document.body.style.paddingRight = `${scrollBarWidth}px`
  document.body.style.overflowY = 'hidden'
}

export function restoreDocumentBodyOverflow () {
  document.body.style.removeProperty('overflow-y')
  document.body.style.removeProperty('padding-right')
}

export function cssValue (value, unit = 'px') {
  if (typeof value === 'number') {
    return `${value}${unit}`
  }
  return value // string value
}
