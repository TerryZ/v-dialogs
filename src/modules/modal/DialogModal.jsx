import '../../styles/modal.sass'

import { defineComponent, provide, computed } from 'vue'

import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'
import { useModal } from '../../core/modal'
import { propsInjectionKey, MODAL_WIDTH, MODAL_HEIGHT } from '../../constants'

import DialogContainer from '../DialogContainer'
import DialogContentBox from '../DialogContentBox'
import DialogModalHeader from './DialogModalHeader'
import DialogComponentBody from '../DialogComponentBody'

export default defineComponent({
  name: 'DialogModal',
  props: mergeDialogProps({
    /**
     * The component to put in the Modal
     */
    component: [Function, Object],
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
              ? <DialogComponentBody>{slots.default()}</DialogComponentBody>
              : <DialogComponentBody />
          }
        </DialogContentBox>
      </DialogContainer>
    )
  }
})
