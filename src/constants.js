import { CN } from './language'

export const DEFAULT_INSTANCE_NAME = '$dlg'
export const DIALOG_KEY_PREFIX = 'v-dialogs-'
export const DIALOG_HEADER_CLASS = 'v-dialog-header'
export const START_Z_INDEX = 5100
export const TITLE_TEXT_MAX_LENGTH = 10

export const ALERT_WIDTH = 450
export const ALERT_WIDTH_LARGE = 700
export const ALERT_HEIGHT = 210
export const ALERT_HEIGHT_NO_HEADER = 180
export const ALERT_HEIGHT_LARGE = 400
export const ALERT_MAX_CONTENT_LENGTH = 70
export const ALERT_ICON_INFO = 'alertInfo'
export const ALERT_ICON_WARNING = 'alertWarning'
export const ALERT_ICON_SUCCESS = 'alertSuccess'
export const ALERT_ICON_ERROR = 'alertError'
export const ALERT_ICON_CONFIRM = 'alertConfirm'

export const MASK_MAX_CONTENT_LENGTH = 65

export const TOAST_MAX_CONTENT_LENGTH = 56
export const TOAST_CLASS_WARNING = 'toast-warning'
export const TOAST_CLASS_SUCCESS = 'toast-success'
export const TOAST_CLASS_ERROR = 'toast-error'
export const TOAST_ICON_INFO = 'dlg-icon-toast--info'
export const TOAST_ICON_WARNING = 'dlg-icon-toast--warn'
export const TOAST_ICON_SUCCESS = 'dlg-icon-toast--success'
export const TOAST_ICON_ERROR = 'dlg-icon-toast--error'

export const MODAL_WIDTH = 700
export const MODAL_HEIGHT = 400

export const MESSAGE_TYPE_INFO = 'info'
export const MESSAGE_TYPE_WARNING = 'warning'
export const MESSAGE_TYPE_ERROR = 'error'
export const MESSAGE_TYPE_SUCCESS = 'success'
export const MESSAGE_TYPE_CONFIRM = 'confirm'

export const [
  MODAL,
  ALERT,
  TOAST,
  DRAWER,
  MASK
] = ['modal', 'alert', 'toast', 'drawer', 'mask']

const defaultOptionsCore = {
  language: CN,
  customClass: undefined,
  singletonKey: undefined
}

export const defaultModalOptions = {
  ...defaultOptionsCore,
  shaking: true,
  title: 'Dialog',
  width: MODAL_WIDTH,
  height: MODAL_HEIGHT,
  params: undefined,
  closeButton: true,
  maxButton: true,
  fullscreen: false,
  callback: undefined
}

export const defaultAlertOptions = {
  ...defaultOptionsCore,
  messageType: MESSAGE_TYPE_INFO,
  icon: true,
  shaking: true,
  closeTime: false,
  cancelCallback: false
}

export const defaultMaskOptions = {
  ...defaultOptionsCore,
  shaking: true,
  closeTime: false
}

export const defaultToastOptions = {
  ...defaultOptionsCore,
  messageType: MESSAGE_TYPE_INFO,
  icon: true,
  closeButton: true,
  closeTime: false,
  position: 'bottomRight'
}

export const defaultDrawerOptions = {
}
