import './styles/dialog.sass'
import './styles/animated.sass'

// import { DEFAULT_INSTANCE_NAME } from './constants'
// import { instanceApi } from './utils/instance'

export {
  DialogAlert,
  DialogAlertInfo,
  DialogAlertWarning,
  DialogAlertError,
  DialogAlertSuccess,
  DialogAlertConfirm
} from './core/alert'
export {
  DialogMessage,
  DialogMessageInfo,
  DialogMessageWarning,
  DialogMessageError,
  DialogMessageSuccess
} from './core/message'
export {
  DialogToast,
  DialogToastInfo,
  DialogToastWarning,
  DialogToastError,
  DialogToastSuccess
} from './core/toast'
export { DialogModal } from './core/modal'
export { DialogMask } from './core/mask'
export { DialogDrawer } from './core/drawer'

export { default as DialogModalBox } from './modules/modal/DialogModalBox'
export { default as DialogDrawerBox } from './modules/drawer/DialogDrawerBox'

export default {
  install (app, options = {}) {
    // const instanceName = options?.instanceName || DEFAULT_INSTANCE_NAME
    // app.config.globalProperties[instanceName] = instanceApi

    // DialogHelper.appContent = app._context
  }
}
