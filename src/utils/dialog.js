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

  const dialogStyles = computed(() => ({
    width: props.width + 'px',
    height: props.height + 'px',
    top: top.value + 'px'
  }))

  function setDialogTop (customSetDialogTop) {
    top.value = customSetDialogTop
      ? customSetDialogTop()
      : calculateDialogTop(props.height)
  }
  function closeDialog (callback, data) {
    show.value = false

    setTimeout(() => emit('close', callback, data), 250)
  }

  useResizeAdjust(setDialogTop)

  onBeforeMount(() => {
    setDialogTop()
  })

  onMounted(() => {
    useAutomaticClose(props, () => closeDialog(props.dialogKey))
  })

  return {
    show,
    closeDialog,
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
