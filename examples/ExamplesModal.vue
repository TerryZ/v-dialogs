<template>
  <h3 class="mb-3">
    Modal
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
          Modal
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

    <div class="mb-3">
      <h5>Buttons</h5>
      <div>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="noMaxButton"
        >
          No maximize button
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
          @click="noButtons"
        >
          No buttons
        </button>
      </div>
    </div>

    <div class="mb-3">
      <h5>Fullscreen</h5>
      <div>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="fullscreen"
        >
          Open Modal dialog with fullscreen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { DialogModal, DialogAlert } from '@/'
import UserProfile from './UserProfile.vue'

function openModal (params) {
  const options = {
    title: 'User Profile',
    backdrop: true,
    backdropClose: false,
    params: { name: 'Terry Zeng' },
    ...params
  }
  DialogModal(UserProfile, options)
}
function base () {
  openModal({
    width: 500,
    height: 620,
    customClass: 'rounded-0',
    callback: data => {
      console.log(data)
      if (data) {
        DialogAlert(`Received user name: ${data?.companyName}`)
      }
    }
  })
}
function backdropClose () {
  openModal({
    backdropClose: true
  })
}
function noMaxButton () {
  openModal({
    maxButton: false
  })
}
function noCloseButton () {
  openModal({
    closeButton: false
  })
}
function noButtons () {
  openModal({
    maxButton: false,
    closeButton: false
  })
}
function fullscreen () {
  openModal({
    customClass: 'bg-light',
    fullscreen: true
  })
}
</script>
