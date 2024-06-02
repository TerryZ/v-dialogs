import '../../styles/modal.sass'

import { defineComponent, ref, provide, onMounted, nextTick } from 'vue'

import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'
import { useModal } from '../../core/modal'
import { propsInjectionKey } from '../../constants'
import { hideDocumentBodyOverflow } from '../../utils/instance'

import DialogContainer from '../DialogContainer'
import DialogModalHeader from './DialogModalHeader'
import DialogModalBody from './DialogModalBody'

export default defineComponent({
  name: 'DialogModal',
  props: mergeDialogProps({
    component: Object,
    /**
     * Send parameters to Component
     * you need use props to receive this params in component
     */
    params: Object,
    /** Open maximized dialog */
    fullscreen: { type: Boolean, default: false },
    maxButton: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true }
  }),
  emits: mergeDialogEmits(),
  setup (props, { emit }) {
    const header = ref()

    const {
      show,
      switchMaximize,
      setBodyHeight,
      ...restItems
    } = useModal(props, emit, header)

    provide(propsInjectionKey, {
      ...props,
      ...restItems,
      show,
      switchMaximize
    })

    onMounted(() => {
      show.value = true

      nextTick(() => {
        if (props.fullscreen) {
          switchMaximize()
        } else {
          setBodyHeight()
        }
      })

      hideDocumentBodyOverflow()
    })

    return () => (
      <DialogContainer
        className={['v-dialog-content']}
        transitionName='v-dialog--smooth'
      >
        {props.header && <DialogModalHeader ref={header} />}
        <DialogModalBody />
      </DialogContainer>
    )
  }
})
