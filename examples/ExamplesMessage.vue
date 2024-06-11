<template>
  <h3 class="mb-3">
    Message
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
      <h5>Message notification</h5>
      <div>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="openOneMessage"
        >
          Open a Message Dialog
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="openMessage"
        >
          Info
        </button>
        <button
          type="button"
          class="btn btn-outline-warning me-3"
          @click="openMessage('warning')"
        >
          Warning
        </button>
        <button
          type="button"
          class="btn btn-outline-danger me-3"
          @click="openMessage('error')"
        >
          Error
        </button>
        <button
          type="button"
          class="btn btn-outline-success me-3"
          @click="openMessage('success')"
        >
          Success
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
          @click="closeButton"
        >
          Close button
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="bottomPlacement"
        >
          Show at bottom
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DialogMessage } from '@/'

const icon = ref(true)
const colorfulShadow = ref(true)

function openOneMessage () {
  DialogMessage('Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages')
}
function openMessage (type) {
  DialogMessage('Hello, <b>world!</b>', () => {
    DialogMessage('Dialog closed.')
  }, {
    icon: icon.value,
    messageType: typeof type === 'string' ? type : undefined,
    colorfulShadow: colorfulShadow.value
  })
}
function closeButton () {
  DialogMessage('Click close button to dismiss notification.', {
    closeButton: true
  })
}
function bottomPlacement () {
  DialogMessage('Hello, world', { placement: 'bottom' })
}
</script>
