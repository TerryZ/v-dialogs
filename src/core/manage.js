import {
  ref,
  nextTick,
  createVNode,
  render,
  getCurrentInstance,
  mergeProps
} from 'vue'

import { DIALOG_KEY_PREFIX, EVENT_MESSAGE_ADJUST_POSITION } from '../constants'

const serialNumber = ref(0)

export const opening = ref([])
export const messageAdjustPositionEvent = new Event(EVENT_MESSAGE_ADJUST_POSITION)

/**
 * Render a new dialog to the DOM
 * @param {VNode} component Component to render
 * @param {object} options Component props
 * @param {object} configs config properties add to opening list
 * @returns {function} the function to close and destroy dialog
 */
export function createDialog (component, options = {}, configs) {
  const { index, key } = addDialog(configs)

  const props = {
    dialogKey: key,
    dialogIndex: index,
    // Dialog close and destroy
    onClose: () => destroy()
  }

  let dialog = createVNode(component, mergeProps(options, props))

  const globalAppContext = getCurrentInstance()?.appContext ?? null
  dialog.appContext = globalAppContext

  let root = document.createElement('div')
  render(dialog, root)

  const destroy = () => {
    render(null, root)
    root.remove()

    root = null
    dialog = null

    closeDialog(key)
  }

  return () => {
    dialog.component.exposed?.close?.()
  }
}

export function generateDialogKey () {
  return DIALOG_KEY_PREFIX + ++serialNumber.value
}

export function addDialog (configs) {
  const key = generateDialogKey()
  // console.log(key)
  opening.value.push({
    key,
    index: serialNumber.value,
    singletonKey: '',
    ...configs
  })
  return {
    key,
    index: serialNumber.value
  }
}

export function closeDialog (key) {
  if (!opening.value.length) return
  // closeDialog(key || dialogs.value[dialogs.value.length - 1].key)

  // remove dialog by key
  opening.value = opening.value.filter(val => val.key !== key)

  // console.log(key)
}

export function closeAll (callback) {
  if (opening.value.length) {
    opening.value = []
  }

  nextTick(() => {
    if (typeof callback === 'function') callback()
  })
}
