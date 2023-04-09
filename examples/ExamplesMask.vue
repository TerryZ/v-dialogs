<template>
  <h3 class="mb-3">
    Mask
  </h3>
  <div class="">
    <div class="mb-3">
      <h5>Base</h5>
      <div class="">
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="base"
        >
          Default mask
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="longText"
        >
          Long text
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { DialogMask } from '@/'

function base () {
  DialogMask()
}
function longText () {
  DialogMask('Bootstrap is a powerful, feature-packed frontend toolkit. Build anything—from prototype to production—in minutes.')
}
</script>
