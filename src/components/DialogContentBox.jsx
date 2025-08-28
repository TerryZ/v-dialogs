import { inject, computed } from 'vue'

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

    const classes = computed(() => (
      ['v-dialog-content', props.className, customClass,
        { 'v-dialog--buzz-out': shaking.value }
      ]
    ))
    const styles = computed(() => ({ ...dialogStyles.value }))

    return () => (
      <div
        class={classes.value}
        style={styles.value}
      >
        {slots?.default()}
      </div>
    )
  }
}
