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
  install (Vue, options = {}) {
    Object.defineProperty(Vue.prototype, options.instanceName || DEFAULT_INSTANCE_NAME, {
      value: instanceApi
    })
  }
}
