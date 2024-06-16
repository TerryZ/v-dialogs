import { onMounted, computed } from 'vue'

import { useDialog } from './base'
import { createDialog } from './manage'
import { parseArgumentsToProps, getLanguage } from './helper'

import TheDialogMask from '../modules/mask/DialogMask'

export function useMask (props, emit) {
  const {
    setDialogSize,
    openDialog,
    closeDialog,
    closeDialogWithCallback,
    setPosition,
    setupAutomaticClose,
    setupPositionAdjustBehavior,
    ...restItems
  } = useDialog(props, emit)

  const lang = getLanguage(props.language)

  const messageText = computed(() => props.message || lang.maskText)

  setDialogSize(undefined, 60)
  setupPositionAdjustBehavior(setPosition)
  setupAutomaticClose(closeDialogWithCallback)

  function cancelAlert () {
    closeDialog(props.cancelCallback)
  }

  onMounted(() => {
    openDialog()
  })

  return {
    ...restItems,
    messageText,
    closeDialog,
    cancelAlert,
    closeDialogWithCallback
  }
}

/**
 * Open a mask overlay
 *
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns {function} call the function to close dialog
 */
export function DialogMask () {
  return createDialog(TheDialogMask, parseArgumentsToProps(...arguments))
}
