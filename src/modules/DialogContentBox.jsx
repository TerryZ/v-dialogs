import { inject } from 'vue'

import { propsInjectionKey } from '../constants'

export default {
  name: 'DialogContentBox',
  props: {
    className: { type: [String, Array, Object], default: '' }
  },
  setup (props, { slots }) {
    const {
      shaking,
      customClass,
      dialogStyles
    } = inject(propsInjectionKey)

    const classes = [
      'v-dialog-content',
      props.className,
      customClass,
      {
        'v-dialog--buzz-out': shaking.value
      }
    ]
    const styles = {
      ...dialogStyles.value
    }
    return () => (
      <div
        class={classes}
        style={styles}
      >
        {slots.default && slots.default()}
      </div>
    )
  }
}
