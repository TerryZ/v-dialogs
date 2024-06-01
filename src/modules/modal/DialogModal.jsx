import { defineComponent } from 'vue'

import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'

export default defineComponent({
  name: 'DialogModal',
  props: mergeDialogProps({
    component: Object,
    /**
     * Send parameters to Component
     * you need use props to receive this params in component
     */
    params: Object,
    shaking: { type: Boolean, default: true },
    /** Open maximized dialog */
    fullscreen: { type: Boolean, default: false },
    maxButton: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true }
  }),
  emits: mergeDialogEmits(),
  setup (props, { emit }) {
    return () => {

    }
  }
})
