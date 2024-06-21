import { onMounted, ref, watch } from 'vue'

import {
  MODAL_WIDTH,
  MODAL_HEIGHT
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

    // setModalTop()
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

  setDialogSize(props.width || MODAL_WIDTH, props.height || MODAL_HEIGHT)
  // setupPositionAdjustBehavior(setModalTop)
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

/**
 * Open a modal dialog
 *
 * @param {object | function} component
 * @param {object} [option] - options
 * @returns
 */
export function DialogModal (component, options = {}) {
  const props = { ...options, component }
  return createDialog(TheDialogModal, props)
}
