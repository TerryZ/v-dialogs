import { Transition, Teleport, inject } from 'vue'

import { propsInjectionKey } from '../constants'

export default {
  name: 'DialogLiteContainer',
  props: {
    containerClass: { type: [String, Array, Object], default: '' },
    transitionName: { type: String, default: '' }
  },
  setup (props, { slots }) {
    const {
      show,
      dialogStyles,
      dialogZIndex
    } = inject(propsInjectionKey)

    return () => (
      <Teleport to='body'>
        <div
          class={['v-dialog-lite', props.containerClass]}
          style={{ ...dialogStyles.value, 'z-index': dialogZIndex }}
        >
          <Transition
            name={props.transitionName}
            appear={true}
          >
            {() => show.value && slots.default && slots.default()}
          </Transition>
        </div>
      </Teleport>
    )
  }
}
