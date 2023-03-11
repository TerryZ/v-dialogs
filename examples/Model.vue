<template>
  <section>
    <h3 class="mt-2">
      Modal
    </h3>
    <div class="my-2">
      <strong>Vuex content:</strong>
      <span v-text="$store.state.user" />
    </div>
    <!-- <component :is="page"></component> -->
    <div class="mb-3">
      <button
        type="button"
        class="btn btn-secondary me-3"
        @click="instanceOpenModal()"
      >
        Dialog instance open Modal
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="functionalOpenModal()"
      >
        Modal function open Dialog
      </button>
    </div>
    <h5 class="">
      Header bar
    </h5>
    <div>
      <button
        type="button"
        class="btn btn-outline-dark me-2"
        @click="instanceOpenModal(false)"
      >
        Close header bar
      </button>
      <button
        type="button"
        class="btn btn-outline-info"
        @click="instanceOpenModal('Modal of v-dialogs')"
      >
        Custom content
      </button>
    </div>
    <h5 class="mt-3">
      Modal size
    </h5>
    <div>
      <button
        type="button"
        class="btn btn-primary me-2"
        @click="maximizeModal"
      >
        Open a maximize dialog
      </button>
    </div>
  </section>
</template>

<script>
import profile from './Profile.vue'
import { DialogModal } from '@/components/v-dialogs'

export default {
  methods: {
    instanceOpenModal (title) {
      const options = {
        width: 500,
        height: 620,
        title: title,
        customClass: 'aabbcc',
        backdrop: true,
        backdropClose: true,
        params: { name: 'Terry Zeng' },
        callback: data => {
          // console.log(data);
          this.$dlg.alert(`Received user name: ${data.name}`)
        }
      }
      if (typeof title !== 'undefined') {
        options.title = title
      }
      this.$dlg.modal(profile, options)
    },
    functionalOpenModal () {
      DialogModal(profile, {
        params: {
          name: 'Terry Zeng'
        }
      })
    },
    maximizeModal () {
      const option = {
        title: 'Maximize dialog',
        backdrop: true,
        backdropClose: true,
        fullscreen: true,
        params: { name: 'Terry Zeng' },
        callback: data => {
          // console.log(data);
          this.$dlg.alert(`Received user name: ${data.name}`)
        }
      }
      DialogModal(profile, option)
    }
  }
}
</script>
