<template>
  <h3 class="mb-3">
    Toast
  </h3>
  <div class="">
    <div class="mb-3">
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
      </div>
    </div>
    <div class="mb-3">
      <h5>Placement</h5>
      <div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="placement-top-left"
            value="top-left"
            v-model="placement"
          >
          <label
            class="form-check-label"
            for="placement-top-left"
          >Top left</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="placement-top-right"
            value="top-right"
            v-model="placement"
          >
          <label
            class="form-check-label"
            for="placement-top-right"
          >Top right</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="placement-bottom-left"
            value="bottom-left"
            v-model="placement"
          >
          <label
            class="form-check-label"
            for="placement-bottom-left"
          >Bottom left</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="placement-bottom-right"
            value="bottom-right"
            v-model="placement"
          >
          <label
            class="form-check-label"
            for="placement-bottom-right"
          >Bottom right</label>
        </div>
      </div>
    </div>
    <div class="mb-5">
      <h5>Message notification</h5>
      <div>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="openOneToast"
        >
          Open a Message Dialog
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="openToast()"
        >
          Info
        </button>
        <button
          type="button"
          class="btn btn-outline-warning me-3"
          @click="openToast(undefined, 'warning')"
        >
          Warning
        </button>
        <button
          type="button"
          class="btn btn-outline-danger me-3"
          @click="openToast(undefined, 'error')"
        >
          Error
        </button>
        <button
          type="button"
          class="btn btn-outline-success me-3"
          @click="openToast(undefined, 'success')"
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
          @click="noTitle"
        >
          No title
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="noCloseButton"
        >
          No close button
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
  DialogToast,
  DialogToastWarning,
  DialogToastError,
  DialogToastSuccess
} from '@/'

const icon = ref(true)
const closeBtn = ref(true)
const placement = ref('top-right')

function openOneToast () {
  // using VNode content
  const content = h('div', [
    'Provide contextual feedback messages for typical user actions with ',
    h('strong', 'the handful of available and flexible alert messages')
  ])
  DialogToast(content)
}
function openToast (content = 'Hello world.', type = 'info') {
  DialogToast(content, () => {
    // DialogToast('Dialog closed.')
    console.log('message closed.')
  }, {
    icon: icon.value,
    messageType: type,
    placement: placement.value,
    closeButton: closeBtn.value
  })
}
function noAutoClose () {
  DialogToast('Hello world', { duration: 0, icon: false })
}
function noCloseButton () {
  DialogToast('Click close button to dismiss notification.', () => {
    console.log('message closed.')
  }, {
    placement: placement.value,
    duration: 0,
    closeButton: false
  })
}
function longText () {
  DialogToast('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', {
    icon: icon.value,
    placement: placement.value,
    closeButton: closeBtn.value
  })
}
function noTitle () {
  DialogToast('Hello, world', { header: false })
}
function customTitle () {
  DialogToast('Hello, world', { title: 'This is Toast title, This is Toast title, This is Toast title, This is Toast title, This is Toast title' })
}
function quickInfo () {
  DialogToast('Hello')
}
function quickWarning () {
  DialogToastWarning('Hello')
}
function quickError () {
  DialogToastError('Hello')
}
function quickSuccess () {
  DialogToastSuccess('Hello')
}
</script>
