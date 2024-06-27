import { inject } from 'vue'
import { propsInjectionKey } from '../../constants'

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
      switchMaximize,
      closeDialogWithoutCallback
    } = inject(propsInjectionKey)

    return () => (
      <div class='v-dialog-header'>
        <h3>{title}</h3>
        {maxButton && (
          <button
            type='button'
            class='v-dialog-btn__maximize'
            onClick={switchMaximize}
          >
            {maximize.value ? <IconRestore /> : <IconMaximize />}
          </button>
        )}
        {closeButton && (
          <button
            type='button'
            class='v-dialog-btn__close'
            onClick={closeDialogWithoutCallback}
          >
            <IconClose />
          </button>
        )}
      </div>
    )
  }
}
