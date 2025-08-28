<template>
  <div class="d-flex vh-100">
    <div
      class="bg-secondary-subtle fw-bold flex-shrink-0"
      style="width: 18rem;"
    >
      <div class="py-4 px-3 d-flex align-items-center font-monospace">
        <div class="fs-3 me-2">
          v-dialogs
        </div>
        <div class="fs-5 text-muted fw-normal">
          examples
        </div>
      </div>
      <div
        v-for="item in modules"
        :key="item.key"
        class="px-3 pb-4"
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

    <div class="p-5 flex-grow-1 overflow-auto">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const modules = [
  { key: 'global', name: 'Global', url: '/global' },
  { key: 'alert', name: 'Alert', url: '/alert' },
  { key: 'message', name: 'Message', url: '/message' },
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
