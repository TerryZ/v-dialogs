import { ref, nextTick, createVNode, render } from 'vue'

import { DIALOG_KEY_PREFIX } from './constants'

let serialNumber = 0
const dialogs = ref([])

export function mountDialog (component, options = {}) {
  const { index, key } = addDialog()
  let el = document.body.appendChild(document.createElement('div'))

  options.dialogKey = key
  options.dialogIndex = index
  options.onClose = callback => {
    callback && callback()
    destroy()
    closeDialog(key)
  }

  let dialog = createVNode(component, options)
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
  const key = DIALOG_KEY_PREFIX + ++serialNumber
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
