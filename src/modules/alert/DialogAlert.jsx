import '../../styles/alert.sass'

import { defineComponent, provide } from 'vue'

import DialogAlertHeader from './DialogAlertHeader'
import DialogAlertBody from './DialogAlertBody'
import DialogAlertFooter from './DialogAlertFooter'
import DialogContainer from '../../components/DialogContainer'
import DialogContentBox from '../../components/DialogContentBox'

import { MESSAGE_TYPE_INFO, propsInjectionKey } from '../../constants'
import { useAlert } from '../../core/alert'
import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'
import { alertEnforcedSettings } from '../../core/base-settings'

export default defineComponent({
  name: 'DialogAlert',
  props: mergeDialogProps({
    /**
     * Message type
     *
     * - `info` - default
     * - `warning`
     * - `error`
     * - `success`
     * - `confirm`
     */
    messageType: { type: String, default: MESSAGE_TYPE_INFO },
    colorfulShadow: { type: Boolean, default: false },
    icon: { type: Boolean, default: true },
    cancelCallback: { type: Function, default: undefined }
  }),
  emits: mergeDialogEmits(),
  setup (props, { emit }) {
    const {
      getShadowClass,
      ...restItems
    } = useAlert(props, emit)

    provide(propsInjectionKey, {
      ...props,
      ...restItems,
      ...alertEnforcedSettings
    })

    return () => (
      <DialogContainer
        container-class={['v-dialog--content-center', 'v-dialog-alert', { 'no-header': !props.header }]}
        transition-name='v-dialog--candy'
      >
        <DialogContentBox class-name={[getShadowClass()]}>
          {props.header && <DialogAlertHeader />}
          <DialogAlertBody />
          <DialogAlertFooter />
        </DialogContentBox>
      </DialogContainer>
    )
  }
})
