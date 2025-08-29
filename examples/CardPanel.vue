<template>
  <div class="d-flex flex-column">
    <div
      class="overflow-hidden"
      style="height: 150px;"
    >
      <img
        src="./cover.jpg"
        style="width: 100%;"
      >
    </div>

    <div class="p-3">
      <h5 class="mb-0">
        Modal dialog
      </h5>
      <div class="text-body-tertiary mb-3">
        <small>
          One of the dialog types of <strong>v-dialogs</strong>
        </small>
      </div>
      <div class="text-body mb-3">
        Add dialogs to your site for light boxes, user notifications, or completely custom content
      </div>
      <div class="mb-3">
        <span class="badge rounded-pill text-bg-light me-2">Auto position</span>
        <span class="badge rounded-pill text-bg-light me-2">Configurable</span>
        <span class="badge rounded-pill text-bg-secondary">Functional</span>
      </div>
      <div class="d-flex gap-3">
        <button
          type="button"
          class="btn btn-outline-secondary w-100"
          @click="close"
        >
          OK
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary w-100"
          @click="triggerEvent('abc')"
        >
          event 1
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary w-100"
          @click="triggerEvent('abc-efg')"
        >
          event 2
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close', 'abc', 'abc-efg'])

function close () {
  emit('close')
}
const triggerEvent = name => emit(name)
</script>
