import { onMounted, nextTick } from 'vue'

import {
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_OFFSET,
  PLACEMENT_BOTTOM,
  PLACEMENT_TOP,
  MESSAGE_GAP,
  MESSAGE
} from '../constants'
import { useDialog, useGroupItemPositionAdjust } from './base'
import { createDialog, opening } from './manage'
import { parseArgumentsToProps, getLanguage } from './helper'

import TheDialogMessage from '../modules/message/DialogMessage'

export function useMessage (props, emit) {
  const {
    setPosition,
    setDialogSize,
    openDialog,
    closeDialogWithCallback,
    shouldHandleResize,
    shouldControlOverflow,
    setupAutomaticClose,
    setupPositionAdjustBehavior,
    ...restItems
  } = useDialog(props, emit)
  const {
    bindPositionAdjust,
    unbindPositionAdjust,
    triggerPositionAdjust
  } = useGroupItemPositionAdjust(setMessagePosition)
  const offset = props.offset || MESSAGE_OFFSET

  shouldHandleResize.value = false
  shouldControlOverflow.value = false

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
    if (!messages.length) return offset

    let position = 0

    messages.forEach(item => {
      const el = document.getElementById(item.key)
      position += el.offsetHeight + MESSAGE_GAP
    })

    return offset + position
  }
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
  function closeMessageWithCallback (data) {
    unbindPositionAdjust()
    const options = {
      afterClose: () => {
        triggerPositionAdjust()
      }
    }
    closeDialogWithCallback(data, options)
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
  setupAutomaticClose(closeMessageWithCallback)
  bindPositionAdjust()

  onMounted(() => {
    openDialog()
  })

  return {
    ...restItems,
    lang: getLanguage(props.language),
    handleBodyRounded,
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
