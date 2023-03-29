import { ref, computed, onMounted, onUnmounted } from 'vue'
import { calculateDialogTop } from './helper'
// import { closeDialog } from '../dialogs'
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
  title: { type: String, default: '' },
  /** whether to display header */
  header: { type: Boolean, default: true },
  message: { type: String, default: '' },
  /** Dialog width */
  width: { type: Number, default: 0 },
  /** Dialog height */
  height: { type: Number, default: 0 },
  /**
   * auto close dialog seconds
   * - 0: no automatic close
   * - number of seconds: specify seconds to automatic close dialog
   */
  closeTime: { type: Number, default: 0 },
  language: { type: String, default: EN },
  callback: { type: Function, default: undefined }
}

export const commonEmits = ['close']

export function outsideClick (props, close, shaking) {
  if (!props.backdrop) return

  if (props.backdropClose) {
    close && close()
    return
  }

  if (!props.shaking) return
  // shake animation playing
  if (shaking.value) return

  // play shake animation
  shaking.value = true
  setTimeout(() => { shaking.value = false }, 750)
}

export function useDialog (props, emit) {
  const show = ref(false)
  const dialogTop = ref(0)

  const dialogStyles = computed(() => ({
    width: props.width + 'px',
    height: props.height + 'px',
    top: dialogTop.value + 'px'
  }))

  function setDialogTop () {
    dialogTop.value = calculateDialogTop(props.height)
  }
  function closeDialog (callback) {
    show.value = false

    setTimeout(() => emit('close', callback), 300)
  }

  useResizeAdjust(setDialogTop)

  onMounted(() => {
    setDialogTop()

    useAutomaticClose(props, () => closeDialog(props.dialogKey))
  })

  return {
    show,
    closeDialog,
    dialogStyles
  }
}

export function useAutomaticClose (props, close) {
  if (!props.closeTime) return

  setTimeout(close, props.closeTime * 1000)
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
