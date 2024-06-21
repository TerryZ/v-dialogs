import '../../styles/modal.sass'

import { defineComponent, provide, computed } from 'vue'

import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'
import { useModal } from '../../core/modal'
import { propsInjectionKey, MODAL_WIDTH, MODAL_HEIGHT, PLACEMENT_RIGHT } from '../../constants'

import DialogContainer from '../DialogContainer'
import DialogContentBox from '../DialogContentBox'
import DialogModalHeader from './DialogModalHeader'
import DialogModalBody from './DialogModalBody'

export default defineComponent({
  name: 'DialogDrawer',
  props: mergeDialogProps({
    /**
     * The component to put in the Modal
     */
    component: [Function, Object],
    title: { type: String, default: 'Dialog' },
    width: { type: Number, default: MODAL_WIDTH },
    height: { type: Number, default: MODAL_HEIGHT },
    /**
     * The parameters pass to Component as props
     */
    params: Object,
    closeButton: { type: Boolean, default: true },
    placement: { type: String, default: PLACEMENT_RIGHT },
    visible: { type: Boolean, default: false }
  }),
  emits: mergeDialogEmits(['update:visible']),
  setup (props, { emit, slots }) {
    const {
      maximize,
      ...restItems
    } = useModal(props, emit)

    provide(propsInjectionKey, {
      ...props,
      ...restItems,
      maximize
    })

    // v-dialog--screen-center
    const containerClass = computed(() => (
      [
        'v-dialog-modal',
        'v-dialog--content-center',
        {
          'v-dialog-modal--maximize': maximize.value
        }
      ]
    ))

    return () => (
      <DialogContainer
        container-class={containerClass.value}
        transition-name='v-dialog--smooth'
      >
        <DialogContentBox>
          {props.header && <DialogModalHeader />}
          {
            slots.default
              ? <DialogModalBody>{slots.default()}</DialogModalBody>
              : <DialogModalBody></DialogModalBody>
          }
        </DialogContentBox>
      </DialogContainer>
    )
  }
})
