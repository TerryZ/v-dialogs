import Vue from 'vue'
import Container from '../Container'

import {
  generateAlertOption,
  generateModalOption,
  generateToastOption,
  generateMaskOption
} from './options'
import { MODAL, DRAWER } from '../constants'
import { isDocumentBodyOverflowing } from './helper'

/**
 * Get v-dialogs container instance, if not exist, create a new one
 * @returns {object} the v-dialogs container instance
 */
export function getInstance () {
  const container = document.querySelector('.v-dialogs-container')
  if (container && container.__vue__) {
    return container.__vue__
  }

  const DialogContainer = Vue.extend(Container)
  const div = document.body.appendChild(document.createElement('div'))
  return new DialogContainer().$mount(div)
}

/**
 * Open a Modal dialog
 * @param {VNode} component - vue component
 * @param {object} params - modal parameters
 * @returns {string} new dialog key
 */
export function DialogModal (component, params) {
  if (!component) return
  return getInstance().addDialog(generateModalOption(component, params))
}

/**
 * Open a message alert dialog, types including
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
  return getInstance().addDialog(generateAlertOption(...arguments))
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
  return getInstance().addDialog(generateMaskOption(...arguments))
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
  if (getContainerDialogCount()) return

  document.body.style.removeProperty('overflow-y')
  document.body.style.removeProperty('padding-right')
}
