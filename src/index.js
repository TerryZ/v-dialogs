import './styles/dialog.sass'
import './styles/animated.sass'

import { DEFAULT_INSTANCE_NAME } from './constants'
import { DialogModal } from './core/modal'
import { DialogMask } from './core/mask'
import { DialogDrawer } from './core/drawer'
import { DialogAlert } from './core/alert'
import { DialogMessage } from './core/message'
import { DialogToast } from './core/toast'

export {
  DialogAlertInfo,
  DialogAlertWarning,
  DialogAlertError,
  DialogAlertSuccess,
  DialogAlertConfirm
} from './core/alert'
export {
  DialogMessageInfo,
  DialogMessageWarning,
  DialogMessageError,
  DialogMessageSuccess
} from './core/message'
export {
  DialogToastInfo,
  DialogToastWarning,
  DialogToastError,
  DialogToastSuccess
} from './core/toast'

export { default as DialogModalBox } from './modules/modal/DialogModalBox'
export { default as DialogDrawerBox } from './modules/drawer/DialogDrawerBox'

export default {
  install (app, options = {}) {
    const instanceName = options?.instanceName || DEFAULT_INSTANCE_NAME
    const dialogs = {
      alert: DialogAlert,
      message: DialogMessage,
      toast: DialogToast,
      modal: DialogModal,
      mask: DialogMask,
      drawer: DialogDrawer
    }
    app.config.globalProperties[instanceName] = dialogs

    // DialogHelper.appContent = app._context
  }
}

export {
  DialogAlert,
  DialogMessage,
  DialogToast,
  DialogModal,
  DialogMask,
  DialogDrawer
}
