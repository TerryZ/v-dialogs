import {
  MODAL,
  ALERT,
  MASK,
  TOAST,
  defaultModalOptions,
  defaultAlertOptions,
  defaultMaskOptions,
  defaultToastOptions
} from '../constants'
import {
  getTitle,
  getToastTheme,
  getToastIcon,
  getLanguage
} from './helper'

/**
 * Parse multiple parameters to one options
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
export function parseArguments (param1, param2, param3) {
  if (
    (typeof param2 === 'object' && typeof param3 === 'object') ||
    (typeof param2 === 'function' && typeof param3 === 'function')
  ) {
    console.warn('Invalid parameters for v-dialogs')
    return
  }

  const params = Array.from(arguments)

  const options = params.find(val => typeof val === 'object') || {}
  options.message = params.find(val => typeof val === 'string') || ''
  options.callback = params.find(val => typeof val === 'function')

  return options
}

export function generateAlertOption () {
  const options = Object.assign({}, defaultAlertOptions, parseArguments(...arguments))

  // const { width, height } = getAlertSize(options)
  // options.width = width
  // options.height = height
  return options
}

export function generateModalOption (component, params) {
  const option = { ...defaultModalOptions, ...params }
  option.component = component

  return option
}

export function generateToastOption () {
  const option = Object.assign({}, defaultToastOptions, parseArguments(arguments))
  const { messageType, icon } = option
  option.type = TOAST
  option.width = 300
  option.height = 80
  if (icon) {
    option.iconClassName = getToastIcon(messageType)
  }
  if ('title' in option === false) {
    option.title = getTitle(messageType, option.language)
  }
  option.contentClass = getToastTheme(messageType)
  return option
}

export function generateMaskOption () {
  const option = Object.assign({}, defaultMaskOptions, parseArguments(arguments))

  option.message = option.message || getLanguage(option.language).maskText
  option.width = 300
  option.height = 80
  option.backdrop = true
  return option
}

export function generateDrawerOption () {

}

/**
 * Merge user option and type default option
 * @param {object} option - dialog option
 * @param {number} index - dialog index
 * @param {function} close - the function of close dialog
 * @returns {object} - merged dialog option
 */
export function generateDialogRenderOption (option, index, close) {
  const { type, dialogKey } = option
  const options = {
    ref: dialogKey,
    key: dialogKey,
    class: option.customClass,
    props: {
      type,
      dialogKey,
      dialogIndex: index,
      width: option.width,
      height: option.height,
      closeTime: option.closeTime,
      backdrop: option.backdrop,
      backdropClose: option.backdropClose,
      shaking: option.shaking,
      titleContent: option.title,
      language: option.language
    },
    on: {
      close
    }
  }

  if (type !== MODAL) {
    options.props.message = option.message
    options.props.icon = option.icon
  }
  if (type !== MASK) {
    options.props.cancelCallback = option.cancelCallback
  }
  switch (type) {
    case MODAL:
      options.props = {
        ...options.props,
        component: option.component,
        params: option.params,
        fullscreen: option.fullscreen,
        closeButton: option.closeButton,
        maxButton: option.maxButton
      }
      break
    case MASK:
      options.props.backdrop = true
      break
    case ALERT:
    case TOAST:
      options.props.iconClassName = option.iconClassName
      options.props.messageType = option.messageType
      if (type === TOAST) {
        options.props.position = option.position
        options.props.contentClass = option.contentClass
      }
      break
  }
  return options
}
