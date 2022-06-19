import '../styles/modal.sass'

import mixins from '../mixins'
import render from '../mixins/render'
import { calculateDialogTop } from '../utils/helper'
import { hideDocumentBodyOverflow } from '../utils/instance'
import { DIALOG_HEADER_CLASS } from '../constants'

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
    /** Open maximized dialog */
    fullscreen: { type: Boolean, default: false },
    maxButton: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true }
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
    const contents = []

    contents.push(this.generateHeader())
    contents.push(this.generateBody())

    const dialog = h('div', {
      class: {
        'v-dialog-dialog': true,
        'v-dialog-default-animated': this.animate
      },
      style: this.dialogStyles
    }, [
      this.generateDialogContent({
        className: 'v-dialog-content',
        transitionName: 'v-dialog--smooth',
        child: contents
      })
    ])

    return h('div', [
      this.generateDialogScreen(dialog),
      this.generateBackdrop()
    ])
  },
  methods: {
    generateHeader () {
      if (this.titleContent === false) return

      const h = this.$createElement
      const buttons = []
      if (this.closeButton) {
        const closeButtonOption = {
          class: 'v-dialog-btn__close',
          attrs: {
            type: 'button'
          },
          on: {
            click: () => { this.closeDialog(true) }
          }
        }
        const closeButtonIcon = h('i', {
          class: 'dlg-icon-font dlg-icon-close'
        })
        buttons.push(h('button', closeButtonOption, [closeButtonIcon]))
      }
      if (this.maxButton) {
        const maxButtonOption = {
          class: 'v-dialog-btn__maximize',
          attrs: {
            type: 'button'
          },
          on: {
            click: this.maximizeModal
          }
        }
        const maxButtonIcon = h('i', {
          class: ['dlg-icon-font', this.maxClass]
        })
        buttons.push(h('button', maxButtonOption, [maxButtonIcon]))
      }
      return h('div', { class: DIALOG_HEADER_CLASS }, [
        ...buttons,
        h('h3', this.titleContent)
      ])
    },
    generateBody () {
      const h = this.$createElement
      // Dynamic component
      const component = h(this.component, {
        props: this.params,
        on: {
          close: this.closeModal
        }
      })
      const dialogOption = {
        class: 'v-dialog-body',
        style: {
          height: this.bodyHeight + 'px'
        }
      }
      return h('div', dialogOption, [component])
    },
    // Maximize the dialog
    maximizeModal () {
      if (!this.animate) {
        this.animate = true
      }
      this.maximize = !this.maximize
      this.setBodyHeight()
    },
    modalAdjust () {
      if (this.maximize) {
        this.dialogTop = 0
        return
      }
      this.dialogTop = calculateDialogTop(this.height)
    },
    closeModal (data) {
      this.closeDialog(false, data)
    },
    setBodyHeight () {
      const { titleContent, maximize, height } = this
      const header = this.$el.querySelector(`.${DIALOG_HEADER_CLASS}`)
      const headerHeight = titleContent ? header.offsetHeight : 0
      const dialogHeight = maximize ? window.innerHeight : height

      this.bodyHeight = dialogHeight - headerHeight
      this.$nextTick(() => {
        this.modalAdjust()
      })
    }
  },
  mounted () {
    if (this.fullscreen) {
      // do maximize after `show` data property set to true in `mixins/index.js`
      this.$nextTick(() => {
        this.maximizeModal()
      })
    } else {
      this.setBodyHeight()
    }
    hideDocumentBodyOverflow()
  }
}
