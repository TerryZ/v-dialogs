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
      <div class="mb-3">
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
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="largeText"
        >
          Large Text
        </button>
      </div>

      <div class="mb-3">
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="noParameters"
        >
          No parameters
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="noHeader"
        >
          No header
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
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="quickConfirm"
        >
          Quick confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'

import {
  DialogAlert,
  DialogAlertWarning,
  DialogAlertError,
  DialogAlertSuccess,
  DialogAlertConfirm
} from '@/'

const icon = ref(true)
const colorfulShadow = ref(true)

function openOneAlert () {
  DialogAlert(
    h('div', [
      'Hello, This is a ',
      h('strong', 'Alert Dialog'),
      '!'
    ]),
    {
      language: 'cn',
      customClass: 'rounded-0'
    }
  )
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
function customTitle () {
  DialogAlert('Hello', {
    title: 'This is Alert Dialog, This is Alert Dialog, This is Alert Dialog, This is Alert Dialog'
  })
}
function backdropClose () {
  DialogAlert('Hello', {
    backdropClose: true
  })
}
function largeText () {
  DialogAlert('Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
}
function noParameters () {
  DialogAlert()
}
function noHeader () {
  DialogAlert('Hello world', { header: false })
}
function quickInfo () {
  DialogAlert()
}
function quickWarning () {
  DialogAlertWarning('Hello')
}
function quickError () {
  DialogAlertError('Hello')
}
function quickSuccess () {
  DialogAlertSuccess('Hello')
}
function quickConfirm () {
  DialogAlertConfirm('Hello')
}
</script>
