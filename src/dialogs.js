import { ref, nextTick } from 'vue'

import { DIALOG_KEY_PREFIX } from './constants'

const dialogs = ref([])
let serialNumber = 0

export function addDialog () {
  const key = DIALOG_KEY_PREFIX + ++serialNumber
  dialogs.value.push({
    key,
    singletonKey: ''
  })
  return key
}

export function closeDialog (key) {
  if (!dialogs.value.length) return
  closeDialog(key || dialogs.value[dialogs.value.length - 1].key)
}

export function closeAll (callback) {
  if (dialogs.value.length) {
    dialogs.value = []
  }

  nextTick(() => {
    if (typeof callback === 'function') callback()
  })
}
