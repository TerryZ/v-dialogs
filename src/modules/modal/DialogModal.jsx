import '../../styles/modal.sass'

import { defineComponent, provide, onMounted } from 'vue'

import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'
import { useModal } from '../../core/modal'
import { propsInjectionKey, MODAL_WIDTH, MODAL_HEIGHT } from '../../constants'

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
    shake: { type: Boolean, default: true },
    title: { type: String, default: 'Dialog' },
    width: { type: Number, default: MODAL_WIDTH },
    height: { type: Number, default: MODAL_HEIGHT },
    /**
     * The parameters pass to Component as props
     */
    params: Object,
    /** Open maximized dialog */
    fullscreen: { type: Boolean, default: false },
    maxButton: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true },
    visible: { type: Boolean, default: false }
  }),
  emits: mergeDialogEmits(['update:visible']),
  setup (props, { emit, slots }) {
    const {
      maximize,
      openModal,
      ...restItems
    } = useModal(props, emit)

    provide(propsInjectionKey, {
      ...props,
      ...restItems,
      maximize
    })

    onMounted(() => {
      openModal()
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
