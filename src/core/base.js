import { ref, computed, onBeforeMount, onMounted, onUnmounted } from 'vue'

import {
  cssValue,
  calculateDialogTop,
  calculateDialogZIndex,
  hideDocumentBodyOverflow,
  restoreDocumentBodyOverflow
} from './helper'
import { messageAdjustPositionEvent } from './manage'
import { EMIT_CLOSE, EMIT_RENDER_DIALOG, EVENT_MESSAGE_ADJUST_POSITION } from '../constants'
import { EN } from '../language'

export const baseProps = {
  /** Dialog key */
  dialogKey: { type: String, default: '' },
  dialogIndex: { type: Number, required: true },
  singletonKey: { type: String, default: '' },
  customClass: { type: String, default: '' },
  /** Display dialog backdrop */
  backdrop: { type: Boolean, default: true },
  /** Click backdrop to close dialog */
  backdropClose: { type: Boolean, default: false },
  /** whether to display header */
  header: { type: Boolean, default: true },
  title: { type: String, default: '' },
  message: { type: [String, Object], default: '' },
  /** Dialog width */
  width: { type: Number, default: 0 },
  /** Dialog height */
  height: { type: Number, default: 0 },
  shake: { type: Boolean, default: false },
  /**
   * Auto close dialog milliseconds
   * - 0: disabled automatic close
   * - number of milliseconds: specify times to automatic close dialog
   */
  duration: { type: Number, default: 0 },
  language: { type: String, default: EN },
  callback: { type: Function, default: undefined }
}

export const baseEmits = [EMIT_CLOSE, EMIT_RENDER_DIALOG]

export function useDialog (props, emit) {
  const show = ref(false)
  const width = ref(0)
  const height = ref(0)
  const top = ref(0)
  const bottom = ref()
  // Dialog displayed and the animation is complete
  const dialogReady = ref(false)
  const shouldControlOverflow = ref(true)
  const shouldHandleResize = ref(true)

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
  // the style v-dialog-content used
  const contentStyles = computed(() => ({
    height: cssValue(height.value)
  }))

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
    show.value = true
    emit(EMIT_RENDER_DIALOG, true)

    if (shouldControlOverflow.value) hideDocumentBodyOverflow()
  }
  function closeDialog (callback, data, options) {
    if (!dialogReady.value) return

    show.value = false
    options?.closing?.()

    const closeWork = () => {
      // close and destroy dialog
      emit(EMIT_CLOSE, callback, data)
      options?.afterClose?.()
      // destroy DialogModalBox component
      emit(EMIT_RENDER_DIALOG, false)

      if (shouldControlOverflow.value) restoreDocumentBodyOverflow()
    }
    // waiting for dialog close animation complete
    setTimeout(closeWork, 250)
  }
  function closeDialogWithCallback (data, options) {
    closeDialog(props.callback, data, options)
  }
  function closeDialogWithoutCallback (options) {
    closeDialog(undefined, undefined, options)
  }
  function setupPositionAdjustBehavior (setTop) {
    if (shouldHandleResize.value) useResizeAdjust(setTop)

    onBeforeMount(() => {
      setTop()
    })
  }
  function setupAutomaticClose (close) {
    onMounted(() => {
      useAutomaticClose(props, close)
    })
  }

  onMounted(() => {
    setTimeout(() => { dialogReady.value = true }, 300)
  })

  return {
    show,
    shouldControlOverflow,
    shouldHandleResize,
    dialogStyles,
    contentStyles,
    dialogZIndex,
    backdropZIndex,
    openDialog,
    closeDialog,
    closeDialogWithCallback,
    closeDialogWithoutCallback,
    setPosition,
    setDialogSize,
    setupAutomaticClose,
    setupPositionAdjustBehavior
  }
}

/**
 * Automatically close dialog at a specified time
 * @param {object} props
 * @param {function} close
 */
export function useAutomaticClose (props, close) {
  if (!props.duration) return

  setTimeout(close, props.duration)
}

export function useResizeAdjust (callback, wait = 200) {
  let timer

  function resizeHandler () {
    clearTimeout(timer)
    timer = setTimeout(callback, wait)
  }

  onMounted(() => {
    addEventListener('resize', resizeHandler, false)
  })

  onUnmounted(() => {
    removeEventListener('resize', resizeHandler, false)
  })
}

export function useGroupItemPositionAdjust (handler) {
  return {
    bindPositionAdjust: () => addEventListener(EVENT_MESSAGE_ADJUST_POSITION, handler, false),
    unbindPositionAdjust: () => removeEventListener(EVENT_MESSAGE_ADJUST_POSITION, handler, false),
    triggerPositionAdjust: () => dispatchEvent(messageAdjustPositionEvent)
  }
}
