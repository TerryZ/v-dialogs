import { EN } from './language'

export const propsInjectionKey = Symbol('props')

export const DEFAULT_INSTANCE_NAME = '$dlg'
export const DIALOG_KEY_PREFIX = 'v-dialogs-'
export const DIALOG_HEADER_CLASS = 'v-dialog-header'
export const START_Z_INDEX = 5100
export const Z_INDEX_INCREMENT = 50
// TODO: to remove
export const TITLE_TEXT_MAX_LENGTH = 30
export const FULL_WIDTH = '100vw'
export const FULL_HEIGHT = '100vh'

export const ALERT_WIDTH = 450
export const ALERT_WIDTH_LARGE = 700
export const ALERT_HEIGHT = 210
export const ALERT_HEIGHT_LARGE = 400
export const ALERT_MAX_CONTENT_LENGTH = 70

export const MESSAGE_WIDTH = 350
export const MESSAGE_HEIGHT = 56
export const MESSAGE_EXPAND_HEIGHT = 200
export const MESSAGE_OFFSET = 32
export const MESSAGE_GAP = 15

export const TOAST_OFFSET = 16
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

export const DRAWER_WIDTH = 400
export const DRAWER_HEIGHT = 300

export const PLACEMENT_TOP = 'top'
export const PLACEMENT_BOTTOM = 'bottom'
export const PLACEMENT_LEFT = 'left'
export const PLACEMENT_RIGHT = 'right'
export const PLACEMENT_TOP_LEFT = 'top-left'
export const PLACEMENT_TOP_RIGHT = 'top-right'
export const PLACEMENT_BOTTOM_LEFT = 'bottom-left'
export const PLACEMENT_BOTTOM_RIGHT = 'bottom-right'

export const EMIT_CLOSE = 'close'
export const EMIT_RENDER_DIALOG = 'render-dialog'

export const EVENT_MESSAGE_ADJUST_POSITION = 'v-dialog-message-adjust-position'

export const placements = [PLACEMENT_TOP, PLACEMENT_BOTTOM, PLACEMENT_LEFT, PLACEMENT_RIGHT]
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
  MASK,
  MESSAGE
] = ['modal', 'alert', 'toast', 'drawer', 'mask', 'message']

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
