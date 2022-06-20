import Vue from 'vue'
import { DialogAlert } from './alert'
import { DialogModal } from './modal'
import { DialogToast } from './toast'
import { DialogMask } from './mask'
import { DialogHelper } from './helper'

export {
  DialogAlert,
  DialogModal,
  DialogToast,
  DialogMask,
  DialogHelper
}

declare interface DialogInstallOption {
  /**
   * The instance name of the dialog
   *
   * @default 'dlg'
   * @example
   *
   * import Dialogs from 'v-dialogs'
   * Vue.use(Dialogs, {
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
   * @param Vue - the Vue instance
   * @param options - install options
   */
  install (Vue:Vue, options: DialogInstallOption): void
}
