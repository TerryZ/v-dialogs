import '../../styles/message.sass'

import { defineComponent, provide, ref } from 'vue'

import DialogMessageBody from './DialogMessageBody'
import DialogLiteContainer from '../../components/DialogLiteContainer'

import {
  MESSAGE_TYPE_INFO,
  MESSAGE_OFFSET,
  PLACEMENT_TOP,
  propsInjectionKey
} from '../../constants'
import { useMessage } from './message'
import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'

export default defineComponent({
  name: 'DialogMessage',
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
    closeButton: { type: Boolean, default: false },
    /**
     * Auto close dialog milliseconds
     * - 0: disabled automatic close
     * - number of milliseconds: specify times to automatic close dialog
     */
    duration: { type: Number, default: 3000 },
    offset: { type: [String, Number], default: MESSAGE_OFFSET },
    placement: { type: String, default: PLACEMENT_TOP },
    /** Pill style border */
    pill: { type: Boolean, default: true }
  }),
  emits: mergeDialogEmits(),
  setup (props, { emit, expose }) {
    const {
      handleBodyRounded,
      closeGroupDialogWithCallback,
      ...restItems
    } = useMessage(props, emit, expose)
    const body = ref()

    provide(propsInjectionKey, {
      ...props,
      ...restItems,
      closeGroupDialogWithCallback
    })

    handleBodyRounded(body)

    return () => (
      <DialogLiteContainer
        container-class={['v-dialog-message']}
        transition-name='v-dialog--fade-lite'
        id={props.dialogKey}
      >
        <DialogMessageBody ref={body} />
      </DialogLiteContainer>
    )
  }
})
