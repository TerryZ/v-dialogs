import { ref, inject, onMounted } from 'vue'

import { propsInjectionKey } from '../../constants'

export default {
  name: 'DialogAlertFooter',
  setup () {
    const btnOk = ref()

    const {
      lang,
      cancelAlert,
      isConfirmType,
      closeWithCallback
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
            onClick={closeWithCallback}
          >{lang.btnOk}</button>

          {isConfirmType() && (
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
