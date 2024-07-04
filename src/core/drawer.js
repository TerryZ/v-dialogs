import { onMounted, watch, markRaw } from 'vue'

import {
  DRAWER_WIDTH,
  DRAWER_HEIGHT,
  PLACEMENT_TOP,
  PLACEMENT_BOTTOM,
  PLACEMENT_RIGHT,
  FULL_WIDTH,
  FULL_HEIGHT,
  placements
} from '../constants'
import { createDialog } from './manage'
import { useDialog } from './base-dialog'
import { useCloseDialog } from './base-use'

import TheDialogDrawer from '../modules/drawer/DialogDrawer'

export function useDrawer (props, emit) {
  const {
    setDialogSize,
    openDialog,
    closeWithCallback,
    closeWithoutCallback,
    ...restItems
  } = useDialog(props, emit)
  const { placement } = props
  const { width, height } = getDrawerSize(props)
  const {
    closeDialogWithCallback,
    closeDialogWithoutCallback
  } = useCloseDialog(emit, closeWithCallback, closeWithoutCallback)

  watch(() => props.visible, val => {
    if (val) return
    closeDialogWithoutCallback()
  })

  function getPositionClass () {
    const prefix = 'v-dialog-drawer--'
    return prefix + (placements.includes(placement) ? placement : PLACEMENT_RIGHT)
  }
  function getTransitionName () {
    const prefix = 'v-dialog-drawer-slide-in-'
    return prefix + (placements.includes(placement) ? placement : PLACEMENT_RIGHT)
  }

  setDialogSize(width, height)

  onMounted(() => {
    openDialog()
  })

  return {
    ...restItems,
    getPositionClass,
    getTransitionName,
    closeDialogWithCallback,
    closeDialogWithoutCallback,
    backdropCloseDialog: closeDialogWithoutCallback
  }
}

function getDrawerSize (props) {
  const { width, height, placement } = props

  const widthValue = width || DRAWER_WIDTH
  const heightValue = height || DRAWER_HEIGHT

  if (placement === PLACEMENT_TOP || placement === PLACEMENT_BOTTOM) {
    return { width: FULL_WIDTH, height: heightValue }
  }
  // placement left, right and others
  return { width: widthValue, height: FULL_HEIGHT }
}

/**
 * Open a drawer dialog
 *
 * @param {object | function} component
 * @param {object} [option] - options
 * @returns
 */
export function DialogDrawer (component, options = {}) {
  const props = {
    ...options,
    component: markRaw(component)
  }
  return createDialog(TheDialogDrawer, props)
}
