import { defineComponent } from 'vue'

import { useComponent } from '../../core/base'

import DialogDrawer from './DialogDrawer'

export default defineComponent({
  name: 'DialogDrawerBox',
  setup (props, context) {
    return useComponent(DialogDrawer, context)
  }
})
