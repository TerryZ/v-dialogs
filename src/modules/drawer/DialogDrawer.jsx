import '../../styles/drawer.sass'

import { defineComponent, provide, computed } from 'vue'

import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'
import { useDrawer } from '../../core/drawer'
import { propsInjectionKey, PLACEMENT_RIGHT } from '../../constants'

import DialogContainer from '../DialogContainer'
import DialogContentBox from '../DialogContentBox'
import DialogDrawerHeader from './DialogDrawerHeader'
import DialogComponentBody from '../DialogComponentBody'

export default defineComponent({
  name: 'DialogDrawer',
  props: mergeDialogProps({
    /**
     * The component to put in the Drawer
     */
    component: [Function, Object],
    title: { type: String, default: 'Dialog' },
    width: { type: Number, default: undefined },
    height: { type: Number, default: undefined },
    backdropClose: { type: Boolean, default: true },
    /**
     * The parameters pass to Component as props
     */
    params: Object,
    closeButton: { type: Boolean, default: true },
    placement: { type: String, default: PLACEMENT_RIGHT },
    rounded: { type: Boolean, default: true },
    visible: { type: Boolean, default: false }
  }),
  emits: mergeDialogEmits(['update:visible']),
  setup (props, { emit, slots }) {
    const {
      getPositionClass,
      getTransitionName,
      ...restItems
    } = useDrawer(props, emit)

    provide(propsInjectionKey, {
      ...props,
      ...restItems
    })

    const containerClass = computed(() => (
      [
        'v-dialog-drawer',
        getPositionClass(),
        {

        }
      ]
    ))

    return () => (
      <DialogContainer
        container-class={containerClass.value}
        transition-name={getTransitionName()}
      >
        <DialogContentBox>
          {props.header && <DialogDrawerHeader />}
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
