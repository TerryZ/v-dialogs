import { ref, h, Transition, Teleport } from 'vue'

export function useRenderPopup (props, show) {
  const shaking = ref(false)

  function outsideClick (close) {
    if (!props.backdrop) return

    if (props.backdropClose) return close && close()

    if (!props.shaking) return
    // shake animation playing
    if (shaking.value) return

    // play shake animation
    shaking.value = true
    setTimeout(() => { shaking.value = false }, 750)
  }

  /**
   * Generate backdrop layer
   */
  function generateBackdrop (options) {
    if (!props.backdrop) return

    const children = []
    // v-if by show
    if (show.value) {
      const backdropOption = {
        class: 'v-dialog-overlay',
        style: {
          'z-index': options.backdropZIndex
        }
      }
      children.push(h('div', backdropOption))
    }

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

    const transitionOption = {
      name: options.transitionName,
      appear: true
    }
    return h(Transition, transitionOption, () => {
      return show.value && h('div', option, options.child)
    })
  }
  /**
   * Generate dialog container
   *
   * @param {VNode} dialog
   * @returns {VNode}
   */
  function generateDialogContainer (dialog, options, closeDialog) {
    const option = {
      class: ['v-dialog', { 'v-dialog--buzz-out': shaking.value, ...options?.class }],
      style: {
        'z-index': options.dialogZIndex
      },
      onClick: e => {
        if (e.target !== e.currentTarget) return
        outsideClick(closeDialog)
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
