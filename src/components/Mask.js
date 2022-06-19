import '../styles/mask.sass'

import mixins from '../mixins'
import render from '../mixins/render'
import { calculateDialogTop, textTruncate } from '../utils/helper'
import { MASK_MAX_CONTENT_LENGTH } from '../constants'

export default {
  name: 'DialogMask',
  mixins: [mixins, render],
  computed: {
    classes () {
      return {
        'v-dialog': true,
        'v-dialog--buzz-out': this.shake
      }
    },
    messageText () {
      const { message } = this
      if (message.length > MASK_MAX_CONTENT_LENGTH) {
        return textTruncate(message, MASK_MAX_CONTENT_LENGTH)
      }
      return message
    }
  },
  render (h) {
    const contentOption = {
      class: 'v-dialog-mask__content',
      domProps: {
        innerHTML: this.messageText
      }
    }
    const bodyOption = {
      class: 'v-dialog-body',
      style: {
        height: this.bodyHeight + 'px'
      }
    }
    const body = h('div', bodyOption, [
      h('div', { class: 'v-dialog-mask__container' }, [
        h('div', { class: 'v-dialog-timer' }),
        h('div', contentOption)
      ])
    ])

    const dialog = h('div', {
      class: 'v-dialog-dialog',
      style: this.dialogStyles
    }, [
      this.generateDialogContent({
        className: 'v-dialog-content',
        transitionName: 'v-dialog--candy',
        child: [body]
      })
    ])

    return h('div', [
      this.generateDialogScreen(dialog),
      this.generateBackdrop()
    ])
  },
  mounted () {
    const { height } = this
    this.bodyHeight = height
    this.dialogTop = calculateDialogTop(height)
  }
}
