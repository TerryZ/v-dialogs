import { onMounted, ref, watch, markRaw } from 'vue'

import {
  MODAL_WIDTH,
  MODAL_HEIGHT
} from '../../constants'
import { createDialog } from '../../core/manage'
import { useDialog } from '../../core/base-dialog'
import { useCloseContainerDialog } from '../../core/base-use'

import TheDialogModal from './DialogModal'

export function useModal (props, emit, expose) {
  const {
    setDialogSize,
    openDialog,
    closeWithCallback,
    closeWithoutCallback,
    ...restItems
  } = useDialog(props, emit)

  const maximize = ref(false)
  const {
    closeContainerOnly,
    closeContainerWithCallback,
    closeContainerWithoutCallback
  } = useCloseContainerDialog(emit, {
    callback: props.callback,
    withCallback: closeWithCallback,
    withoutCallback: closeWithoutCallback
  })

  watch(() => props.visible, val => {
    if (val) return
    // close modal when visible is set to false
    closeContainerWithoutCallback()
  })

  function switchMaximize () {
    maximize.value = !maximize.value
    props.callback?.('maximize', [maximize.value])
  }
  function openModal () {
    openDialog()
    if (props.fullscreen) switchMaximize()
  }

  setDialogSize(props.width || MODAL_WIDTH, props.height || MODAL_HEIGHT)

  onMounted(openModal)

  expose({
    close: closeContainerWithoutCallback
  })

  return {
    ...restItems,
    maximize,
    openModal,
    switchMaximize,
    closeContainerOnly,
    closeContainerWithCallback,
    closeContainerWithoutCallback,
    backdropCloseDialog: closeContainerWithoutCallback
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
