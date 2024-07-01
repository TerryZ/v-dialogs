export const propsInjectionKey = Symbol('props')

export const DEFAULT_INSTANCE_NAME = '$dlg'
export const DIALOG_KEY_PREFIX = 'v-dialogs-'
export const START_Z_INDEX = 5100
export const Z_INDEX_INCREMENT = 50

export const FULL_WIDTH = '100vw'
export const FULL_HEIGHT = '100vh'

export const ALERT_WIDTH = 450
export const ALERT_HEIGHT = 210

export const MESSAGE_WIDTH = 350
export const MESSAGE_HEIGHT = 56
export const MESSAGE_OFFSET = 32
export const MESSAGE_GAP = 15

export const TOAST_OFFSET = 16

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
export const quickAccessTypes = [
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
