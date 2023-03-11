<template>
  <div class="d-flex vw-100 vh-100">
    <div
      class="bg-light fw-bold"
      style="width: 18rem;"
    >
      <div class="fs-4 py-4 px-3">
        v-dialogs examples
      </div>
      <div
        class="px-3 pt-4"
        v-for="item in modules"
        :key="item.key"
      >
        <router-link
          class="nav-link"
          aria-current="page"
          :class="isActive(item)"
          :to="item.url"
          @click="change(item)"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>

    <div class="p-5">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const modules = [
  { key: 'alert', name: 'Alert', url: '/alert' },
  { key: 'toast', name: 'Toast', url: '/toast' },
  { key: 'mask', name: 'Mask', url: '/mask' },
  { key: 'modal', name: 'Modal', url: '/modal' },
  { key: 'drawer', name: 'Drawer', url: '/drawer' }
]
const active = ref('')

function isActive (item) {
  if (active.value && active.value === item.key) {
    return 'text-dark'
  }
  return 'text-secondary text-opacity-50'
}
function change (item) {
  active.value = item.key
}

onBeforeMount(() => {
  const route = useRoute()
  const module = modules.find(val => val.url === route.path)
  if (module) {
    active.value = module.key
  }
})
</script>
