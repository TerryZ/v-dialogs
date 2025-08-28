import { onMounted, nextTick } from 'vue'

import {
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  PLACEMENT_TOP_LEFT,
  PLACEMENT_TOP_RIGHT,
  TOAST,
  PLACEMENT_BOTTOM_LEFT,
  PLACEMENT_BOTTOM_RIGHT,
  quickAccessTypes
} from '../constants'
import { useDialog } from './base-dialog'
import { useCloseGroupDialog, useVerticalPosition } from './base-use'
import { createDialog } from './manage'
import { parseArgumentsToProps, getLanguage, messageTypeQuickAccess } from './helper'

import TheDialogToast from '../modules/toast/DialogToast'

export function useToast (props, emit) {
  const {
    setPosition,
    setDialogSize,
    openDialog,
    closeWithCallback,
    shouldHandleResize,
    shouldControlOverflow,
    setupAutomaticClose,
    setupPositionAdjustBehavior,
    ...restItems
  } = useDialog(props, emit)
  const { closeGroupDialogWithCallback } = useCloseGroupDialog(setMessagePosition, closeWithCallback)
  const { getVerticalPosition } = useVerticalPosition(TOAST, props)

  shouldHandleResize.value = false
  shouldControlOverflow.value = false

  function getMessageTop () {
    if (props.placement === PLACEMENT_BOTTOM_LEFT) return
    if (props.placement === PLACEMENT_BOTTOM_RIGHT) return
    return getVerticalPosition()
  }
  function getMessageBottom () {
    if (props.placement === PLACEMENT_TOP_LEFT) return
    if (props.placement === PLACEMENT_TOP_RIGHT) return
    return getVerticalPosition()
  }
  function setMessagePosition () {
    setPosition(getMessageTop(), getMessageBottom())
  }
  // Remove pill style when long text content
  function handleBodyRounded (body) {
    if (!props.pill) return
    onMounted(() => {
      nextTick(() => {
        // long text
        if (body.value?.$el?.offsetHeight > 60) {
          body.value?.$el?.classList?.remove('v-dialog-message--pill')
        }
      })
    })
  }

  setDialogSize()
  setupPositionAdjustBehavior(setMessagePosition)
  setupAutomaticClose(closeGroupDialogWithCallback)

  onMounted(openDialog)

  return {
    ...restItems,
    lang: getLanguage(props.language),
    handleBodyRounded,
    closeGroupDialogWithCallback
  }
}

export function getToastTypeClass (type) {
  const types = [
    MESSAGE_TYPE_WARNING,
    MESSAGE_TYPE_ERROR,
    MESSAGE_TYPE_SUCCESS
  ]
  if (!types.includes(type)) return ''
  return `toast-${type}`
}

export function getToastPositionClass (placement) {
  const prefix = 'v-dialog-toast--'
  if (placement === PLACEMENT_TOP_LEFT || placement === PLACEMENT_BOTTOM_LEFT) {
    return prefix + 'left'
  }
  return prefix + 'right'
}

/**
 * Open a corner message notification dialog
 *
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns {function} call the function to close dialog
 */
export function DialogToast () {
  const props = parseArgumentsToProps(...arguments)
  const configs = {
    type: TOAST,
    placement: props.placement || PLACEMENT_TOP_RIGHT
  }
  return createDialog(TheDialogToast, props, configs)
}

export const {
  DialogToastInfo,
  DialogToastWarning,
  DialogToastError,
  DialogToastSuccess
} = messageTypeQuickAccess(
  quickAccessTypes,
  'DialogToast',
  TheDialogToast,
  props => ({
    type: TOAST,
    placement: props.placement || PLACEMENT_TOP_RIGHT
  })
)
