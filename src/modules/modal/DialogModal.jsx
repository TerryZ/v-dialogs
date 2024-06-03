import '../../styles/modal.sass'

import { defineComponent, provide, onMounted } from 'vue'

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
    /**
     * The component to put in the Modal
     */
    component: Object,
    /**
     * The parameters pass to Component as props
     */
    params: Object,
    /** Open maximized dialog */
    fullscreen: { type: Boolean, default: false },
    maxButton: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true }
  }),
  emits: mergeDialogEmits(),
  setup (props, { emit }) {
    const {
      show,
      maximize,
      switchMaximize,
      ...restItems
    } = useModal(props, emit)

    provide(propsInjectionKey, {
      ...props,
      ...restItems,
      show,
      maximize,
      switchMaximize
    })

    onMounted(() => {
      show.value = true

      if (props.fullscreen) {
        switchMaximize()
      }

      hideDocumentBodyOverflow()
    })

    return () => (
      <DialogContainer
        bodyClass={['v-dialog-modal', { 'v-dialog--maximize': maximize.value }]}
        contentClass={['v-dialog-content']}
        transitionName='v-dialog--smooth'
      >
        {props.header && <DialogModalHeader />}
        <DialogModalBody />
      </DialogContainer>
    )
  }
})
