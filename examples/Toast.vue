<template>
  <section>
    <h3 class="mt-5">
      Toast
    </h3>
    <div class="mb-3">
      Position:
      <div class="d-inline-flex col-md-2">
        <select
          class="form-select"
          v-model="position"
        >
          <option value="topLeft">
            topLeft
          </option>
          <option value="topCenter">
            topCenter
          </option>
          <option value="topRight">
            topRight
          </option>
          <option value="bottomLeft">
            bottomLeft
          </option>
          <option value="bottomCenter">
            bottomCenter
          </option>
          <option value="bottomRight">
            bottomRight
          </option>
        </select>
      </div>
    </div>
    <div class="mb-3">
      <button
        type="button"
        class="btn btn-primary"
        @click="callToastFunction"
      >
        Toast function
      </button>
    </div>
    <div>
      <div
        class="btn-group"
        role="group"
      >
        <button
          type="button"
          class="btn btn-info"
          @click="callInstanceToast()"
          id="btn-toast-info"
        >
          Info(Auto close in 3 second)
        </button>
        <button
          type="button"
          class="btn btn-warning"
          @click="callInstanceToast('warning')"
          id="btn-toast-warning"
        >
          Warning
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="callInstanceToast('error')"
          id="btn-toast-error"
        >
          Error
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="callInstanceToast('success')"
          id="btn-toast-success"
        >
          Success
        </button>
      </div>
    </div>

    <h5 class="mt-3">
      Icon
    </h5>
    <div>
      <button
        type="button"
        class="btn btn-outline-info"
        @click="callInstanceToast('info', false)"
        id="btn-toast-info"
      >
        No icon
      </button>
    </div>

    <h5 class="mt-3">
      Header
    </h5>
    <div>
      <button
        type="button"
        class="btn btn-outline-secondary me-3"
        @click="noHeader"
        id="btn-toast-info"
      >
        No header
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="largeHeader"
        id="btn-toast-info"
      >
        large header text
      </button>
    </div>
  </section>
</template>

<script>
import { DialogToast } from '@/components/v-dialogs'

export default {
  data () {
    return {
      position: 'bottomRight'
    }
  },
  methods: {
    callInstanceToast (type = 'info', icon = true, title) {
      const option = {
        messageType: type,
        icon: icon,
        position: this.position
      }
      if (typeof title !== 'undefined') {
        option.titleBar = title
      }
      if (type === 'info') {
        option.closeTime = 3
        option.dialogCloseButton = false
      }
      this.$dlg.toast('This is a Vue <b>v-dialog</b> Toast!', option)
    },
    callToastFunction () {
      DialogToast()
    },
    noHeader () {
      DialogToast('', {
        messageType: 'warning',
        title: false
      })
    },
    largeHeader () {
      DialogToast('', {
        title: '这是一段用于演示的文本内容这是一段用于演示的文本内容'
      })
    }
  }
}
</script>
