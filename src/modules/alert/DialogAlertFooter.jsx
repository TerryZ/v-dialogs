import { ref, inject, onMounted } from 'vue'


export default {
  name: 'DialogAlertFooter',
  props: {
  },
  setup (props) {
    const btnOk = ref()

    const lang = inject('lang')
    const isConfirmType = inject('isConfirmType')
    const closeAlert = inject('closeAlert')
    const cancelAlert = inject('cancelAlert')

    onMounted(() => {
      // set the default focus on the OK button
      btnOk.value && btnOk.value.focus()
    })

    return () => {
      return (
        <div
          class='v-dialog-footer'
        >
          <div class='v-dialog-alert__buttons'>
            <button
              type='button'
              class='v-dialog-btn__ok'
              ref={btnOk}
              onClick={closeAlert}
            >{lang.btnOk}</button>

            {isConfirmType && (
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
}
