import { DEFAULT_INSTANCE_NAME } from './constants'
import { instanceApi } from './utils/instance'

export {
  DialogModal,
  DialogAlert,
  DialogMask,
  DialogToast,
  DialogHelper
} from './utils/instance'

export default {
  install (app, options = {}) {
    const instanceName = options?.instanceName || DEFAULT_INSTANCE_NAME
    app.config.globalProperties[instanceName] = instanceApi
  }
}
