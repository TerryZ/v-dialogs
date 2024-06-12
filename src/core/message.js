import { onMounted } from 'vue'

import {
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_PLACEMENT_BOTTOM,
  MESSAGE_OFFSET,
  MESSAGE_PLACEMENT_TOP,
  MESSAGE_GAP
} from '../constants'
import { useDialog } from './base'
import { createDialog } from './manage'
import { parseArgumentsToProps, getLanguage } from './helper'

import TheDialogMessage from '../modules/message/DialogMessage'

export function useMessage (props, emit) {
  const {
    setPosition,
    setDialogSize,
    openDialog,
    closeDialogWithCallback,
    shouldControlOverflow,
    setupPositionAdjustBehavior,
    ...restItems
  } = useDialog(props, emit)

  shouldControlOverflow.value = false

  function getMessageTop () {
    if (props.placement === MESSAGE_PLACEMENT_BOTTOM) return

    const offset = props.offset || MESSAGE_OFFSET

    return offset + getNewPosition()
  }
  function getMessageBottom () {
    if (props.placement === MESSAGE_PLACEMENT_TOP) return

    const offset = props.offset || MESSAGE_OFFSET
    return offset + getNewPosition()
  }
  function setMessagePosition () {
    setPosition(getMessageTop(), getMessageBottom())
  }

  setDialogSize()
  setupPositionAdjustBehavior(setMessagePosition)

  onMounted(() => {
    openDialog()
  })

  return {
    ...restItems,
    lang: getLanguage(props.language),
    closeDialogWithCallback
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

function getNewPosition () {
  const nodes = document.querySelectorAll('div.v-dialog-message')
  if (!nodes.length) return 0

  let sum = 0

  nodes.forEach(node => {
    sum += MESSAGE_GAP + node.offsetHeight
  })

  return sum
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
  return createDialog(TheDialogMessage, parseArgumentsToProps(...arguments))
}
