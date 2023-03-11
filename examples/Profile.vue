<template>
  <div class="p-3">
    <div>
      <div>Name (received by params option):</div>
      <div class="my-2">
        UpperCased Name:
        <span
          class="bg-primary bg-opacity-50 text-white px-2 py-1 rounded-3"
          v-text="upperCasedName"
        />
      </div>
      <input
        type="text"
        class="form-control"
        v-model="userName"
      >
    </div>
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
// import mixins from './mixins'
import Company from './Company'

export default {
  // mixins: [mixins],
  props: {
    name: { type: String, default: '' }
  },
  data () {
    return {
      userName: this.name,
      company: '',
      age: 20
    }
  },
  computed: {
    upperCasedName () {
      return this.upperCase(this.userName)
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
      console.log(this)
      this.$dlg.modal(Company, {
        width: 500,
        height: 500,
        title: 'Company list',
        callback: data => {
          this.$dlg.toast(`Your selected <b>${data.name}</b> company.`, { closeTime: 2 })
          this.company = data && data.name
        }
      })
    }
  },
  mounted () {
    // console.dir(this)
  }
}
</script>
