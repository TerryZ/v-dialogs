import { onMounted, ref, watch, markRaw } from 'vue'

import {
  MODAL_WIDTH,
  MODAL_HEIGHT
} from '../../constants'
import { createDialog } from '../../core/manage'
import { useDialog } from '../../core/base-dialog'
import { useCloseDialog } from '../../core/base-use'

import TheDialogModal from './DialogModal'

export function useModal (props, emit) {
  const {
    setDialogSize,
    openDialog,
    closeWithCallback,
    closeWithoutCallback,
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

  function switchMaximize () {
    maximize.value = !maximize.value
  }
  function openModal () {
    openDialog()

    if (props.fullscreen) switchMaximize()
  }

  setDialogSize(props.width || MODAL_WIDTH, props.height || MODAL_HEIGHT)

  onMounted(openModal)

  return {
    ...restItems,
    maximize,
    openModal,
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
  const props = {
    ...options,
    component: markRaw(component)
  }
  return createDialog(TheDialogModal, props)
}
