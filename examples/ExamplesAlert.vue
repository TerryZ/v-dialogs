<template>
  <h3 class="mb-3">
    Alert
  </h3>
  <div class="">
    <div class="mb-3">
      asdf
      <div>
        <button
          type="button"
          @click="test"
        >
          test
        </button>

        <button
          type="button"
          @click="callMethod"
        >
          call
        </button>
      </div>
    </div>
    <div class="">
      asdf
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getInstance } from '@/utils/instance'

function test () {
  // const body = ref(document.body)

  const app = getInstance()
  console.log(app)

  // console.dir(body.value)
  // app.closeAll(() => {
  //   console.log('close all')
  // })
}
function callMethod () {
  // const dialogs = ref(document.querySelector('.v-dialogs-container'))
  // console.dir(dialogs.value)
  // const root = document.querySelector('#v-dialogs-container')
  const root = ref(document.querySelector('#v-dialogs-container'))
  console.dir(root.value)
  root.value.closeAll(() => {
    console.log('close all')
  })

  const instance = document.querySelector('.v-dialogs-container')._instance
  instance.closeAll(() => {
    console.log('close all')
  })
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
