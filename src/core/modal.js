import { defaultModalOptions } from '../constants'
import { createDialog } from './manage'

import TheDialogModal from '../modules/modal/DialogModal'

/**
 * Open a modal dialog
 *
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns
 */
export function DialogModal (component, options) {
  const props = { ...defaultModalOptions, ...options }
  props.component = component

  return createDialog(TheDialogModal, props)
}
