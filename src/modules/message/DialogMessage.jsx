import '../../styles/message.sass'

import { onMounted, defineComponent, provide } from 'vue'

import DialogMessageBody from './DialogMessageBody'
import DialogContainer from '../DialogContainer'

import { MESSAGE_TYPE_INFO, propsInjectionKey } from '../../constants'
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
    colorfulShadow: { type: Boolean, default: false },
    icon: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: false }
  }),
  emits: mergeDialogEmits(),
  setup (props, { emit }) {
    const {
      openDialog,
      ...restItems
    } = useMessage(props, emit)

    provide(propsInjectionKey, {
      ...props,
      ...restItems
    })

    onMounted(() => {
      openDialog()
    })

    return () => (
      <DialogContainer
        contentClass={['v-dialog-content']}
        transitionName='v-dialog--smooth'
      >
        <DialogMessageBody />
      </DialogContainer>
    )
  }
})
