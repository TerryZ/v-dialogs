import { ref, nextTick, createVNode, render, getCurrentInstance } from 'vue'

import { DIALOG_KEY_PREFIX } from './constants'

let serialNumber = 1
const dialogs = ref([])

export function mountDialog (component, options = {}) {
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

  function destroy () {
    render(null, root)
    // document.body.removeChild(root)
    root = null
    dialog = null
  }

  return key
}

export function addDialog () {
  const key = DIALOG_KEY_PREFIX + serialNumber++
  dialogs.value.push({
    key,
    singletonKey: ''
  })
  return {
    key,
    index: serialNumber
  }
}

export function closeDialog (key) {
  if (!dialogs.value.length) return
  // closeDialog(key || dialogs.value[dialogs.value.length - 1].key)

  // remove dialog by key
  dialogs.value = dialogs.value.filter(val => val.key !== key)

  // console.log(key)
}

export function closeAll (callback) {
  if (dialogs.value.length) {
    dialogs.value = []
  }

  nextTick(() => {
    if (typeof callback === 'function') callback()
  })
}
