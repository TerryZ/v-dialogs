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
        <div class="form-check me-3">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="closeBtn"
            :true-value="true"
            :false-value="false"
            id="dialog-close-button"
          >
          <label
            class="form-check-label"
            for="dialog-close-button"
          >
            Close button
          </label>
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            true-value="top"
            false-value="bottom"
            checked
            v-model="placement"
          >
          <label
            class="form-check-label"
            for="flexSwitchCheckChecked"
          >Placement Top</label>
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
          @click="openMessage()"
        >
          Info
        </button>
        <button
          type="button"
          class="btn btn-outline-warning me-3"
          @click="openMessage(undefined, 'warning')"
        >
          Warning
        </button>
        <button
          type="button"
          class="btn btn-outline-danger me-3"
          @click="openMessage(undefined, 'error')"
        >
          Error
        </button>
        <button
          type="button"
          class="btn btn-outline-success me-3"
          @click="openMessage(undefined, 'success')"
        >
          Success
        </button>
      </div>
    </div>

    <div class="mb-3">
      <h5>Features</h5>
      <div class="mb-3">
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="noAutoClose"
        >
          Do not auto close
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
          @click="longText"
        >
          Long text
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="bottomPlacement"
        >
          Show at bottom
        </button>
      </div>

      <div>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="rounded"
        >
          Rounded border
        </button>
      </div>
    </div>

    <div class="mb-3">
      <h5>Quick access</h5>
      <div class="mb-3">
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="quickInfo"
        >
          Quick info
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="quickWarning"
        >
          Quick warning
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="quickError"
        >
          Quick error
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="quickSuccess"
        >
          Quick success
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import {
  DialogMessage,
  DialogMessageWarning,
  DialogMessageError,
  DialogMessageSuccess
} from '@/'

const icon = ref(true)
const closeBtn = ref(true)
const placement = ref('top')

function openOneMessage () {
  // using VNode content
  const content = h('div', [
    'Provide contextual feedback messages for typical user actions with ',
    h('strong', 'the handful of available and flexible alert messages')
  ])
  DialogMessage(content)
}
function openMessage (content = 'Hello world.', type = 'info') {
  DialogMessage(content, () => {
    // DialogMessage('Dialog closed.')
    console.log('message closed.')
  }, {
    icon: icon.value,
    messageType: type,
    placement: placement.value,
    closeButton: closeBtn.value
  })
}
function noAutoClose () {
  DialogMessage('Hello world', { duration: 0, icon: false })
}
function closeButton () {
  DialogMessage('Click close button to dismiss notification.', () => {
    console.log('message closed.')
  }, {
    placement: placement.value,
    duration: 0,
    closeButton: true
  })
}
function longText () {
  DialogMessage('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', {
    icon: icon.value,
    placement: placement.value,
    closeButton: closeBtn.value
  })
}
function bottomPlacement () {
  DialogMessage('Hello, world', { placement: 'bottom' })
}
function rounded () {
  DialogMessage('Hello, world', { pill: false })
}
function quickInfo () {
  DialogMessage('Hello')
}
function quickWarning () {
  DialogMessageWarning('Hello')
}
function quickError () {
  DialogMessageError('Hello')
}
function quickSuccess () {
  DialogMessageSuccess('Hello')
}
</script>
