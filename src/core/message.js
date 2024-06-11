import { ref, computed, onMounted } from 'vue'

import {
  MESSAGE_WIDTH,
  MESSAGE_HEIGHT,
  MESSAGE_EXPAND_HEIGHT,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_CONFIRM,
  MESSAGE_PLACEMENT_BOTTOM,
  MESSAGE_OFFSET
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

  const expand = ref(false)
  const messageHeight = computed(() => {
    return expand.value ? MESSAGE_EXPAND_HEIGHT : MESSAGE_HEIGHT
  })
  shouldControlOverflow.value = false

  function getMessageTop () {
    const offset = props.offset || MESSAGE_OFFSET
    if (props.placement === MESSAGE_PLACEMENT_BOTTOM) {
      return window.innerHeight - offset - MESSAGE_HEIGHT
    }
    // top placement or the others
    return offset
  }
  function setMessageTop () {
    setPosition(getMessageTop())
  }

  setDialogSize(MESSAGE_WIDTH)
  setupPositionAdjustBehavior(setMessageTop)

  onMounted(() => {
    openDialog()
  })

  return {
    ...restItems,
    lang: getLanguage(props.language),
    closeDialogWithCallback,
    backdropCloseDialog: closeDialogWithCallback
  }
}

export function getAlertClass (type) {
  const types = [
    MESSAGE_TYPE_WARNING,
    MESSAGE_TYPE_ERROR,
    MESSAGE_TYPE_SUCCESS,
    MESSAGE_TYPE_CONFIRM
  ]
  if (!types.includes(type)) return ''
  return `alert-${type}`
}

export const isConfirmType = type => MESSAGE_TYPE_CONFIRM === type

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
