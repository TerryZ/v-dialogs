import { inject } from 'vue'
import { modalInjectionKey, DIALOG_HEADER_CLASS } from '../../constants'

import IconClose from '../../icons/IconClose.vue'
import IconMaximize from '../../icons/IconMaximize.vue'
import IconRestore from '../../icons/IconRestore.vue'

export default {
  setup () {
    const {
      maxButton,
      maximize,
      title,
      closeButton,
      closeDialogWithCallback
    } = inject(modalInjectionKey)

    return () => (
      <div class={DIALOG_HEADER_CLASS}>
        <h3>{title}</h3>
        {maxButton && (
          <button
            type='button'
            class='v-dialog-btn__maximize'
            onClick={maximizeModal}
          >
            {maximize.value ? <IconRestore /> : <IconMaximize />}
          </button>
        )}
        {closeButton && (
          <button
            type='button'
            class='v-dialog-btn__close'
            onClick={closeDialogWithCallback}
          >
            <IconClose />
          </button>
        )}
      </div>
    )
  }
}
