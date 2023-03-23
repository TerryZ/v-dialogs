import { ref, computed, onMounted, onUnmounted } from 'vue'
import { calculateDialogTop } from './helper'
import { closeDialog } from '../dialogs'
import { EN } from '../language'

export const commonProps = {
  /** Display dialog backdrop */
  backdrop: { type: Boolean, default: true },
  /** Click backdrop to close dialog */
  backdropClose: { type: Boolean, default: false },
  /**
   * auto close dialog seconds
   * - 0: no automatic close
   * - number of seconds: specify seconds to automatic close dialog
   */
  closeTime: { type: Number, default: 0 },
  language: { type: String, default: EN },
  /** Dialog key */
  dialogKey: { type: String, default: '' },
  dialogIndex: { type: Number, required: true }
}

export function useDialog (props) {
  const show = ref(false)
  const dialogTop = ref(0)

  const dialogStyles = computed(() => {
    return {
      width: props.width + 'px',
      height: props.height + 'px',
      top: dialogTop.value + 'px'
    }
  })

  function setDialogTop () {
    dialogTop.value = calculateDialogTop(props.height)
  }

  useResizeAdjust(setDialogTop)
  useOutsideClick(props, () => closeDialog(props.dialogKey))

  onMounted(() => {
    show.value = true

    useAutomaticClose(props, () => closeDialog(props.dialogKey))
  })

  return {
    dialogStyles
  }
}

export function useOutsideClick (props, close) {
  const shaking = ref(false)

  if (!props.backdrop) return

  if (props.backdropClose) {
    close()
    return
  }

  if (!props.shaking) return

  // play shake animation
  shaking.value = true
  setTimeout(() => { shaking.value = false }, 750)

  return { shaking }
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
