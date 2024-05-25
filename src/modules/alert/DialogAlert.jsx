import '../../styles/alert.sass'

import { ref, nextTick, onMounted, defineComponent, provide } from 'vue'

import DialogAlertHeader from './DialogAlertHeader'
import DialogAlertBody from './DialogAlertBody'
import DialogAlertFooter from './DialogAlertFooter'

import { MESSAGE_TYPE_INFO } from '../../constants'
import { getLanguage, calculateDialogZIndex } from '../../utils/helper'
import { commonProps, commonEmits } from '../../utils/dialog'
import { useRenderPopup } from '../../utils/render'
import { useAlert } from '../../core/alert'

export default defineComponent({
  name: 'DialogAlert',
  props: {
    ...commonProps,
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
  },
  emits: commonEmits,
  setup (props, { emit }) {
    const {
      show, dialogStyles, closeDialog,
      getShadowClass ,isConfirmType, closeAlert, cancelAlert
    } = useAlert(props, emit)
    const {
      generateBackdrop,
      generateDialogContainer,
      generateDialogContent
    } = useRenderPopup(props, show)
    const { dialogZIndex, backdropZIndex } = calculateDialogZIndex(props.dialogIndex)
    const lang = getLanguage(props.language)

    provide('lang', lang)
    provide('messageType', props.messageType)
    provide('isConfirmType', isConfirmType)
    provide('closeAlert', closeAlert)
    provide('cancelAlert', cancelAlert)

    const header = ref()
    const footer = ref()
    const bodyHeight = ref(0)

    function generateHeader () {
      if (!props.header) return

      return (
        <DialogAlertHeader
          content={props.title}
          ref={header}
        />
      )
    }
    function generateFooter () {
      return <DialogAlertFooter ref={footer} />
    }
    function generateBody () {
      return (
        <DialogAlertBody
          icon={props.icon}
          height={bodyHeight.value}
          message={props.message}
          messageType={props.messageType}
        />
      )
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
          {
            generateDialogContent({
              className: ['v-dialog-content v-dialog-alert', getShadowClass()],
              transitionName: 'v-dialog--candy',
              child: [generateHeader(), generateBody(), generateFooter()]
            })
          }
        </div>
      )

      const container = generateDialogContainer(body, { dialogZIndex }, closeDialog)
      const backdrop = generateBackdrop({ backdropZIndex })

      return [backdrop, container]
    }
  }
})
