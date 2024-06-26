import { onMounted, computed } from 'vue'

import { useDialog } from './base-dialog'
import { createDialog } from './manage'
import { parseArgumentsToProps, getLanguage } from './helper'

import TheDialogMask from '../modules/mask/DialogMask'

export function useMask (props, emit) {
  const {
    shouldControlOverflow,
    shouldHandleResize,
    setDialogSize,
    openDialog,
    closeDialog,
    closeWithCallback,
    setPosition,
    setupAutomaticClose,
    setupPositionAdjustBehavior,
    ...restItems
  } = useDialog(props, emit)

  const {
    addParentRelative,
    removeParentRelative
  } = useMaskParentHandle(props.appendTo)

  const lang = getLanguage(props.language)
  const messageText = computed(() => props.message || lang.maskText)

  if (props.appendTo !== 'body') {
    shouldHandleResize.value = false
    shouldControlOverflow.value = false
  }

  function closeMaskWithCallback () {
    closeWithCallback(undefined, {
      afterClose: () => removeParentRelative
    })
  }

  addParentRelative()
  setDialogSize(undefined, 60)
  // setupPositionAdjustBehavior(setPosition)
  setupAutomaticClose(closeMaskWithCallback)

  onMounted(() => {
    openDialog()
  })

  return {
    ...restItems,
    messageText,
    closeDialog,
    closeWithCallback
  }
}

function useMaskParentHandle (appendTo) {
  const el = getElement()

  function getElement () {
    if (typeof appendTo === 'string') {
      return document.querySelector(appendTo)
    }
    if (appendTo instanceof HTMLElement) {
      return appendTo
    }
    return undefined
  }
  function addParentRelative () {
    if (appendTo === 'body') return
    el.classList.add('v-dialog-mask-parent--relative')
  }
  function removeParentRelative () {
    if (appendTo === 'body') return
    el.classList.remove('v-dialog-mask-parent--relative')
  }

  return {
    addParentRelative,
    removeParentRelative
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
