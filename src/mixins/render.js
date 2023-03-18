import { h, vShow, withDirectives, Transition } from 'vue'

export default {
  methods: {
    /**
     * Generate backdrop layer
     */
    generateBackdrop () {
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
    },
    /**
     * Generate dialog content
     *
     * @param {object} options
     * @returns
     */
    generateDialogContent (options) {
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
    },
    /**
     * Generate dialog major screen
     *
     * @param {VNode} dialog
     * @returns {VNode}
     */
    generateDialogScreen (dialog) {
      const option = {
        class: this.classes,
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
  }
}
