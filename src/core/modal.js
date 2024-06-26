import { onMounted, ref, watch } from 'vue'

import {
  MODAL_WIDTH,
  MODAL_HEIGHT
} from '../constants'
import { createDialog } from './manage'
import { useDialog } from './base-dialog'
import { useCloseDialog } from './base-use'

import TheDialogModal from '../modules/modal/DialogModal'

export function useModal (props, emit) {
  const {
    show,
    setPosition,
    setDialogSize,
    openDialog,
    closeWithCallback,
    closeWithoutCallback,
    setupAutomaticClose,
    setupPositionAdjustBehavior,
    ...restItems
  } = useDialog(props, emit)

  const maximize = ref(false)
  const {
    closeDialogWithCallback,
    closeDialogWithoutCallback
  } = useCloseDialog(emit, closeWithCallback, closeWithoutCallback)

  watch(() => props.visible, val => {
    if (val) return
    // close modal when visible is set to false
    closeDialogWithoutCallback()
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

  setDialogSize(props.width || MODAL_WIDTH, props.height || MODAL_HEIGHT)
  // setupPositionAdjustBehavior(setModalTop)
  setupAutomaticClose(closeDialogWithCallback)

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
    closeDialogWithCallback,
    closeDialogWithoutCallback,
    backdropCloseDialog: closeDialogWithoutCallback
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
