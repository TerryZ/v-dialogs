import languages, { EN } from '../language'
import {
  ALERT_HEIGHT,
  ALERT_HEIGHT_LARGE,
  ALERT_HEIGHT_NO_HEADER,
  ALERT_WIDTH,
  ALERT_WIDTH_LARGE,
  ALERT_MAX_CONTENT_LENGTH,
  MESSAGE_TYPE_INFO,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_CONFIRM,
  TOAST_CLASS_WARNING,
  TOAST_CLASS_ERROR,
  TOAST_CLASS_SUCCESS,
  TOAST_ICON_INFO,
  TOAST_ICON_WARNING,
  TOAST_ICON_ERROR,
  TOAST_ICON_SUCCESS,
  START_Z_INDEX,
  Z_INDEX_INCREMENT
} from '../constants'
import IconInfo from '../icons/IconInfo.vue'
import IconWarning from '../icons/IconWarning.vue'
import IconError from '../icons/IconError.vue'
import IconSuccess from '../icons/IconSuccess.vue'
import IconConfirm from '../icons/IconConfirm.vue'

/**
 * Get message type text in i18n resources
 *
 * @param {string} type - message type
 * @param {string} language
 * @returns
 */
export function getTitle (type, language) {
  if (!type || !language) return ''
  const i18n = languages[language]
  switch (type) {
    case MESSAGE_TYPE_WARNING: return i18n.titleWarning
    case MESSAGE_TYPE_ERROR: return i18n.titleError
    case MESSAGE_TYPE_SUCCESS: return i18n.titleSuccess
    case MESSAGE_TYPE_CONFIRM: return i18n.titleConfirm
    default: return i18n.titleInfo
  }
}

/**
 * Get Alert dialog size
 * @param {object} option - dialog options
 * @returns {object} dialog size
 */
export function getAlertSize (option) {
  const { message, title } = option
  const isLargeText = message.length > ALERT_MAX_CONTENT_LENGTH

  if (isLargeText) {
    return { width: ALERT_WIDTH_LARGE, height: ALERT_HEIGHT_LARGE }
  }

  const isHaveHeader = typeof title === 'string' || typeof title === 'undefined'
  const height = isHaveHeader ? ALERT_HEIGHT : ALERT_HEIGHT_NO_HEADER
  return { width: ALERT_WIDTH, height }
}

/**
 * Get alert icon class name
 * @param {string} type - message type
 * @returns {string} class name
 */
export function getAlertIcon (type) {
  switch (type) {
    case MESSAGE_TYPE_INFO: return IconInfo
    case MESSAGE_TYPE_WARNING: return IconWarning
    case MESSAGE_TYPE_ERROR: return IconError
    case MESSAGE_TYPE_SUCCESS: return IconSuccess
    case MESSAGE_TYPE_CONFIRM: return IconConfirm
    default: return ''
  }
}

/**
 * Get toast theme class name
 *
 * @param {string} type - message type
 * @returns {string} class name
 */
export function getToastTheme (type) {
  switch (type) {
    case MESSAGE_TYPE_WARNING: return TOAST_CLASS_WARNING
    case MESSAGE_TYPE_ERROR: return TOAST_CLASS_ERROR
    case MESSAGE_TYPE_SUCCESS: return TOAST_CLASS_SUCCESS
    default: return ''
  }
}

/**
 * Get toast icon class name
 * @param {string} type - message type
 * @returns {string} class name
 */
export function getToastIcon (type) {
  switch (type) {
    case MESSAGE_TYPE_INFO: return TOAST_ICON_INFO
    case MESSAGE_TYPE_WARNING: return TOAST_ICON_WARNING
    case MESSAGE_TYPE_ERROR: return TOAST_ICON_ERROR
    case MESSAGE_TYPE_SUCCESS: return TOAST_ICON_SUCCESS
    default: return ''
  }
}

/**
 * Text truncation
 * @param {string} text - source string
 * @param {number} keepLength - save string length
 * @returns {string} truncated string
 */
export function textTruncate (text, keepLength) {
  if (typeof text !== 'string') return ''
  if (text.length <= keepLength) return text
  return text.substring(0, keepLength) + '...'
}

/**
 * Calculate the top of the dialog
 * @param {number} height - dialog height
 */
export function calculateDialogTop (height) {
  const browserHeight = window.innerHeight || document.documentElement.clientHeight
  return (browserHeight - height) / 2
}

/**
 * Get language resource by language code
 * @param {string} code - language code
 * @returns {object} language resource
 */
export function getLanguage (lang) {
  if (!lang) return languages[EN]

  const key = String(lang).toLowerCase()

  if (key in languages) return languages[key]

  return languages[EN]
}

export function calculateDialogZIndex (index) {
  // setup dialog and backdrop z-index
  const dialogZIndex = START_Z_INDEX + (Z_INDEX_INCREMENT * index)
  const backdropZIndex = dialogZIndex - 10
  return { dialogZIndex, backdropZIndex }
}

export function isDocumentBodyOverflowing () {
  return document.body.scrollHeight > window.innerHeight
}
