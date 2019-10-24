import mixins from '../mixins'
import render from '../mixins/render'

export default {
  name: 'DialogModal',
  mixins: [mixins, render],
  props: {
    component: Object,
    /**
     * Send parameters to Component
     * you need use props to receive this params in component
     */
    params: Object,
    /**
     * Full screen dialog
     */
    fullWidth: {
      type: Boolean,
      default: false
    },
    maxButton: {
      type: Boolean,
      default: true
    },
    closeButton: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      maximize: false,
      animate: false
    }
  },
  computed: {
    classes () {
      return {
        'v-dialog': true,
        'v-dialog-modal': true,
        'v-dialog--maximize': this.maximize,
        'v-dialog--buzz-out': this.shake
      }
    },
    maxClass () {
      return this.maximize ? 'dlg-icon-restore' : 'dlg-icon-max'
    }
  },
  render (h) {
    const child = []
    // dialog header
    if (this.titleBar !== false) {
      const buttons = []
      if (this.closeButton) {
        buttons.push(h('button', {
          class: 'v-dialog-btn__close',
          attrs: {
            type: 'button'
          },
          on: {
            click: () => {
              this.closeDialog(true)
            }
          }
        }, [
          h('i', { class: 'dlg-icon-font dlg-icon-close' })
        ]))
      }
      if (this.maxButton) {
        buttons.push(h('button', {
          class: 'v-dialog-btn__maximize',
          attrs: {
            type: 'button'
          },
          on: {
            click: this.max
          }
        }, [
          h('i', {
            class: ['dlg-icon-font', this.maxClass]
          })
        ]))
      }
      child.push(h('div', {
        class: 'v-dialog-header',
        ref: 'header'
      }, [
        ...buttons,
        h('h3', this.titleBar)
      ]))
    }
    // dialog body
    child.push(h('div', {
      class: 'v-dialog-body',
      style: {
        height: this.bodyHeight + 'px'
      }
    }, [
      // Dynamic component
      h(this.component, {
        props: this.params,
        on: {
          close: this.modalClose
        }
      })
    ]))

    const dialog = h('div', {
      class: {
        'v-dialog-dialog': true,
        'v-dialog-default-animated': this.animate
      },
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        top: this.dialogTop + 'px'
      }
    }, [
      this.buildDlgContent(h, {
        className: 'v-dialog-content',
        transitionName: 'v-dialog--smooth',
        child: child
      })
    ])

    return h('div', [
      this.buildDlgScreen(h, dialog),
      this.buildBackdrop(h)
    ])
  },
  methods: {
    /**
     * dialog max size
     */
    max () {
      if (!this.animate) this.animate = true
      this.maximize = !this.maximize
      this.modalAdjust()
    },
    modalAdjust () {
      if (this.maximize) this.dialogTop = 0
      else this.adjust()
    },
    modalClose (data) {
      this.closeDialog(false, data)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.titleBar) {
        const headerHeight = this.$refs.header.offsetHeight// this.$refs.header.getBoundingClientRect().height;
        this.bodyHeight = this.height - headerHeight
      } else this.bodyHeight = this.height

      this.modalAdjust()
    })
  }
}
