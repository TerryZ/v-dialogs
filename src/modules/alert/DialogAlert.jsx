import '../../styles/alert.sass'

import { ref, nextTick, onMounted, defineComponent, provide } from 'vue'

import DialogAlertHeader from './DialogAlertHeader'
import DialogAlertBody from './DialogAlertBody'
import DialogAlertFooter from './DialogAlertFooter'
import DialogContainer from '../DialogContainer'

import { MESSAGE_TYPE_INFO, propsInjectionKey } from '../../constants'
import { useAlert } from '../../core/alert'
import { mergeDialogProps, mergeDialogEmits } from '../../core/helper'

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
      show,
      getShadowClass,
      setBodyHeight,
      ...restItems
    } = useAlert(props, emit)

    const header = ref()
    const footer = ref()

    provide(propsInjectionKey, {
      ...props,
      ...restItems,
      show
    })

    onMounted(() => {
      show.value = true

      nextTick(() => {
        setBodyHeight(header, footer)
      })
    })

    return () => (
      <DialogContainer
        className={['v-dialog-content', getShadowClass()]}
        transitionName='v-dialog--candy'
      >
        {props.header && <DialogAlertHeader ref={header} />}
        <DialogAlertBody />
        <DialogAlertFooter ref={footer} />
      </DialogContainer>
    )
  }
})
