export default {
  methods: {
    /**
     * Generate backdrop layer
     */
    generateBackdrop () {
      if (!this.backdrop) return

      const h = this.$createElement
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
        props: {
          name: 'v-dialog--fade',
          appear: true
        }
      }
      return h('transition', transitionOption, child)
    },
    /**
     * Generate dialog content
     *
     * @param {object} options
     * @returns
     */
    generateDialogContent (options) {
      const h = this.$createElement
      const { className, transitionName, child } = options

      const option = {
        class: className,
        directives: [{
          name: 'show',
          value: this.show
        }]
      }
      const content = h('div', option, child)
      const transitionOption = {
        props: {
          name: transitionName,
          appear: true
        }
      }
      return h('transition', transitionOption, [content])
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
        on: {
          click: e => {
            if (e.target !== e.currentTarget) return
            this.outsideClick()
          }
        }
      }
      return this.$createElement('div', option, [dialog])
    }
  }
}
