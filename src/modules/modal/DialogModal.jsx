import '../../styles/modal.sass'

import { defineComponent, provide, onMounted } from 'vue'

import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'
import { useModal } from '../../core/modal'
import { propsInjectionKey } from '../../constants'

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
    closeButton: { type: Boolean, default: true },
    visible: { type: Boolean, default: false },
    functional: { type: Boolean, default: true }
  }),
  emits: mergeDialogEmits(['update:visible']),
  setup (props, { emit, slots }) {
    const {
      show,
      maximize,
      openModal,
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
      if (props.functional) openModal()
    })

    return () => (
      <DialogContainer
        bodyClass={['v-dialog-modal', { 'v-dialog--maximize': maximize.value }]}
        contentClass={['v-dialog-content']}
        transitionName='v-dialog--smooth'
      >
        {props.header && <DialogModalHeader />}
        {
          slots.default
            ? <DialogModalBody>{slots.default()}</DialogModalBody>
            : <DialogModalBody></DialogModalBody>
        }
      </DialogContainer>
    )
  }
})
