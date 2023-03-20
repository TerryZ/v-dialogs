<template>
  <h3 class="mb-3">
    Alert
  </h3>
  <div class="">
    <div class="mb-3">
      asdf
    </div>
    <div class="">
      asdf
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getInstance } from '@/utils/instance'

onMounted(() => {
  const app = getInstance()
  console.log(app)

  console.dir(document.querySelector('.v-dialogs-container'))

  const instance = document.querySelector('.v-dialogs-container').__vnode
  console.log(instance)
})
</script>
