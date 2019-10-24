import mixins from '../mixins'
import render from '../mixins/render'

export default {
  name: 'DialogMask',
  mixins: [mixins, render],
  computed: {
    classes () {
      return {
        'v-dialog': true,
        'v-dialog--buzz-out': this.shake
      }
    }
  },
  render (h) {
    const body = h('div', {
      class: 'v-dialog-body',
      style: {
        height: this.bodyHeight + 'px'
      }
    }, [
      h('div', { class: 'v-dialog-mask__container' }, [
        h('div', { class: 'v-dialog-timer' }),
        h('div', {
          class: 'v-dialog-mask__content',
          domProps: {
            innerHTML: this.message
          }
        })
      ])
    ])

    const dialog = h('div', {
      class: 'v-dialog-dialog',
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        top: this.dialogTop + 'px'
      }
    }, [
      this.buildDlgContent(h, {
        className: 'v-dialog-content',
        transitionName: 'v-dialog--candy',
        child: [body]
      })
    ])

    return h('div', [
      this.buildDlgScreen(h, dialog),
      this.buildBackdrop(h)
    ])
  },
  mounted () {
    this.bodyHeight = this.height
    this.adjust()
  }
}
