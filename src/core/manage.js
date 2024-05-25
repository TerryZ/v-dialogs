import { ref } from 'vue'

import { DIALOG_KEY_PREFIX } from './constants'

const serialNumber = ref(0)

const opening = ref([])

export function generateDialogKey () {
  serialNumber.value++
  return DIALOG_KEY_PREFIX + serialNumber.value
}

