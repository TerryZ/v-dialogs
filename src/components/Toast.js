import { messageTypes } from '../constants'
import mixins from '../mixins'

export default {
  name: 'DialogToast',
  mixins: [mixins],
  props: {
    /**
     * Dialog message type (work on alert, toast mode)
     *
     * @enum 'info' - default
     * @enum 'warning'
     * @enum 'error'
     * @enum 'success'
     * @enum 'confirm' ( not available for toast )
     */
    messageType: {
      type: String,
      default: messageTypes.info
    },
    icon: {
      type: Boolean,
      default: true
    },
    iconClassName: String,
    /**
     * Dialog corner position type
     */
    position: {
      type: String,
      default: 'bottomRight'
    },
    closeButton: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dialogSize: {}
    }
  },
  render (h) {
    const child = []
    // Close button
    if (this.closeButton) {
      child.push(h('button', {
        attrs: { type: 'button' },
        class: 'v-dialog-toast__close',
        on: {
          click: () => {
            this.closeDialog(false)
          }
        }
      }, '×'))
    }
    // Type icon
    if (this.icon) {
      child.push(h('div', {
        class: 'v-dialog-toast__icon'
      }, [
        h('i', { class: ['dlg-icon-font', this.iconClassName] })
      ]))
    }

    // Title and content
    child.push(h('div', {
      class: 'v-dialog-toast__content'
    }, [
      h('h3', this.titleBar),
      h('p', {
        domProps: {
          innerHTML: this.message
        }
      })
    ]))

    const body = h('div', {
      class: 'v-dialog-body',
      style: {
        height: this.bodyHeight + 'px'
      }
    }, [
      h('div', { class: ['v-dialog-toast__container', this.contentClass, this.icon ? '' : 'no-icon'] }, child)
    ])

    const dialog = h('div', {
      class: 'v-dialog-dialog',
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        top: this.dialogTop + 'px'
      }
    }, [
      h('div', { class: 'v-dialog-content' }, [body])
    ])

    return h('transition', {
      props: {
        name: 'v-dialog--smooth',
        appear: true
      }
    }, [
      h('div', {
        class: ['v-dialog', 'v-dialog-toast', this.position],
        style: {
          ...this.dialogSize,
          'z-index': this.dialogZIndex
        },
        directives: [{
          name: 'show',
          value: this.show
        }]
      }, [dialog])
    ])
  },
  mounted () {
    this.dialogSize = {
      width: this.width + 'px',
      height: this.height + 'px'
    }
    this.bodyHeight = this.height
  }
}
