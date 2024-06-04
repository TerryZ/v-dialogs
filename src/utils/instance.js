import { createApp } from 'vue'
import Container from '../Container'

import {
  generateAlertOption,
  generateModalOption,
  generateToastOption,
  generateMaskOption
} from './options'
import { MODAL, DRAWER } from '../constants'
import { isDocumentBodyOverflowing } from './helper'
import { mountDialog } from '../dialogs'

// import Alert from '../components/Alert'
import TheDialogAlert from '../modules/alert/DialogAlert'
import Modal from '../components/Modal'
import Mask from '../components/Mask'

/**
 * Get v-dialogs container instance, if not exist, create a new one
 * @returns {object} the v-dialogs container instance
 */
export function getInstance () {
  const container = document.getElementById('v-dialogs-container')
  if (container && container._instance) {
    return container._instance
  }

  const div = document.body.appendChild(document.createElement('div'))
  div.id = 'v-dialogs-container'
  const instance = createApp(Container).mount(div)
  div._instance = instance

  // console.dir(instance.$el)
  // document.querySelector('.v-dialogs-container')._instance = instance
  return instance
}

/**
 * Open a Modal dialog
 * @param {VNode} component - vue component
 * @param {object} params - modal parameters
 * @returns {string} new dialog key
 */
export function DialogModal (component, params) {
  if (!component) return
  return mountDialog(Modal, generateModalOption(component, params))
}

/**
 * Open a message alert dialog, including below types
 *
 * - info(default)
 * - warning
 * - error
 * - success
 * - confirm
 *
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns {string} new dialog key
 */
export function DialogAlert () {
  // return getInstance().addDialog(generateAlertOption(...arguments))
  // index++
  // let el = document.body.appendChild(document.createElement('div'))
  // const option = {
  //   dialogKey: `v-dialog-${index}`,
  //   dialogIndex: index,
  //   width: 450,
  //   height: 210,
  //   title: 'Alert',
  //   message: 'Hello!',
  //   shaking: true,
  //   backdropClose: true,
  //   onClose () {
  //     remove()
  //   }
  // }
  // let dialog = createVNode(Alert, option)

  // function remove () {
  //   render(null, el)
  //   document.body.removeChild(el)
  //   el = null
  //   dialog = null
  // }

  // render(dialog, el)
  return mountDialog(TheDialogAlert, generateAlertOption(...arguments))
}

/**
 * Open a Toast dialog (corner dialog)
 *
 * @see DialogAlert
 *
 * position option accept items:
 *
 * - 'topLeft'
 * - 'topCenter'
 * - 'topRight'
 * - 'bottomLeft'
 * - 'bottomCenter'
 * - 'bottomRight'
 */
export function DialogToast () {
  return getInstance().addDialog(generateToastOption(...arguments))
}

/**
 * Open a full screen mask
 *
 * @see DialogAlert
 */
export function DialogMask () {
  return mountDialog(Mask, generateMaskOption(...arguments))
}

export function DialogDrawer () {

}

export const DialogHelper = {
  close (key) {
    getInstance().close(key)
  },
  closeAll (callback) {
    getInstance().closeAll(callback)
  }
}

export const instanceApi = {
  modal () {
    return DialogModal(...arguments)
  },
  alert () {
    return DialogAlert(...arguments)
  },
  mask () {
    return DialogMask(...arguments)
  },
  toast () {
    return DialogToast(...arguments)
  },
  close (key) {
    DialogHelper.close(key)
  },
  closeAll (callback) {
    DialogHelper.closeAll(callback)
  }
}

/**
 * Get the number of container type dialog(Modal, Drawer)
 * @returns {number}
 */
export function getContainerDialogCount () {
  return getInstance()
    .dialogs
    .filter(dialog => [MODAL, DRAWER].includes(dialog.type))
    .length
}

export function hideDocumentBodyOverflow () {
  if (!isDocumentBodyOverflowing()) return
  if (document.body.style.overflowY === 'hidden') return

  const documentWidth = document.documentElement.clientWidth
  const scrollBarWidth = window.innerWidth - documentWidth
  document.body.style.paddingRight = `${scrollBarWidth}px`
  document.body.style.overflowY = 'hidden'
}

export function restoreDocumentBodyOverflow () {
  document.body.style.removeProperty('overflow-y')
  document.body.style.removeProperty('padding-right')
}
