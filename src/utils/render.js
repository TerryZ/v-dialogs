import { h, computed, vShow, withDirectives, Transition } from 'vue'

export function useRenderPopup (props) {
  /**
   * Generate backdrop layer
   */
  function generateBackdrop () {
    if (!this.backdrop) return

    const child = []
    if (this.show) {
      const backdropOption = {
        class: 'v-dialog-overlay',
        style: {
          'z-index': this.backdropZIndex
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
    const { className, transitionName, child } = options

    const option = {
      class: className,
      directives: [{
        name: 'show',
        value: this.show
      }]
    }
    const content = withDirectives(
      h('div', option, child),
      [[vShow, this.show]]
    )

    const transitionOption = {
      name: transitionName,
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
  function generateDialogContainer (dialog) {
    // TODO: shaking
    const option = {
      class: ['v-dialog', { 'v-dialog--buzz-out': true }],
      style: {
        'z-index': this.dialogZIndex
      },
      onClick: e => {
        if (e.target !== e.currentTarget) return
        this.outsideClick()
      }
    }
    return h('div', option, [dialog])
  }

  return {
    generateBackdrop,
    generateDialogContent,
    generateDialogContainer
  }
}
