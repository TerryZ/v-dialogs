import { onMounted } from 'vue'

import {
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_PLACEMENT_BOTTOM,
  MESSAGE_OFFSET,
  MESSAGE_PLACEMENT_TOP,
  MESSAGE_GAP,
  MESSAGE
} from '../constants'
import { useDialog } from './base'
import { createDialog, opening, messageAdjustPositionEvent } from './manage'
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

  const offset = props.offset || MESSAGE_OFFSET
  // get same placement Message configs
  function getPreviousMessages () {
    return opening.value.filter((item) => {
      return item.type === MESSAGE &&
      item.placement === props.placement &&
      item.index < props.dialogIndex
    })
  }
  function getVerticalPosition () {
    const messages = getPreviousMessages()
    console.log(messages)
    if (!messages.length) return offset

    let position = 0

    messages.forEach(item => {
      const el = document.getElementById(item.key)
      position += el.offsetHeight + MESSAGE_GAP
    })

    return offset + position
  }
  function getMessageTop () {
    if (props.placement === MESSAGE_PLACEMENT_BOTTOM) return

    return getVerticalPosition()
  }
  function getMessageBottom () {
    if (props.placement === MESSAGE_PLACEMENT_TOP) return

    return getVerticalPosition()
  }
  function setMessagePosition () {
    setPosition(getMessageTop(), getMessageBottom())
  }
  function closeMessageWithCallback (data) {
    const options = {
      afterClose: () => {
        dispatchEvent(messageAdjustPositionEvent)
      }
    }
    closeDialogWithCallback(data, options)
  }

  setDialogSize()
  setupPositionAdjustBehavior(setMessagePosition)

  onMounted(() => {
    openDialog()
  })

  return {
    ...restItems,
    lang: getLanguage(props.language),
    closeMessageWithCallback
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

// function getNewMessagePosition () {
//   const nodes = document.querySelectorAll('div.v-dialog-message')
//   // console.log(nodes)
//   if (!nodes.length) return 0

//   let sum = 0

//   nodes.forEach(node => {
//     sum += MESSAGE_GAP + node.offsetHeight
//   })

//   return sum
// }

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
    placement: props.placement || MESSAGE_PLACEMENT_TOP
  }
  return createDialog(TheDialogMessage, props, configs)
}
