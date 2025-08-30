<template>
  <h3 class="mb-3">
    Drawer
  </h3>
  <div class="d-flex flex-column">
    <div class="mb-3">
      <h5>Features</h5>
      <div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="border-rounded"
            v-model="rounded"
          >
          <label
            class="form-check-label"
            for="border-rounded"
          >
            Border rounded
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
            id="placement-top"
            value="top"
            v-model="placement"
          >
          <label
            class="form-check-label"
            for="placement-top"
          >Top</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="placement-bottom"
            value="bottom"
            v-model="placement"
          >
          <label
            class="form-check-label"
            for="placement-bottom"
          >Bottom</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="placement-left"
            value="left"
            v-model="placement"
          >
          <label
            class="form-check-label"
            for="placement-left"
          >Left</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="placement-right"
            value="right"
            v-model="placement"
          >
          <label
            class="form-check-label"
            for="placement-right"
          >Right</label>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <h5>Base</h5>
      <div class="d-flex gap-3 flex-wrap">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="base"
        >
          Drawer
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="noBackdropClose"
        >
          Do not backdrop close
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="noHeader"
        >
          No header(border-0)
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="noBackdrop"
        >
          No backdrop
        </button>
      </div>
    </div>

    <div class="mb-3">
      <h5>Buttons</h5>
      <div>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="noCloseButton"
        >
          No close button(min size)
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
          <DialogDrawerBox
            v-model:visible="visible"
            title="abcd"
            @close="modalBoxClose"
          >
            <div class="p-3">
              这是一个使用 DialogDrawerBox 打开的模态窗口
            </div>
          </DialogDrawerBox>
          <DialogDrawerBox
            v-model:visible="visibleUserControl"
            :header="false"
          >
            <CardPanel @close="handleCloseModal" />
          </DialogDrawerBox>
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
import { DialogDrawer, DialogAlert, DialogDrawerBox } from '@/'
import UserProfile from './UserProfile.vue'
import CardPanel from './CardPanel.vue'

const visible = ref(false)
const visibleUserControl = ref(false)
const placement = ref('right')
const rounded = ref(true)

function openDrawer (params) {
  const options = {
    title: 'User Profile',
    backdrop: true,
    params: { name: 'Terry Zeng' },
    placement: placement.value,
    rounded: rounded.value,
    ...params
  }
  DialogDrawer(UserProfile, options)
}
function base () {
  openDrawer({
    width: 500,
    height: 320,
    callback: (name, data) => {
      // console.log(data)
      console.log('event name: ', name)
      console.log('event data: ', data)
      if (name === 'close') {
        DialogAlert(`Received user name: ${data[0]?.companyName}`)
      }
    }
  })
}
function noBackdropClose () {
  openDrawer({
    backdropClose: false
  })
}
function noHeader () {
  openDrawer({
    customClass: 'rounded-0',
    header: false
  })
}
function noBackdrop () {
  openDrawer({
    backdrop: false
  })
}
function noCloseButton () {
  openDrawer({
    closeButton: false,
    width: 100,
    height: 50
  })
}

function modalBoxClose () {
  console.log(visible.value)
}

function openCardPanel () {
  // 使用函数返回组件
  DialogDrawer(() => CardPanel, {
    width: 330,
    height: 420,
    header: false
  })
}
function handleCloseModal () {
  visibleUserControl.value = false
}
</script>
