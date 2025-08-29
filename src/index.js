import './styles/dialog.sass'
import './styles/animated.sass'

import { DEFAULT_INSTANCE_NAME } from './constants'
import { DialogModal } from './modules/modal/modal'
import { DialogMask } from './modules/mask/mask'
import { DialogDrawer } from './modules/drawer/drawer'
import { DialogAlert } from './modules/alert/alert'
import { DialogMessage } from './modules/message/message'
import { DialogToast } from './modules/toast/toast'

export {
  DialogAlertInfo,
  DialogAlertWarning,
  DialogAlertError,
  DialogAlertSuccess,
  DialogAlertConfirm
} from './modules/alert/alert'
export {
  DialogMessageInfo,
  DialogMessageWarning,
  DialogMessageError,
  DialogMessageSuccess
} from './modules/message/message'
export {
  DialogToastInfo,
  DialogToastWarning,
  DialogToastError,
  DialogToastSuccess
} from './modules/toast/toast'

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
