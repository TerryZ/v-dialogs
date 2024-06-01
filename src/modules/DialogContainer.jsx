import { ref, Transition, Teleport, inject } from 'vue'

import { alertInjectionKey } from '../constants'

export default {
  name: 'DialogContainer',
  props: {
    className: { type: [String, Array], default: '' },
    /** Dialog transition name */
    transitionName: { type: String, default: '' }
  },
  setup (props, { slots }) {
    const {
      backdrop,
      backdropClose,
      customClass,
      closeDialogWithCallback,
      shake,
      show,
      dialogStyles,
      dialogZIndex,
      backdropZIndex
    } = inject(alertInjectionKey)

    const shaking = ref(false)

    function outsideClick () {
      if (!backdrop) return

      if (backdropClose) return closeDialogWithCallback()

      if (!shake) return
      // shake animation playing
      if (shaking.value) return
      // play shake animation
      shaking.value = true
      setTimeout(() => { shaking.value = false }, 750)
    }
    function generateBackdrop () {
      if (!backdrop) return

      return (
        <Teleport to='body'>
          <Transition
            name='v-dialog--fade'
            appear={true}
          >
            {() => show.value && (
              <div
                class='v-dialog-overlay'
                style={{ 'z-index': backdropZIndex }}
              />
            )}
          </Transition>
        </Teleport>
      )
    }
    // ...options?.class
    function generateContainer () {
      const classes = ['v-dialog', { 'v-dialog--buzz-out': shaking.value }]
      const contentClasses = [props.className, customClass]

      return (
        <Teleport to='body'>
          <div
            class={classes}
            style={{ 'z-index': dialogZIndex }}
            onClick={e => {
              if (e.target !== e.currentTarget) return
              outsideClick()
            }}
          >
            <div class='v-dialog-dialog' style={dialogStyles.value}>
              <Transition
                name={props.transitionName}
                appear={true}
              >
                {() => show.value && (
                  <div class={contentClasses} >{slots.default()}</div>
                )}
              </Transition>
            </div>
          </div>
        </Teleport>
      )
    }

    return () => [generateBackdrop(), generateContainer()]
  }
}
