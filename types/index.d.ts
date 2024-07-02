import { AppContext } from 'vue'

export {
  DialogAlert,
  DialogAlertWarning,
  DialogAlertError,
  DialogAlertSuccess,
  DialogAlertConfirm
} from './alert'
export {
  DialogMessage,
  DialogMessageWarning,
  DialogMessageError,
  DialogMessageSuccess
} from './message'
export {
  DialogToast,
  DialogToastWarning,
  DialogToastError,
  DialogToastSuccess
} from './toast'
export { DialogModal, DialogModalBox } from './modal'
export { DialogDrawer, DialogDrawerBox } from './drawer'
export { DialogMask } from './mask'

declare interface DialogInstallOption {
  /**
   * The instance name of the dialog
   *
   * @default 'dlg'
   * @example
   *
   * import Dialogs from 'v-dialogs'
   * createApp().use(Dialogs, {
   *   instanceName: '$dialog'
   * })
   *
   * this.$dialog.alert('Hello World')
   */
  instanceName?: string
}

export default class {
  /**
   * Globally install dialogs
   * @param app - the Vue app instance
   * @param options - globally install options
   */
  install (app:AppContext, options: DialogInstallOption): void
}
