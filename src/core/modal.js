import { ref } from 'vue'

import {
  defaultModalOptions,
  MODAL_WIDTH,
  MODAL_HEIGHT,
  MODAL_MIN_WIDTH,
  MODAL_MIN_HEIGHT
} from '../constants'
import { createDialog } from './manage'
import { useDialog } from '../utils/dialog'

import TheDialogModal from '../modules/modal/DialogModal'

export function useModal (props, emit, header) {
  const {
    bodyHeight,
    setDialogTop,
    setDialogSize,
    ...restItems
  } = useDialog(props, emit)

  const { width, height } = getModalSize(props)

  setDialogSize(width, height)

  const maximize = ref(false)

  function setModalTop () {
    setDialogTop(maximize.value ? 0 : undefined)
  }
  function switchMaximize () {
    maximize.value = !maximize.value

    setBodyHeight()
  }
  function setBodyHeight () {
    const headerHeight = header.value?.$el.offsetHeight || 0
    const dialogHeight = maximize.value ? window.innerHeight : height

    bodyHeight.value = dialogHeight - headerHeight
    setModalTop()
  }

  return {
    ...restItems,
    maximize,
    bodyHeight,
    setModalTop,
    setBodyHeight,
    switchMaximize
  }
}

function getModalSize (props) {
  let width = props.width || MODAL_WIDTH
  let height = props.height || MODAL_HEIGHT

  if (width < MODAL_MIN_WIDTH) {
    width = MODAL_MIN_WIDTH
  }
  if (height < MODAL_MIN_HEIGHT) {
    height = MODAL_MIN_HEIGHT
  }
  return { width, height }
}

/**
 * Open a modal dialog
 *
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns
 */
export function DialogModal (component, options) {
  const props = { ...defaultModalOptions, ...options }
  props.component = component

  return createDialog(TheDialogModal, props)
}
