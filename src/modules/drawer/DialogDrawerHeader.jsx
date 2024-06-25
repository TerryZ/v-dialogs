import { inject } from 'vue'
import { propsInjectionKey, DIALOG_HEADER_CLASS } from '../../constants'

import IconClose from '../../icons/IconClose.vue'

export default {
  setup () {
    const {
      title,
      closeButton,
      closeDrawerWithoutCallback
    } = inject(propsInjectionKey)

    return () => (
      <div class={DIALOG_HEADER_CLASS}>
        <h3>{title}</h3>
        {closeButton && (
          <button
            type='button'
            class='v-dialog-btn__close'
            onClick={closeDrawerWithoutCallback}
          >
            <IconClose />
          </button>
        )}
      </div>
    )
  }
}
