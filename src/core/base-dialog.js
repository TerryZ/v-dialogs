import {
  ref,
  computed,
  onBeforeMount,
  onMounted
} from 'vue'

import {
  EMIT_CLOSE,
  EMIT_RENDER_DIALOG
} from '../constants'
import {
  cssValue,
  calculateDialogTop,
  calculateDialogZIndex,
  hideDocumentBodyOverflow,
  restoreDocumentBodyOverflow
} from './helper'
import { useResizeAdjust, useAutomaticClose } from './base-use'

/**
 * Dialog base behavior
 * @param {object} props
 * @param {string[]} emit
 * @returns {object}
 */
export function useDialog (props, emit) {
  const show = ref(false)
  const shaking = ref(false)
  const width = ref(0)
  const height = ref(0)
  const top = ref()
  const bottom = ref()
  const transitionEnterComplete = ref(false)
  const shouldControlOverflow = ref(true)
  const shouldHandleResize = ref(true)
  const destroy = ref()

  const { dialogZIndex, backdropZIndex } = calculateDialogZIndex(props.dialogIndex)

  // the style v-dialog-dialog used
  const dialogStyles = computed(() => {
    const styles = {}
    if (typeof width.value !== 'undefined') {
      styles.width = cssValue(width.value)
    }
    if (typeof height.value !== 'undefined') {
      styles.height = cssValue(height.value)
    }
    if (typeof top.value !== 'undefined') {
      styles.top = cssValue(top.value)
    }
    if (typeof bottom.value !== 'undefined') {
      styles.bottom = cssValue(bottom.value)
    }
    return styles
  })

  function getTopValue (topValue) {
    if (typeof topValue !== 'undefined') return topValue

    // center of screen
    return calculateDialogTop(height.value)
  }
  function setDialogSize (dialogWidth, dialogHeight) {
    width.value = dialogWidth
    height.value = dialogHeight
  }
  function setPosition (topValue, bottomValue) {
    top.value = getTopValue(topValue)
    if (typeof bottomValue !== 'undefined') {
      bottom.value = bottomValue
    }
  }
  function openDialog () {
    if (shouldControlOverflow.value) hideDocumentBodyOverflow()

    // nextTick(() => {
    // requestAnimationFrame(() => {
    show.value = true

    emit(EMIT_RENDER_DIALOG, true)
    // })
    // })
  }
  /**
   * Close dialog
   * @param {function} callback callback function after dialog closed
   * @param {unknown} data the data that will be returned to the caller
   * @param {object} options custom options and life cycle
   *
   * Life cycle
   * - closing
   * - afterClose
   */
  function closeDialog (callback, data, options) {
    if (!transitionEnterComplete.value) return

    // trigger dialog close
    show.value = false
    // do some work after trigger dialog close
    options?.closing?.()

    // destroy dialog when transition leave complete
    destroy.value = () => {
      console.log('close: ', data)
      callback?.(data)
      // close and destroy dialog
      emit(EMIT_CLOSE)
      // dialog closed
      options?.afterClose?.()
      /**
       * Destroy tag form dialog component
       * - DialogModalBox
       * - DialogDrawerBox
       */
      emit(EMIT_RENDER_DIALOG, false)

      if (shouldControlOverflow.value) restoreDocumentBodyOverflow()
    }
  }
  function closeWithCallback (data, options) {
    closeDialog(props.callback, data, options)
  }
  function closeWithoutCallback (options) {
    closeDialog(undefined, undefined, options)
  }
  function setupPositionAdjustBehavior (setTop) {
    if (shouldHandleResize.value) useResizeAdjust(setTop)

    onBeforeMount(setTop)
  }
  function setupAutomaticClose (close) {
    onMounted(() => {
      useAutomaticClose(props, close)
    })
  }
  function onTransitionAfterEnter () {
    transitionEnterComplete.value = true
  }
  function onTransitionAfterLeave () {
    destroy?.value()
  }

  return {
    show,
    shaking,
    transitionEnterComplete,
    shouldControlOverflow,
    shouldHandleResize,
    dialogStyles,
    dialogZIndex,
    backdropZIndex,
    openDialog,
    destroy,
    closeDialog,
    closeWithCallback,
    closeWithoutCallback,
    setPosition,
    setDialogSize,
    setupAutomaticClose,
    setupPositionAdjustBehavior,
    onTransitionAfterEnter,
    onTransitionAfterLeave
  }
}
