import { onMounted, watch } from 'vue'

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
import { useDialog } from './base'

import TheDialogDrawer from '../modules/drawer/DialogDrawer'

export function useDrawer (props, emit) {
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

  const { placement } = props
  const { width, height } = getDrawerSize(props)

  watch(() => props.visible, val => {
    if (val) return
    closeDrawerWithoutCallback()
  })

  function setModalTop () {
    setPosition()
  }
  function getPositionClass () {
    const prefix = 'v-dialog-drawer--'
    return prefix + (placements.includes(placement) ? placement : PLACEMENT_RIGHT)
  }
  function getTransitionName () {
    const prefix = 'v-dialog-drawer-slide-in-'
    return prefix + (placements.includes(placement) ? placement : PLACEMENT_RIGHT)
  }
  const closeOptions = {
    closing: () => {
      emit('update:visible', false)
    }
  }
  function closeDrawerWithCallback (data) {
    closeDialogWithCallback(data, closeOptions)
  }
  function closeDrawerWithoutCallback () {
    closeDialogWithoutCallback(closeOptions)
  }

  setDialogSize(width, height)
  // setupPositionAdjustBehavior(setModalTop)
  setupAutomaticClose(closeDrawerWithCallback)

  onMounted(() => {
    openDialog()
  })

  return {
    ...restItems,
    show,
    setModalTop,
    getPositionClass,
    getTransitionName,
    closeDrawerWithCallback,
    closeDrawerWithoutCallback,
    backdropCloseDialog: closeDrawerWithoutCallback
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
 * @param {string} message - message content
 * @param {function} [callback] - callback function
 * @param {object} [option] - options
 * @returns
 */
export function DialogDrawer (component, options = {}) {
  const props = { ...options, component }
  return createDialog(TheDialogDrawer, props)
}
