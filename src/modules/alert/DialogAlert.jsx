import '../../styles/alert.sass'

import { ref, nextTick, onMounted, defineComponent, provide } from 'vue'

import DialogAlertHeader from './DialogAlertHeader'
import DialogAlertBody from './DialogAlertBody'
import DialogAlertFooter from './DialogAlertFooter'
import DialogContainer from '../DialogContainer'

import { MESSAGE_TYPE_INFO, alertInjectionKey } from '../../constants'
import { getLanguage } from '../../utils/helper'
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
      height,
      getShadowClass,
      ...restItems
    } = useAlert(props, emit)

    const lang = getLanguage(props.language)

    const header = ref()
    const footer = ref()
    const bodyHeight = ref(0)

    provide(alertInjectionKey, {
      ...props,
      ...restItems,
      show,
      lang,
      bodyHeight
    })

    onMounted(() => {
      show.value = true

      nextTick(() => {
        const headerHeight = header.value?.$el.offsetHeight || 0
        const footerHeight = footer.value?.$el.offsetHeight || 0

        bodyHeight.value = height - headerHeight - footerHeight
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
