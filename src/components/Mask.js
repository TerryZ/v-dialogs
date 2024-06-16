import '../styles/mask.sass'

import { ref, computed, onMounted, h } from 'vue'
import { textTruncate, calculateDialogZIndex } from '../utils/helper'
// import { MASK_MAX_CONTENT_LENGTH } from '../constants'
import { commonEmits, commonProps, useDialog } from '../utils/dialog'
import { useRenderPopup } from '../utils/render'

export default {
  name: 'DialogMask',
  props: {
    ...commonProps,
    shaking: { type: Boolean, default: true }
  },
  emits: commonEmits,
  setup (props, { emit }) {
    const { show, dialogStyles, closeDialog } = useDialog(props, emit)
    const {
      generateBackdrop,
      generateDialogContainer,
      generateDialogContent
    } = useRenderPopup(props, show)
    const { dialogZIndex, backdropZIndex } = calculateDialogZIndex(props.dialogIndex)

    const bodyHeight = ref(0)

    const messageText = computed(() => {
      // if (props.message.length > MASK_MAX_CONTENT_LENGTH) {
      //   return textTruncate(props.message, MASK_MAX_CONTENT_LENGTH)
      // }
      return props.message
    })

    onMounted(() => {
      show.value = true
      bodyHeight.value = props.height
    })

    return () => {
      const contentOption = {
        class: 'v-dialog-mask__content',
        innerHTML: messageText.value
      }
      const bodyOption = {
        class: 'v-dialog-body v-dialog-mask__container',
        style: {
          height: bodyHeight.value + 'px'
        }
      }
      const body = h('div', bodyOption, [
        h(
          'div',
          { class: 'v-dialog-mask__icon' },
          h('div', { class: 'v-dialog-timer' })
        ),
        h('div', contentOption)
      ])

      const dialog = h(
        'div',
        {
          class: 'v-dialog-dialog',
          style: dialogStyles.value
        },
        generateDialogContent({
          className: 'v-dialog-content',
          transitionName: 'v-dialog--candy',
          child: [body]
        })
      )

      return [
        generateDialogContainer(dialog, { dialogZIndex }, closeDialog),
        generateBackdrop({ backdropZIndex })
      ]
    }
  }
}
