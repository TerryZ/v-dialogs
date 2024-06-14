import { onMounted, ref, watch } from 'vue'

import {
  MODAL_WIDTH,
  MODAL_HEIGHT,
  MODAL_MIN_WIDTH,
  MODAL_MIN_HEIGHT
} from '../constants'
import { createDialog } from './manage'
import { useDialog } from './base'

import TheDialogModal from '../modules/modal/DialogModal'

export function useModal (props, emit) {
  const {
    show,
    setPosition,
    setDialogSize,
    openDialog,
    closeDialogWithCallback,
    closeDialogWithoutCallback,
    setupAutomaticClose,
    setupPositionAdjustBehavior,
    ...restItems
  } = useDialog(props, emit)

  const maximize = ref(false)
  const { width, height } = getModalSize(props)

  watch(() => props.visible, val => {
    if (val) return
    // close modal when visible is set to false
    closeModalWithoutCallback()
  })

  function setModalTop () {
    setPosition(maximize.value ? 0 : undefined)
  }
  function switchMaximize () {
    maximize.value = !maximize.value

    setModalTop()
  }
  function openModal () {
    openDialog()

    if (props.fullscreen) {
      switchMaximize()
    }
  }
  const closeOptions = {
    closing: () => {
      emit('update:visible', false)
    }
  }
  function closeModalWithCallback (data) {
    closeDialogWithCallback(data, closeOptions)
  }
  function closeModalWithoutCallback () {
    closeDialogWithoutCallback(closeOptions)
  }

  setDialogSize(width, height)
  setupPositionAdjustBehavior(setModalTop)
  setupAutomaticClose(closeModalWithCallback)

  onMounted(() => {
    openModal()
  })

  return {
    ...restItems,
    show,
    maximize,
    openModal,
    setModalTop,
    switchMaximize,
    closeModalWithCallback,
    closeModalWithoutCallback,
    backdropCloseDialog: closeModalWithoutCallback
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
export function DialogModal (component, options = {}) {
  const props = { ...options, component }
  return createDialog(TheDialogModal, props)
}
