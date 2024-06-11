import '../../styles/message.sass'

import { defineComponent, provide } from 'vue'

import DialogMessageBody from './DialogMessageBody'
import DialogLiteContainer from '../DialogLiteContainer'

import {
  MESSAGE_TYPE_INFO,
  MESSAGE_OFFSET,
  MESSAGE_PLACEMENT_TOP,
  propsInjectionKey
} from '../../constants'
import { useMessage } from '../../core/message'
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
    backdrop: { type: Boolean, default: false },
    colorfulShadow: { type: Boolean, default: false },
    icon: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: false },
    duration: { type: Number, default: 0 },
    offset: { type: [String, Number], default: MESSAGE_OFFSET },
    placement: { type: String, default: MESSAGE_PLACEMENT_TOP }
  }),
  emits: mergeDialogEmits(),
  setup (props, { emit }) {
    const {
      customClass,
      ...restItems
    } = useMessage(props, emit)

    provide(propsInjectionKey, {
      ...props,
      ...restItems
    })

    return () => (
      <DialogLiteContainer
        containerClass={['v-dialog-message', customClass]}
        transitionName='v-dialog--fade-lite'
      >
        <DialogMessageBody />
      </DialogLiteContainer>
    )
  }
})
