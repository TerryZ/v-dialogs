import '../../styles/toast.sass'

import { defineComponent, provide, ref } from 'vue'

import DialogToastBody from './DialogToastBody'
import DialogLiteContainer from '../../components/DialogLiteContainer'

import {
  MESSAGE_TYPE_INFO,
  TOAST_OFFSET,
  PLACEMENT_TOP_RIGHT,
  propsInjectionKey
} from '../../constants'
import { useToast, getToastPositionClass } from './toast'
import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'

export default defineComponent({
  name: 'DialogToast',
  props: mergeDialogProps({
    /**
     * Message type
     *
     * - `info` - default
     * - `warning`
     * - `error`
     * - `success`
     */
    messageType: { type: String, default: MESSAGE_TYPE_INFO },
    icon: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true },
    duration: { type: Number, default: 3000 },
    offset: { type: [String, Number], default: TOAST_OFFSET },
    placement: { type: String, default: PLACEMENT_TOP_RIGHT }
  }),
  emits: mergeDialogEmits(),
  setup (props, { emit, expose }) {
    const {
      closeGroupDialogWithCallback,
      ...restItems
    } = useToast(props, emit)
    const body = ref()

    provide(propsInjectionKey, {
      ...props,
      ...restItems,
      closeGroupDialogWithCallback
    })

    const classes = [
      'v-dialog-toast',
      getToastPositionClass(props.placement)
    ]

    expose({
      close: closeGroupDialogWithCallback
    })

    return () => (
      <DialogLiteContainer
        container-class={classes}
        transition-name='v-dialog--fade-lite'
        id={props.dialogKey}
      >
        <DialogToastBody ref={body} />
      </DialogLiteContainer>
    )
  }
})
