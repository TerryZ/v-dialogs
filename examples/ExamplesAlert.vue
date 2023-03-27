<template>
  <h3 class="mb-3">
    Alert
  </h3>
  <div class="">
    <div class="mb-3">
      <h5>Message alert</h5>
      <div>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="test"
        >
          Info
        </button>
        <button
          type="button"
          class="btn btn-outline-warning me-3"
        >
          Warning
        </button>
        <button
          type="button"
          class="btn btn-outline-danger me-3"
        >
          Error
        </button>
        <button
          type="button"
          class="btn btn-outline-success me-3"
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

    <div class="">
      <h5>Confirm alert</h5>
      <div class="">
        <button
          type="button"
          class="btn btn-outline-primary me-3"
          @click="callMethod"
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
import { DialogAlert, DialogHelper } from '@/'

function test () {
  // const body = ref(document.body)

  // const app = getInstance()
  // console.log(app)

  // console.dir(body.value)
  // app.closeAll(() => {
  //   console.log('close all')
  // })
  DialogAlert()
}
function callMethod () {
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
  console.dir(DialogHelper)
}

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
