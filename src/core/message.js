import { onMounted, nextTick } from 'vue'

import {
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  PLACEMENT_BOTTOM,
  PLACEMENT_TOP,
  MESSAGE,
  messageTypes
} from '../constants'
import { useDialog } from './base-dialog'
import {
  useVerticalPosition,
  useCloseGroupDialog
} from './base-use'
import { createDialog } from './manage'
import { parseArgumentsToProps, messageTypeQuickAccess } from './helper'

import TheDialogMessage from '../modules/message/DialogMessage'

export function useMessage (props, emit) {
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
  const { getVerticalPosition } = useVerticalPosition(MESSAGE, props)

  shouldHandleResize.value = false
  shouldControlOverflow.value = false

  function getMessageTop () {
    if (props.placement === PLACEMENT_BOTTOM) return
    return getVerticalPosition()
  }
  function getMessageBottom () {
    if (props.placement === PLACEMENT_TOP) return
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

  onMounted(() => {
    openDialog()
  })

  return {
    ...restItems,
    handleBodyRounded,
    closeGroupDialogWithCallback
  }
}

export function getMessageTypeClass (type) {
  const types = [
    MESSAGE_TYPE_WARNING,
    MESSAGE_TYPE_ERROR,
    MESSAGE_TYPE_SUCCESS
  ]
  if (!types.includes(type)) return ''
  return `message-${type}`
}

/**
 * Open a message notification dialog
 *
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns {function} call the function to close dialog
 */
export function DialogMessage () {
  const props = parseArgumentsToProps(...arguments)
  const configs = {
    type: MESSAGE,
    placement: props.placement || PLACEMENT_TOP
  }
  return createDialog(TheDialogMessage, props, configs)
}

export const {
  DialogMessageInfo,
  DialogMessageWarning,
  DialogMessageError,
  DialogMessageSuccess
} = messageTypeQuickAccess(
  messageTypes,
  'DialogMessage',
  TheDialogMessage,
  props => ({
    type: MESSAGE,
    placement: props.placement || PLACEMENT_TOP
  })
)
