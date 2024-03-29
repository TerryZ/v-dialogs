import { ref, nextTick, createVNode, render } from 'vue'

import { DIALOG_KEY_PREFIX } from './constants'

let serialNumber = 1
const dialogs = ref([])

export function mountDialog (component, options = {}) {
  const { index, key } = addDialog()

  console.dir(options)

  const close = (callback, data) => {
    callback && callback(data)
    destroy()
    closeDialog(key)
  }

  let dialog = createVNode(component, {
    ...options,
    dialogKey: key,
    dialogIndex: index,
    onClose: close
  })
  let el = document.body.appendChild(document.createElement('div'))
  render(dialog, el)

  function destroy () {
    render(null, el)
    document.body.removeChild(el)
    el = null
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

  console.log(key)
}

export function closeAll (callback) {
  if (dialogs.value.length) {
    dialogs.value = []
  }

  nextTick(() => {
    if (typeof callback === 'function') callback()
  })
}
