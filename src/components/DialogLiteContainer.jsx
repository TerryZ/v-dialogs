import { Transition, Teleport, inject } from 'vue'

import { propsInjectionKey } from '../constants'

export default {
  name: 'DialogLiteContainer',
  props: {
    id: { type: [String, Number], default: '' },
    containerClass: { type: [String, Array, Object], default: '' },
    transitionName: { type: String, default: '' }
  },
  setup (props, { slots }) {
    const {
      show,
      dialogStyles,
      dialogZIndex,
      customClass,
      onTransitionAfterEnter,
      onTransitionAfterLeave
    } = inject(propsInjectionKey)

    const classes = [
      'v-dialog-lite',
      props.containerClass,
      customClass
    ]

    return () => (
      <Teleport to='body'>
        <div
          id={props.id}
          class={classes}
          style={{ ...dialogStyles.value, 'z-index': dialogZIndex }}
        >
          <Transition
            name={props.transitionName}
            onAfterEnter={onTransitionAfterEnter}
            onAfterLeave={onTransitionAfterLeave}
            appear
          >
            {() => show.value && slots.default && slots.default()}
          </Transition>
        </div>
      </Teleport>
    )
  }
}
