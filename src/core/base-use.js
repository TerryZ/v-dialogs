import {
  h,
  ref,
  inject,
  onMounted,
  onUnmounted,
  mergeProps
} from 'vue'

import {
  EVENT_MESSAGE_ADJUST_POSITION,
  propsInjectionKey
} from '../constants'
import { messageAdjustPositionEvent, addDialog } from './manage'

export function useDialogComponent (slots) {
  const {
    component,
    params,
    closeDialogWithCallback
  } = inject(propsInjectionKey)

  function getComponentContent () {
    // use slot content first
    if (slots.default) return slots.default()
    // dynamic component
    if (!component) return

    const VNode = typeof component === 'function'
      ? component()
      : component

    const options = {
      onClose: data => closeDialogWithCallback(data)
    }
    return h(VNode, mergeProps(params, options))
  }

  return { getComponentContent }
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

export function useCloseDialog (emit, closeWithCallback, closeWithoutCallback) {
  const closeOptions = {
    closing: () => {
      emit('update:visible', false)
    }
  }
  function closeDialogWithCallback (data) {
    closeWithCallback(data, closeOptions)
  }
  function closeDialogWithoutCallback () {
    closeWithoutCallback(closeOptions)
  }

  return {
    closeDialogWithCallback,
    closeDialogWithoutCallback
  }
}

export function useComponent (component, { attrs, slots }) {
  const renderDialog = ref(false)

  const { index, key } = addDialog()
  const baseProps = {
    dialogKey: key,
    dialogIndex: index,
    onRenderDialog: val => {
      renderDialog.value = val
    }
  }

  return () => {
    if (!attrs.visible && !renderDialog.value) return

    return h(component, mergeProps(attrs, baseProps), () => slots.default())
  }
}
