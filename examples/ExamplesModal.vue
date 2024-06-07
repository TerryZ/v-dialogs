<template>
  <h3 class="mb-3">
    Modal
  </h3>
  <div class="d-flex flex-column">
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

    <div class="mb-3">
      <h5>Card layout</h5>
      <div>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="openCardPanel"
        >
          Open a Card layout dialog
        </button>
      </div>
    </div>

    <div class="mb-5">
      <h4>使用标签</h4>
      <div>
        <h5>Base</h5>
        <div>
          <DialogModalBox
            v-model:visible="visible"
            title="abcd"
            @close="modalBoxClose"
          >
            <div class="p-3">
              这是一个使用 DialogModalBox 打开的模态窗口
            </div>
          </DialogModalBox>
          <DialogModalBox
            v-model:visible="visibleUserControl"
            :header="false"
          >
            <CardPanel @close="handleCloseModal" />
          </DialogModalBox>
          <button
            type="button"
            class="btn btn-outline-secondary me-3"
            @click="() => { visible = true }"
          >
            Open Modal Box
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary me-3"
            @click="() => { visibleUserControl = true }"
          >
            Open Modal Box with VNode content
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DialogModal, DialogAlert, DialogModalBox } from '@/'
import UserProfile from './UserProfile.vue'
import CardPanel from './CardPanel.vue'

const visible = ref(false)
const visibleUserControl = ref(false)

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
    height: 320,
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
function noHeader () {
  openModal({
    header: false
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

function modalBoxClose () {
  console.log(visible.value)
}

function openCardPanel () {
  DialogModal(CardPanel, {
    width: 330,
    height: 420,
    header: false
  })
}
function handleCloseModal () {
  visibleUserControl.value = false
}
</script>
