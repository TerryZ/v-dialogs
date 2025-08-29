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
  MESSAGE_GAP,
  MESSAGE_OFFSET,
  propsInjectionKey
} from '../constants'
import { messageAdjustPositionEvent, addDialog, opening } from './manage'
import { toPascalCase } from './helper'

export function useDialogComponent (slots) {
  const {
    component,
    callback,
    params,
    closeDialogWithoutCallback
  } = inject(propsInjectionKey)

  function getComponentContent () {
    // use default slot content first
    if (slots.default) return slots.default()
    // dynamic component
    if (!component) return

    const VNode = typeof component === 'function'
      ? component()
      : component

    const emits = VNode?.emits || []
    const options = {}

    emits.forEach(name => {
      const eventName = 'on' + toPascalCase(name)
      options[eventName] = (...args) => {
        // close dialog when event name is `close`
        if (name.toLowerCase() === 'close') closeDialogWithoutCallback()

        callback?.(name, args)
      }
    })

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

/**
 * Close dialog and update visible prop value
 * @param {function} emit
 * @param {function} closeWithCallback
 * @param {function} closeWithoutCallback
 * @returns {object}
 */
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

export function useCloseGroupDialog (eventHandler, close) {
  const {
    bindPositionAdjust,
    unbindPositionAdjust,
    triggerPositionAdjust
  } = useGroupItemPositionAdjust(eventHandler)

  function closeGroupDialogWithCallback (data) {
    unbindPositionAdjust()
    const options = {
      afterClose: triggerPositionAdjust
    }
    close(data, options)
  }

  bindPositionAdjust()

  return {
    closeGroupDialogWithCallback
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

export function useVerticalPosition (type, props) {
  const offset = props.offset || MESSAGE_OFFSET
  // get same placement Message configs
  function getPreviousElements () {
    return opening.value.filter((item) => {
      return item.type === type &&
      item.placement === props.placement &&
      item.index < props.dialogIndex
    })
  }
  function getVerticalPosition () {
    const elements = getPreviousElements()
    if (!elements.length) return offset

    let position = 0

    elements.forEach(item => {
      const el = document.getElementById(item.key)
      position += el.offsetHeight + MESSAGE_GAP
    })

    return offset + position
  }
  return { getVerticalPosition }
}
