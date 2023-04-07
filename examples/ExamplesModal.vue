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
          @click="openModal"
        >
          Modal
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

function generateOption () {
  return {
    title: 'User Profile',
    backdrop: true,
    backdropClose: false,
    params: { name: 'Terry Zeng' }
  }
}
function openModal () {
  const options = {
    ...generateOption(),
    width: 500,
    height: 620,
    customClass: 'rounded-0',
    callback: data => {
      console.log(data)
      if (data) {
        DialogAlert(`Received user name: ${data?.companyName}`)
      }
    }
  }
  DialogModal(UserProfile, options)
}
function fullscreen () {
  const options = {
    ...generateOption(),
    customClass: 'bg-light',
    fullscreen: true
  }
  DialogModal(UserProfile, options)
}
</script>
