import { AppContext } from 'vue'

export * from './alert'
export * from './message'
export * from './toast'
export * from './modal'
export * from './drawer'
export * from './mask'

declare interface DialogInstallOptions {
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
  install (app:AppContext, options: DialogInstallOptions): void
}
