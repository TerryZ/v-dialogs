<template>
  <h3 class="mb-3">
    Alert
  </h3>
  <div class="">
    <div class="mb-5">
      <h5>Options</h5>
      <div class="d-flex">
        <div class="form-check me-3">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="icon"
            :true-value="true"
            :false-value="false"
            id="dialog-use-icon"
          >
          <label
            class="form-check-label"
            for="dialog-use-icon"
          >
            Use icon
          </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="colorfulShadow"
            :true-value="true"
            :false-value="false"
            id="dialog-colorful-shadow"
          >
          <label
            class="form-check-label"
            for="dialog-colorful-shadow"
          >
            Colorful Shadow
          </label>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <h5>Message alert</h5>
      <div>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="openOneAlert"
        >
          Open a Alert Dialog
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="openAlert"
        >
          Info
        </button>
        <button
          type="button"
          class="btn btn-outline-warning me-3"
          @click="openAlert('warning')"
        >
          Warning
        </button>
        <button
          type="button"
          class="btn btn-outline-danger me-3"
          @click="openAlert('error')"
        >
          Error
        </button>
        <button
          type="button"
          class="btn btn-outline-success me-3"
          @click="openAlert('success')"
        >
          Success
        </button>

        <!-- <button
          type="button"
          class="btn btn-outline-secondary"
          @click="callMethod"
        >
          call
        </button> -->
      </div>
    </div>

    <div class="mb-5">
      <h5>Confirm alert</h5>
      <div class="">
        <button
          type="button"
          class="btn btn-outline-primary me-3"
          @click="openConfirmAlert"
        >
          Confirm
        </button>
      </div>
    </div>

    <div class="mb-3">
      <h5>Features</h5>
      <div class="">
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="autoClose"
        >
          Auto close Alert dialog
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="customTitle"
        >
          Custom title
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="backdropClose"
        >
          Backdrop close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DialogAlert } from '@/'

const icon = ref(true)
const colorfulShadow = ref(true)

function openOneAlert () {
  DialogAlert('Hello, This is a <b>Alert Dialog</b>!')
}
function openAlert (type) {
  DialogAlert('Hello, <b>world!</b>', () => {
    DialogAlert('Dialog closed.')
  }, {
    icon: icon.value,
    messageType: typeof type === 'string' ? type : undefined,
    colorfulShadow: colorfulShadow.value
  })
}
function openConfirmAlert () {
  DialogAlert('Are you sure?', () => {
    // console.log('callback')
    DialogAlert('Dialog closed.')
  }, {
    messageType: 'confirm',
    language: 'cn',
    icon: icon.value,
    cancelCallback () {
      DialogAlert('Confirm dialog canceled.')
    }
  })
}
function autoClose () {
  DialogAlert('Alert dialog will auto close in 3 second.', {
    duration: 3000
  })
}
function customTitle () {
  DialogAlert('Hello', {
    title: 'This is Alert Dialog'
  })
}
function backdropClose () {
  DialogAlert('Hello', {
    backdropClose: true
  })
}
</script>
