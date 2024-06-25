import '../../styles/mask.sass'

import { defineComponent, provide } from 'vue'

import DialogContainer from '../DialogContainer'
import DialogContentBox from '../DialogContentBox'
import DialogMaskBody from './DialogMaskBody'

import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'
import { useMask } from '../../core/mask'
import { propsInjectionKey } from '../../constants'

export default defineComponent({
  name: 'DialogMask',
  props: mergeDialogProps({
    appendTo: { type: String, default: 'body' },
    pill: { type: Boolean, default: true },
    icon: { type: Boolean, default: true },
    panel: { type: Boolean, default: true }
  }),
  emits: mergeDialogEmits(),
  setup (props, { emit, expose }) {
    const {
      messageText,
      closeWithCallback,
      ...restItems
    } = useMask(props, emit)

    provide(propsInjectionKey, {
      ...props,
      ...restItems
    })

    const classes = [
      'v-dialog-mask',
      'v-dialog--content-center',
      {
        'v-dialog-mask--pill': props.pill,
        'v-dialog-mask--no-icon': !props.icon,
        'v-dialog-mask--no-panel': !props.panel
      }
    ]

    expose({
      close: closeWithCallback
    })

    return () => (
      <DialogContainer
        container-class={classes}
        backdrop-class={{ 'v-dialog-overlay--blur': !props.panel }}
        transition-name='v-dialog--smooth'
        append-to={props.appendTo}
      >
        <DialogContentBox>
          <DialogMaskBody>{() => messageText.value}</DialogMaskBody>
        </DialogContentBox>
      </DialogContainer>
    )
  }
})
