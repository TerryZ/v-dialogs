import { messageTypes } from '../constants'
import mixins from '../mixins'
import render from '../mixins/render'

const { info, warning, error, success, confirm } = messageTypes

export default {
  name: 'DialogAlert',
  mixins: [mixins, render],
  props: {
    /**
     * Dialog message type (work on alert, toast mode)
     *
     * @enum 'info' - default
     * @enum 'warning'
     * @enum 'error'
     * @enum 'success'
     * @enum 'confirm'
     */
    messageType: {
      type: String,
      default: info
    },
    icon: {
      type: Boolean,
      default: true
    },
    iconClassName: String
  },
  computed: {
    shadow () {
      switch (this.messageType) {
        case warning: return 'v-dialog__shadow--warning'
        case error: return 'v-dialog__shadow--error'
        case success: return 'v-dialog__shadow--success'
        default: return ''
      }
    },
    classes () {
      return {
        'v-dialog': true,
        'v-dialog--buzz-out': this.shake
      }
    }
  },
  render (h) {
    const child = []
    // dialog header
    if (this.titleBar !== false) {
      child.push(h('div', {
        class: 'v-dialog-header',
        ref: 'header'
      }, [
        h('h3', this.titleBar)
      ]))
    }
    const buttons = []
    // Okey button
    buttons.push(h('button', {
      attrs: {
        type: 'button'
      },
      class: 'v-dialog-btn__ok',
      ref: 'btnOk',
      on: {
        click: () => {
          this.closeDialog(false)
        }
      }
    }, this.i18n.btnOk))
    // Cancel button
    if (this.messageType === confirm) {
      buttons.push(h('button', {
        attrs: {
          type: 'button'
        },
        class: 'v-dialog-btn__cancel',
        on: {
          click: () => {
            this.closeDialog(true)
          }
        }
      }, this.i18n.btnCancel))
    }
    // dialog body
    child.push(h('div', {
      class: 'v-dialog-body',
      style: {
        height: this.bodyHeight + 'px'
      }
    }, [
      h('div', { class: ['v-dialog-alert', this.icon ? this.iconClassName : 'no-icon'] }, [
        h('div', {
          class: 'v-dialog-alert__content',
          domProps: {
            innerHTML: this.message
          }
        }),
        h('div', { class: 'v-dialog-alert__buttons' }, [buttons])
      ])
    ]))

    const dialog = h('div', {
      class: 'v-dialog-dialog',
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        top: this.dialogTop + 'px'
      }
    }, [
      this.buildDlgContent(h, {
        className: ['v-dialog-content', this.shadow],
        transitionName: 'v-dialog--candy',
        child: child
      })
    ])

    return h('div', [
      this.buildDlgScreen(h, dialog),
      this.buildBackdrop(h)
    ])
  },
  mounted () {
    this.$nextTick(() => {
      if (this.titleBar) {
        const headerHeight = this.$refs.header.offsetHeight// this.$refs.header.getBoundingClientRect().height;
        this.bodyHeight = this.height - headerHeight
      } else this.bodyHeight = this.height

      this.adjust()
      this.$refs.btnOk.focus()
    })
  }
}
