import '../../styles/mask.sass'

import { defineComponent, provide } from 'vue'

import DialogContainer from '../../components/DialogContainer'
import DialogContentBox from '../../components/DialogContentBox'
import DialogMaskBody from './DialogMaskBody'

import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'
import { useMask } from './mask'
import { propsInjectionKey } from '../../constants'
import { maskEnforcedSettings } from '../../core/base-settings'

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
      closeMaskWithCallback,
      ...restItems
    } = useMask(props, emit, expose)

    provide(propsInjectionKey, {
      ...props,
      ...restItems,
      ...maskEnforcedSettings
    })

    const classes = [
      'v-dialog-mask',
      'v-dialog--content-center'
    ]
    const contentClass = [{
      'mask--pill': props.pill,
      'mask--no-icon': !props.icon,
      'mask--no-panel': !props.panel
    }]

    return () => (
      <DialogContainer
        container-class={classes}
        backdrop-class={{ 'v-dialog-overlay--blur': !props.panel }}
        transition-name='v-dialog--smooth'
        append-to={props.appendTo}
      >
        <DialogContentBox class-name={contentClass}>
          <DialogMaskBody>{() => messageText.value}</DialogMaskBody>
        </DialogContentBox>
      </DialogContainer>
    )
  }
})
