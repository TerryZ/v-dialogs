<template>
  <div class="p-3">
    <div class="mb-3">
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
    <div class="mb-3">
      Age:
      <input
        type="text"
        class="form-control"
        v-model="age"
      >
    </div>
    <div class="mb-3">
      Company:
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          disabled="disabled"
          v-model="company"
          placeholder="Please choose a company"
        >
        <button
          class="btn btn-outline-secondary"
          type="button"
          @click="chooseCompany"
        >
          Choose
        </button>
      </div>
    </div>
    <div
      style="height: 500px;"
      class="bg-light p-3 rounded-3"
    >
      space
    </div>
    <div class="mt-3">
      <button
        type="button"
        class="btn btn-primary me-3"
        @click="ok"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
// import mixins from './mixins'
import { ref, computed } from 'vue'
import { DialogModal, DialogAlert } from '@/'
import UserCompany from './UserCompany.vue'

const emit = defineEmits(['close'])

const props = defineProps({
  name: { type: String, default: '' }
})

const userName = ref(props.name)
const company = ref('')
const age = ref(20)

const upperCasedName = computed(() => {
  return userName.value.toUpperCase()
})

function ok () {
  // const key = this.$dlg.mask('Data saving...(sleep 3 sec)')
  // setTimeout(() => {
  //   this.$dlg.close(key)
  //   this.$emit('close', { companyName: this.company })
  // }, 3000)
  emit('close', { companyName: company.value })
}
function chooseCompany () {
  // console.log(this)
  DialogModal(UserCompany, {
    width: 500,
    height: 500,
    title: 'Company list',
    callback: data => {
      DialogAlert(`Your selected <b>${data.name}</b> company.`, { closeTime: 2 })
      company.value = data && data.name
    }
  })
}
</script>
