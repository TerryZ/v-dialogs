import { ref, nextTick, createVNode, render, getCurrentInstance } from 'vue'

import { DIALOG_KEY_PREFIX } from '../constants'

const serialNumber = ref(0)

const opening = ref([])

export function generateDialogKey () {
  serialNumber.value++
  return DIALOG_KEY_PREFIX + serialNumber.value
}

export function createDialog (component, options = {}) {
  const { index, key } = addDialog()

  // console.dir(options)

  const props = {
    ...options,
    dialogKey: key,
    dialogIndex: index,
    onClose: (callback, data) => {
      callback && callback(data)
      destroy()
      closeDialog(key)
    }
  }

  // createVNode is the same as h
  let dialog = createVNode(component, props)

  const globalAppContext = getCurrentInstance()?.appContext ?? null
  dialog.appContext = globalAppContext

  // let root = document.body.appendChild(document.createElement('div'))
  let root = document.createElement('div')
  render(dialog, root)

  const destroy = () => {
    render(null, root)
    // document.body.removeChild(root)
    root = null
    dialog = null
  }

  return { key, destroy }
}

export function addDialog () {
  const key = generateDialogKey()
  console.log(key)
  opening.value.push({
    key,
    singletonKey: ''
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
