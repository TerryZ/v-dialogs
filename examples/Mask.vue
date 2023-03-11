<template>
  <section>
    <h3 class="mt-5">
      Mask
    </h3>
    <div>
      <button
        type="button"
        class="btn btn-secondary me-3"
        @click="callInstanceMask"
        id="btn-mask"
      >
        Dialog instance call Mask
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="callMaskFunction"
        id="btn-mask"
      >
        Mask funciton call Dialog
      </button>
    </div>
  </section>
</template>

<script>
import { DialogMask } from '@/components/v-dialogs'

export default {
  methods: {
    callInstanceMask () {
      const dlg = this.$dlg
      const callback = () => {}
      const option = {
        // language: 'en',
        closeTime: 0
      }
      const key = dlg.mask(null, callback, option)

      console.log('mask dialog key:', key)

      setTimeout(function () {
        dlg.close(key)
      }, 3000)
    },
    callMaskFunction () {
      DialogMask('Functional mask dialog', {
        closeTime: 3
      })

      // setTimeout(() => { this.$dlg.close() }, 3000)
    }
  }
}
</script>
