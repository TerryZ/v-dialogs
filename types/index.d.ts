import { AppContext } from 'vue'

import {
  DialogAlert,
  DialogAlertWarning,
  DialogAlertError,
  DialogAlertSuccess,
  DialogAlertConfirm
} from './alert'
import {
  DialogMessage,
  DialogMessageWarning,
  DialogMessageError,
  DialogMessageSuccess
} from './message'
import {
  DialogToast,
  DialogToastWarning,
  DialogToastError,
  DialogToastSuccess
} from './toast'
import { DialogModal } from './modal'
import { DialogMask } from './mask'

export {
  DialogAlert,
  DialogAlertWarning,
  DialogAlertError,
  DialogAlertSuccess,
  DialogAlertConfirm,
  DialogMessage,
  DialogMessageWarning,
  DialogMessageError,
  DialogMessageSuccess,
  DialogToast,
  DialogToastWarning,
  DialogToastError,
  DialogToastSuccess,
  DialogModal,
  DialogMask
}

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
