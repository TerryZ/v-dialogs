import { ref, nextTick, createVNode, render } from 'vue'

import { DIALOG_KEY_PREFIX } from './constants'

let serialNumber = 0
const dialogs = ref([])

export function mountDialog (component, options = {}) {
  const { index, key } = addDialog()
  let el = document.body.appendChild(document.createElement('div'))
  // const option = {
  //   dialogKey: key,
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
  options.dialogKey = key
  options.dialogIndex = index
  options.onClose = callback => {
    callback && callback()
    destroy()
    closeDialog(key)
  }
  let dialog = createVNode(component, options)

  function destroy () {
    // render(null, document.body)
    render(null, el)
    // el = null
    // el.remove()
    document.body.removeChild(el)
    el = null
    dialog = null
  }

  render(dialog, el)

  // return { remove }
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
