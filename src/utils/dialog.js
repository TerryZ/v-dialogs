import { ref, computed, onBeforeMount, onMounted, onUnmounted } from 'vue'

import { calculateDialogTop } from './helper'
import { EN } from '../language'

export const commonProps = {
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
  message: { type: String, default: '' },
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

export const commonEmits = ['close']

export function useDialog (props, emit) {
  const show = ref(false)
  const top = ref(0)
  const width = ref(0)
  const height = ref(0)
  // Dialog displayed and the animation is complete
  const dialogReady = ref(false)

  const dialogStyles = computed(() => ({
    width: width.value + 'px',
    height: height.value + 'px',
    top: top.value + 'px'
  }))

  function setDialogSize (theWidth, theHeight) {
    width.value = theWidth
    height.value = theHeight
  }
  function setDialogTop (customSetDialogTop) {
    top.value = customSetDialogTop
      ? customSetDialogTop()
      : calculateDialogTop(height.value)
  }
  function closeDialog (callback, data) {
    if (!dialogReady.value) return

    show.value = false

    setTimeout(() => emit('close', callback, data), 250)
  }
  function closeDialogWithCallback () {
    closeDialog(props.callback)
  }

  useResizeAdjust(setDialogTop)

  onBeforeMount(() => {
    setDialogTop()
  })

  onMounted(() => {
    setTimeout(() => {
      dialogReady.value = true
    }, 300)
    useAutomaticClose(props, closeDialogWithCallback)
  })

  return {
    show,
    setDialogSize,
    closeDialog,
    closeDialogWithCallback,
    dialogStyles,
    setDialogTop
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

export function useResizeAdjust (callback, wait = 500) {
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
