import '../styles/toast.sass'

import {
  TITLE_TEXT_MAX_LENGTH,
  TOAST_MAX_CONTENT_LENGTH,
  MESSAGE_TYPE_INFO
} from '../constants'
import { textTruncate } from '../utils/helper'
import mixins from '../mixins'

export default {
  name: 'DialogToast',
  mixins: [mixins],
  props: {
    /**
     * Toast dialog message type
     *
     * - 'info'(default)
     * - 'warning'
     * - 'error'
     * - 'success'
     */
    messageType: { type: String, default: MESSAGE_TYPE_INFO },
    icon: { type: Boolean, default: true },
    iconClassName: String,
    /** Dialog corner position type */
    position: { type: String, default: 'bottomRight' },
    closeButton: { type: Boolean, default: true }
  },
  data () {
    return {
      dialogSize: {}
    }
  },
  render (h) {
    const child = []
    child.push(this.generateCloseButton())
    child.push(this.generateIcon())
    child.push(this.generateContent())

    const classes = ['v-dialog', 'v-dialog-toast', this.contentClass, this.position]
    if (!this.icon) {
      classes.push('no-icon')
    }
    const containerOption = {
      class: classes,
      style: {
        ...this.dialogSize,
        'z-index': this.dialogZIndex
      },
      directives: [{
        name: 'show',
        value: this.show
      }]
    }
    return h('transition', {
      props: {
        name: 'v-dialog--smooth',
        appear: true
      }
    }, [
      h('div', containerOption, [
        h('div', { class: 'v-dialog-toast__container' }, child)
      ])
    ])
  },
  methods: {
    generateCloseButton () {
      if (!this.closeButton) return

      const buttonOption = {
        attrs: { type: 'button' },
        class: 'v-dialog-toast__close',
        on: {
          click: () => { this.closeDialog(false) }
        }
      }
      return this.$createElement('button', buttonOption, '×')
    },
    generateIcon () {
      if (!this.icon) return

      const h = this.$createElement
      const icon = h('i', { class: ['dlg-icon-font', this.iconClassName] })
      return h('div', { class: 'v-dialog-toast__icon' }, [icon])
    },
    generateHeader () {
      const { titleContent } = this
      if (!titleContent) return

      const text = textTruncate(titleContent, TITLE_TEXT_MAX_LENGTH)
      return this.$createElement('h3', text)
    },
    generateContent () {
      const contentOption = {
        domProps: {
          innerHTML: textTruncate(this.message, TOAST_MAX_CONTENT_LENGTH)
        }
      }
      const h = this.$createElement
      // Title and content
      return h('div', { class: 'v-dialog-toast__content' }, [
        this.generateHeader(),
        h('div', contentOption)
      ])
    }
  },
  mounted () {
    this.dialogSize = {
      width: this.width + 'px',
      height: this.height + 'px'
    }
    this.bodyHeight = this.height
  }
}
