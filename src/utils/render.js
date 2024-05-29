import { ref, h, vShow, withDirectives, Transition, Teleport } from 'vue'

import { outsideClick } from './dialog'

export function useRenderPopup (props, show) {
  const shaking = ref(false)
  /**
   * Generate backdrop layer
   */
  function generateBackdrop (options) {
    if (!props.backdrop) return
    if (!show.value) return

    const children = []
    const backdropOption = {
      class: 'v-dialog-overlay',
      style: {
        'z-index': options.backdropZIndex
      }
    }
    children.push(h('div', backdropOption))

    const transitionOption = {
      name: 'v-dialog--fade',
      appear: true
    }

    return h(Teleport, { to: 'body' }, [
      h(Transition, transitionOption, () => children)
    ])
  }
  /**
   * Generate dialog content
   *
   * @param {object} options
   * @returns
   */
  function generateDialogContent (options) {
    const option = {
      class: [options.className, props.customClass]
    }
    const content = withDirectives(
      h('div', option, options.child),
      [[vShow, show.value]]
    )

    const transitionOption = {
      name: options.transitionName,
      appear: true
    }
    return h(Transition, transitionOption, () => [content])
  }
  /**
   * Generate dialog container
   *
   * @param {VNode} dialog
   * @returns {VNode}
   */
  function generateDialogContainer (dialog, options, close) {
    const option = {
      class: ['v-dialog', { 'v-dialog--buzz-out': shaking.value, ...options?.class }],
      style: {
        'z-index': options.dialogZIndex
      },
      onClick: e => {
        if (e.target !== e.currentTarget) return
        outsideClick(props, close, shaking)
      }
    }
    return h(Teleport, { to: 'body' }, h('div', option, dialog))
  }

  return {
    generateBackdrop,
    generateDialogContent,
    generateDialogContainer
  }
}
