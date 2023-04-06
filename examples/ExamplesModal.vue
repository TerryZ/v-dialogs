<template>
  <h3 class="mb-3">
    Modal
  </h3>
  <div class="">
    <div class="mb-3">
      <h5>Modal</h5>
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
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { DialogModal } from '@/'
import UserProfile from './UserProfile.vue'

function openModal () {
  const options = {
    width: 500,
    height: 620,
    title: 'User Profile',
    customClass: 'aabbcc',
    backdrop: true,
    backdropClose: true,
    params: { name: 'Terry Zeng' },
    callback: data => {
      console.log(data)
      // this.$dlg.alert(`Received user name: ${data.name}`)
    }
  }
  DialogModal(UserProfile, options)
}
</script>
