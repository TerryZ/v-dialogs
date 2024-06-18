import { ref, Transition, Teleport, inject, defineComponent } from 'vue'

import { propsInjectionKey } from '../constants'

export default defineComponent({
  name: 'DialogContainer',
  props: {
    contentClass: { type: [String, Array, Object], default: '' },
    bodyClass: { type: [String, Array, Object], default: '' },
    backdropClass: { type: [String, Array, Object], default: '' },
    /** Dialog transition name */
    transitionName: { type: String, default: '' },
    appendTo: { type: [String, HTMLElement], default: 'body' }
  },
  setup (props, { slots }) {
    const {
      backdrop,
      backdropClose,
      customClass,
      backdropCloseDialog = undefined,
      shake,
      show,
      dialogStyles,
      contentStyles,
      dialogZIndex,
      backdropZIndex
    } = inject(propsInjectionKey)

    const shaking = ref(false)

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
            appear={true}
          >
            {() => show.value && (
              <div
                class={classes}
                style={{ 'z-index': backdropZIndex }}
              />
            )}
          </Transition>
        </Teleport>
      )
    }
    function generateContainer () {
      const bodyClasses = [
        props.bodyClass,
        {
          'v-dialog--buzz-out': shaking.value,
          'v-dialog--embedded': props.appendTo !== 'body'
        }
      ]
      const contentClasses = [props.contentClass, customClass]
      const backdropClick = e => {
        if (e.target !== e.currentTarget) return
        outsideClick()
      }

      return (
        <Teleport to={props.appendTo}>
          <div
            class={['v-dialog', bodyClasses]}
            style={{ 'z-index': dialogZIndex }}
            onClick={backdropClick}
          >
            <div class='v-dialog-dialog' style={dialogStyles.value}>
              <Transition
                name={props.transitionName}
                appear={true}
              >
                {() => show.value && (
                  <div
                    class={contentClasses}
                    style={contentStyles.value}
                  >
                    {slots.default && slots.default()}
                  </div>
                )}
              </Transition>
            </div>
          </div>
        </Teleport>
      )
    }

    return () => [generateBackdrop(), generateContainer()]
  }
})
