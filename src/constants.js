import { EN } from './language'

export const propsInjectionKey = Symbol('props')

export const DEFAULT_INSTANCE_NAME = '$dlg'
export const DIALOG_KEY_PREFIX = 'v-dialogs-'
export const DIALOG_HEADER_CLASS = 'v-dialog-header'
export const START_Z_INDEX = 5100
export const Z_INDEX_INCREMENT = 50
export const TITLE_TEXT_MAX_LENGTH = 30

export const ALERT_WIDTH = 450
export const ALERT_WIDTH_LARGE = 700
export const ALERT_HEIGHT = 210
export const ALERT_HEIGHT_NO_HEADER = 180
export const ALERT_HEIGHT_LARGE = 400
export const ALERT_MAX_CONTENT_LENGTH = 70

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
export const MODAL_MIN_WIDTH = 300
export const MODAL_MIN_HEIGHT = 100

export const MESSAGE_TYPE_INFO = 'info'
export const MESSAGE_TYPE_WARNING = 'warning'
export const MESSAGE_TYPE_ERROR = 'error'
export const MESSAGE_TYPE_SUCCESS = 'success'
export const MESSAGE_TYPE_CONFIRM = 'confirm'

export const EMIT_NAME_CLOSE = 'close'
export const EMIT_NAME_RENDER_DIALOG = 'render-dialog'

export const colorfulShadowTypes = [
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS
]

export const [
  MODAL,
  ALERT,
  TOAST,
  DRAWER,
  MASK
] = ['modal', 'alert', 'toast', 'drawer', 'mask']

const defaultOptionsCore = {
  language: EN,
  customClass: undefined,
  singletonKey: undefined,
  duration: 0,
  shake: false
}

export const defaultModalOptions = {
  ...defaultOptionsCore,
  shake: true,
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
  colorfulShadow: false,
  cancelCallback: undefined
}

export const defaultMaskOptions = {
  ...defaultOptionsCore,
  shake: true
}

export const defaultToastOptions = {
  ...defaultOptionsCore,
  messageType: MESSAGE_TYPE_INFO,
  icon: true,
  closeButton: true,
  position: 'bottomRight'
}

export const defaultDrawerOptions = {
}
