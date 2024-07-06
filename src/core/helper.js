import { isVNode } from 'vue'

import {
  MESSAGE_TYPE_CONFIRM,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  START_Z_INDEX,
  Z_INDEX_INCREMENT
} from '../constants'
import languages, { EN } from '../language'
import { baseProps, baseEmits } from './base-settings'
import { createDialog } from './manage'

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

  const props = params.find(val => typeof val === 'object' && !isVNode(val) && !isSFC(val)) || {}
  props.message = params.find(val => typeof val === 'string' || isVNode(val) || isSFC(val)) || ''
  props.callback = params.find(val => typeof val === 'function')

  return props
}

/**
 * Check if content is SFC(Single file component)
 * @param {unknown} content
 */
export function isSFC (content) {
  if (typeof content !== 'object') return false
  if (Object.hasOwn(content, 'render')) return true
  if (Object.hasOwn(content, 'template')) return true
  if (Object.hasOwn(content, 'setup')) return true
  return false
}

export function isDOM (target) {
  if (typeof target !== 'object') return false
  if (Object.hasOwn(target, 'tagName')) return true
  if (Object.hasOwn(target, 'tagName') && target.outerHTML) return true
  return false
}

/**
 * The top value to center the dialog
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

export function messageTypeQuickAccess (types, prefix, component, setConfig) {
  const quickAccess = {}

  types.forEach(type => {
    const [firstChar, ...restChars] = type
    const name = prefix + firstChar.toUpperCase() + restChars.join('')
    quickAccess[name] = function () {
      const props = {
        ...parseArgumentsToProps(...arguments),
        messageType: type
      }
      const config = setConfig && setConfig(props)
      return createDialog(component, props, config)
    }
  })

  return quickAccess
}
