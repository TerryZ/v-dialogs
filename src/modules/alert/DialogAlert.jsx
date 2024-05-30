import '../../styles/alert.sass'

import { ref, nextTick, onMounted, defineComponent, provide } from 'vue'

import DialogAlertHeader from './DialogAlertHeader'
import DialogAlertBody from './DialogAlertBody'
import DialogAlertFooter from './DialogAlertFooter'

import { MESSAGE_TYPE_INFO, alertInjectionKey } from '../../constants'
import { getLanguage, calculateDialogZIndex } from '../../utils/helper'
import { commonEmits } from '../../utils/dialog'
import { useRenderPopup } from '../../utils/render'
import { useAlert } from '../../core/alert'
import { mergeDialogProps } from '../../core/helper'

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
    colorfulShadow: { type: Boolean, default: true },
    shaking: { type: Boolean, default: true },
    icon: { type: Boolean, default: true },
    cancelCallback: { type: Function, default: undefined }
  }),
  emits: commonEmits,
  setup (props, { emit }) {
    const {
      show,
      closeAlert,
      cancelAlert,
      dialogStyles,
      getShadowClass
    } = useAlert(props, emit)

    const {
      generateBackdrop,
      generateDialogContainer,
      generateDialogContent
    } = useRenderPopup(props, show)

    const { dialogZIndex, backdropZIndex } = calculateDialogZIndex(props.dialogIndex)
    const lang = getLanguage(props.language)

    const header = ref()
    const footer = ref()
    const bodyHeight = ref(0)

    provide(alertInjectionKey, {
      ...props,
      lang,
      closeAlert,
      cancelAlert,
      bodyHeight
    })

    function generateHeader () {
      return props.header && <DialogAlertHeader ref={header} />
    }
    function generateFooter () {
      return <DialogAlertFooter ref={footer} />
    }
    function generateBody () {
      return <DialogAlertBody />
    }

    onMounted(() => {
      show.value = true

      nextTick(() => {
        const headerHeight = header.value?.$el.offsetHeight || 0
        const footerHeight = footer.value?.$el.offsetHeight || 0

        bodyHeight.value = props.height - headerHeight - footerHeight
      })
    })

    return () => {
      const body = (
        <div class='v-dialog-dialog' style={dialogStyles.value}>
          {generateDialogContent({
            className: ['v-dialog-content', getShadowClass()],
            transitionName: 'v-dialog--candy',
            child: [generateHeader(), generateBody(), generateFooter()]
          })}
        </div>
      )

      const backdrop = generateBackdrop({ backdropZIndex })
      const container = generateDialogContainer(body, { dialogZIndex }, closeAlert)

      return [backdrop, container]
    }
  }
})
