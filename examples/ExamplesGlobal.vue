<template>
  <h3 class="mb-3">
    Global instance
  </h3>
  <div class="mb-5">
    <h5>$dlg</h5>
    <div class="mb-3">
      <button
        type="button"
        class="btn btn-outline-secondary me-3"
        @click="openAlert"
      >
        Alert
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary me-3"
        @click="openModal"
      >
        Modal
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary me-3"
        @click="openDrawer"
      >
        Drawer
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary me-3"
        @click="openMessage"
      >
        Message
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary me-3"
        @click="openToast"
      >
        Toast
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary me-3"
        @click="openMask"
      >
        Mask
      </button>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue'

import CardPanel from './CardPanel.vue'

const ctx = getCurrentInstance()
// const dlg = ctx.appContext.config.globalProperties.$dlg
const dlg = ctx.proxy.$dlg

function openAlert () {
  dlg.alert('Hello world!')
}
function openModal () {
  dlg.modal(CardPanel)
}
function openDrawer () {
  dlg.drawer(CardPanel)
}
function openMessage () {
  dlg.message('Hello world!')
}
function openToast () {
  dlg.toast('Hello world!')
}
function openMask () {
  dlg.mask('Hello world!')
}
</script>
