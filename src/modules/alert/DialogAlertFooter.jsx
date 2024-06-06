import { ref, inject, onMounted } from 'vue'

import { propsInjectionKey } from '../../constants'
import { isConfirmType } from '../../core/alert'

export default {
  name: 'DialogAlertFooter',
  setup () {
    const btnOk = ref()

    const {
      messageType,
      lang,
      closeDialogWithCallback,
      cancelAlert
    } = inject(propsInjectionKey)

    onMounted(() => {
      // set the default focus on the OK button
      btnOk.value && btnOk.value.focus()
    })

    return () => (
      <div
        class='v-dialog-footer'
      >
        <div class='v-dialog-alert__buttons'>
          <button
            type='button'
            class='v-dialog-btn__ok'
            ref={btnOk}
            onClick={closeDialogWithCallback}
          >{lang.btnOk}</button>

          {isConfirmType(messageType) && (
            <button
              type='button'
              class='v-dialog-btn__cancel'
              onClick={cancelAlert}
            >{lang.btnCancel}</button>
          )}
        </div>
      </div>
    )
  }
}
