import { defineComponent } from 'vue'

import { useComponent } from '../../core/base-use'

import DialogModal from './DialogModal'

export default defineComponent({
  name: 'DialogModalBox',
  setup (props, context) {
    return useComponent(DialogModal, context)
  }
})
