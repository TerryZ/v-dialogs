<template>
  <div class="p-3">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th align="center">
            Select
          </th>
          <th>Company Name</th>
          <th>Product</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td align="center">
            <input
              type="radio"
              @click="value='Google'"
            >
          </td>
          <td>Google</td>
          <td>Google Search, Gmail, Youtube, Google Map</td>
        </tr>
        <tr>
          <td align="center">
            <input
              type="radio"
              @click="value='Microsoft'"
            >
          </td>
          <td>Microsoft</td>
          <td>Windows, Office, Visual studio IDE, Github</td>
        </tr>
        <tr>
          <td align="center">
            <input
              type="radio"
              @click="value='Facebook'"
            >
          </td>
          <td>Facebook</td>
          <td>Facebook, WhatsApp, Instagram</td>
        </tr>
      </tbody>
    </table>
    <p>
      <button
        type="button"
        class="btn btn-primary"
        @click="ok"
      >
        <fa-icon icon="check" /> Ok
      </button>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    ok () {
      this.$emit('close', { name: this.value })
    }
  }
}
</script>
