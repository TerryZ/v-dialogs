<template>
  <div class="p-3">
    <p>
      Name (received by params option):
      <input
        type="text"
        class="form-control"
        v-model="name"
      >
    </p>
    <p>
      Age:
      <input
        type="text"
        class="form-control"
        v-model="age"
      >
    </p>
    <div>
      Company:
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          disabled="disabled"
          v-model="company"
          placeholder="Please choose a company"
        >
        <span class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="chooseCompany"
          >Choose</button>
        </span>
      </div>
    </div>
    <div style="height: 500px">
      space
    </div>
    <p class="mt-3">
      <button
        type="button"
        class="btn btn-primary me-3"
        @click="ok"
      >
        OK
      </button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: '' }
  },
  emits: ['close'],
  data () {
    return {
      company: '',
      age: 20
    }
  },
  methods: {
    ok () {
      const key = this.$dlg.mask('Data saving...(sleep 3 sec)')
      setTimeout(() => {
        this.$dlg.close(key)
        this.$emit('close', { companyName: this.company })
      }, 3000)
    },
    chooseCompany () {
    }
  },
  mounted () {
    // console.dir(this)
  }
}
</script>
