import { getLanguage } from '../language'
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
  getAlertSize,
  getAlertIcon,
  getToastTheme,
  getToastIcon
} from './helper'

/**
 * Arguments identification and parse to dialog option
 * @param {any[]} args - arguments
 *
 * @example alert type dialog
 *
 * this.$dlg.alert(message)
 * this.$dlg.alert(message, callback)
 * this.$dlg.alert(message, options)
 * this.$dlg.alert(message, callback, options)
 */
export function argumentsParse (args) {
  let params = {}

  if (args.length === 3 && typeof args[2] === 'object') {
    params = args[2]
  }
  if (args.length === 2 && typeof args[1] === 'object') {
    params = args[1]
  }
  if (typeof args[1] === 'function') {
    params.callback = args[1]
  }

  params.message = typeof args[0] === 'string' ? args[0] : ''
  return params
}

export function generateAlertOption () {
  const option = Object.assign({}, defaultAlertOptions, argumentsParse(arguments))
  option.type = ALERT
  const { messageType, icon } = option

  if ('title' in option === false) {
    option.title = getTitle(messageType, option.language)
  }
  if (icon) {
    option.iconClassName = getAlertIcon(messageType)
  }
  const { width, height } = getAlertSize(option)
  option.width = width
  option.height = height
  return option
}

export function generateModalOption (component, params) {
  const option = { ...defaultModalOptions, ...params }
  option.type = MODAL
  option.component = component
  return option
}

export function generateToastOption () {
  const option = Object.assign({}, defaultToastOptions, argumentsParse(arguments))
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
  const option = Object.assign({}, defaultMaskOptions, argumentsParse(arguments))

  option.type = MASK
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
