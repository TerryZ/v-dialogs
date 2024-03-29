import './styles/dialog.sass'
import './styles/animated.sass'

import { DEFAULT_INSTANCE_NAME } from './constants'
import { instanceApi, DialogHelper } from './utils/instance'

// export {
//   DialogModal,
//   DialogAlert,
//   DialogMask,
//   DialogToast,
//   DialogHelper
// } from './utils/instance'
export { DialogAlert, DialogModal, DialogMask } from './utils/instance'
export { DialogHelper }

export default {
  install (app, options = {}) {
    const instanceName = options?.instanceName || DEFAULT_INSTANCE_NAME
    app.config.globalProperties[instanceName] = instanceApi

    DialogHelper.appContent = app._context
  }
}
