export default {
  methods: {
    /**
     * Building backdrop layer
     *
     * @param {*} h
     * @returns
     */
    buildBackdrop (h) {
      const child = []
      if (this.backdrop && this.show) {
        child.push(h('div', {
          class: 'v-dialog-overlay',
          style: {
            'z-index': this.backdropZIndex
          }
        }))
      }
      return h('transition', {
        props: {
          name: 'v-dialog--fade',
          appear: true
        }
      }, child)
    },
    /**
     * Build dialog content
     *
     * @param {function} h - createElement
     * @param {object} options
     * @returns
     */
    buildDlgContent (h, options) {
      const { className, transitionName, child } = options

      const content = h('div', {
        class: className,
        directives: [{
          name: 'show',
          value: this.show
        }]
      }, child)
      return h('transition', {
        props: {
          name: transitionName,
          appear: true
        }
      }, [content])
    },
    /**
     * Build dialog major screen
     *
     * @param {*} h
     * @param {*} dialog
     * @returns
     */
    buildDlgScreen (h, dialog) {
      return h('div', {
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
      }, [dialog])
    }
  }
}
