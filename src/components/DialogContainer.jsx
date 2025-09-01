import { Transition, Teleport, inject, defineComponent } from 'vue'

import { propsInjectionKey } from '../constants'

/**
 * Dialog container with backdrop
 *
 * Applies dialog components
 * - Alert
 * - Mask
 * - Modal
 * - Drawer
 */
export default defineComponent({
  name: 'DialogContainer',
  props: {
    containerClass: { type: [String, Array, Object], default: '' },
    backdropClass: { type: [String, Array, Object], default: '' },
    transitionName: { type: String, default: '' },
    appendTo: { type: [String, Object], default: 'body' }
  },
  setup (props, { slots }) {
    const {
      show,
      shaking,
      backdrop,
      backdropClose,
      shake,
      dialogZIndex,
      backdropZIndex,
      onTransitionAfterEnter,
      onTransitionAfterLeave,
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

      const classes = ['v-dialog-overlay', props.backdropClass,
        { 'v-dialog-overlay--embedded': props.appendTo !== 'body' }
      ]

      return (
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
      )
    }
    function generateContainer () {
      const classes = [props.containerClass, {
        'v-dialog--embedded': props.appendTo !== 'body'
      }]
      const styles = {
        'z-index': dialogZIndex
      }

      return (
        <div
          class={['v-dialog', classes]}
          style={styles}
          onClick={backdropClick}
        >
          <Transition
            name={props.transitionName}
            onAfterEnter={onTransitionAfterEnter}
            onAfterLeave={onTransitionAfterLeave}
            appear
          >
            {() => show.value && slots?.default()}
          </Transition>
        </div>
      )
    }

    return () => (
      <Teleport to={props.appendTo}>
        {generateBackdrop()}
        {generateContainer()}
      </Teleport>
    )
  }
})
