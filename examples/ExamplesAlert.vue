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

        <!-- <button
          type="button"
          class="btn btn-outline-secondary"
          @click="callMethod"
        >
          call
        </button> -->
      </div>
    </div>

    <div class="mb-3">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { getInstance } from '@/utils/instance'
import { DialogAlert } from '@/'

const icon = ref(true)
const colorfulShadow = ref(true)

function openAlert (type) {
  // const body = ref(document.body)

  // const app = getInstance()
  // console.log(app)

  // console.dir(body.value)
  // app.closeAll(() => {
  //   console.log('close all')
  // })
  DialogAlert('Hello, <b>world!</b>', () => {
    // console.log('callback')
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
// function callMethod () {
// const dialogs = ref(document.querySelector('.v-dialogs-container'))
// console.dir(dialogs.value)
// const root = document.querySelector('#v-dialogs-container')
// const root = ref(document.querySelector('#v-dialogs-container'))
// console.dir(root.value)
// root.value.closeAll(() => {
//   console.log('close all')
// })

// const instance = document.querySelector('.v-dialogs-container')._instance
// instance.closeAll(() => {
//   console.log('close all')
// })
// console.dir(DialogHelper)
// }

onMounted(() => {
  // const app = getInstance()
  // console.log(app)
  // app.closeAll(() => {
  //   console.log('close all')
  // })

  // console.dir(document.querySelector('.v-dialogs-container'))

  // const instance = document.querySelector('.v-dialogs-container').__vueParentComponent
  // // const instance = document.querySelector('.v-dialogs-container').__vnode
  // console.dir(instance)
  // instance.exposed.closeAll(() => {
  //   console.log('close all')
  // })
})
</script>
