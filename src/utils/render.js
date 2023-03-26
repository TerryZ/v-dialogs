import { ref, h, vShow, withDirectives, Transition } from 'vue'

import { outsideClick } from './dialog'

export function useRenderPopup (props, show) {
  const shaking = ref(false)
  /**
   * Generate backdrop layer
   */
  function generateBackdrop (options) {
    if (!props.backdrop) return

    const child = []
    if (show.value) {
      const backdropOption = {
        class: 'v-dialog-overlay',
        style: {
          'z-index': options.backdropZIndex
        }
      }
      child.push(h('div', backdropOption))
    }

    const transitionOption = {
      name: 'v-dialog--fade',
      appear: true
    }
    return h(Transition, transitionOption, () => child)
  }
  /**
   * Generate dialog content
   *
   * @param {object} options
   * @returns
   */
  function generateDialogContent (options) {
    const option = {
      class: options.className
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
      class: ['v-dialog', { 'v-dialog--buzz-out': shaking.value }],
      style: {
        'z-index': options.dialogZIndex
      },
      onClick: e => {
        if (e.target !== e.currentTarget) return
        outsideClick(props, close, shaking)
      }
    }
    return h('div', option, dialog)
  }

  return {
    show,
    generateBackdrop,
    generateDialogContent,
    generateDialogContainer
  }
}
