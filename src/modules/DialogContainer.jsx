import { Transition, Teleport, inject, defineComponent } from 'vue'

import { propsInjectionKey } from '../constants'

export default defineComponent({
  name: 'DialogContainer',
  props: {
    containerClass: { type: [String, Array, Object], default: '' },
    backdropClass: { type: [String, Array, Object], default: '' },
    contentClass: { type: [String, Array, Object], default: '' },
    /** Dialog transition name */
    transitionName: { type: String, default: '' },
    appendTo: { type: [String, HTMLElement], default: 'body' }
  },
  setup (props, { slots }) {
    const {
      show,
      shaking,
      transitionEnterComplete,
      backdrop,
      backdropClose,
      shake,
      dialogZIndex,
      backdropZIndex,
      destroy,
      backdropCloseDialog = undefined
    } = inject(propsInjectionKey)

    function outsideClick () {
      if (!backdrop) return

      if (backdropClose) return backdropCloseDialog && backdropCloseDialog()

      if (!shake) return
      // shake animation playing
      if (shaking.value) return
      // play shake animation
      shaking.value = true
      setTimeout(() => { shaking.value = false }, 750)
    }
    const backdropClick = e => {
      if (e.target !== e.currentTarget) return
      outsideClick()
    }
    function generateBackdrop () {
      if (!backdrop) return

      const classes = [
        'v-dialog-overlay',
        props.backdropClass,
        { 'v-dialog-overlay--embedded': props.appendTo !== 'body' }
      ]

      return (
        <Teleport to={props.appendTo}>
          <Transition
            name='v-dialog--fade'
            appear
          >
            {() => show.value && (
              <div
                class={classes}
                style={{ 'z-index': backdropZIndex }}
                onClick={backdropClick}
              />
            )}
          </Transition>
        </Teleport>
      )
    }
    function generateContainer () {
      const classes = [
        props.containerClass,
        props.contentClass,
        {
          'v-dialog--embedded': props.appendTo !== 'body'
        }
      ]
      const styles = {
        'z-index': dialogZIndex
      }
      function onAfterEnter () {
        transitionEnterComplete.value = true
      }
      function onAfterLeave () {
        destroy.value && destroy.value()
      }

      return (
        <Teleport to={props.appendTo}>
          <div
            class={['v-dialog', classes]}
            style={styles}
            onClick={backdropClick}
          >
            <Transition
              name={props.transitionName}
              appear
              onAfterEnter={onAfterEnter}
              onAfterLeave={onAfterLeave}
            >
              {() => show.value && (slots.default && slots.default())}
            </Transition>
          </div>
        </Teleport>
      )
    }

    return () => [generateBackdrop(), generateContainer()]
  }
})
