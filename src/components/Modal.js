import '../styles/modal.sass'

import { ref, h, nextTick, onMounted, mergeProps } from 'vue'
import { calculateDialogTop, calculateDialogZIndex } from '../utils/helper'
import { useRenderPopup } from '../utils/render'
import { hideDocumentBodyOverflow } from '../utils/instance'
import { DIALOG_HEADER_CLASS } from '../constants'
import { commonProps, commonEmits, useDialog } from '../utils/dialog'

import IconClose from '../icons/IconClose.vue'
import IconMaximize from '../icons/IconMaximize.vue'
import IconRestore from '../icons/IconRestore.vue'

export default {
  name: 'DialogModal',
  props: {
    ...commonProps,
    component: Object,
    /**
     * Send parameters to Component
     * you need use props to receive this params in component
     */
    params: Object,
    shaking: { type: Boolean, default: true },
    /** Open maximized dialog */
    fullscreen: { type: Boolean, default: false },
    maxButton: { type: Boolean, default: true },
    closeButton: { type: Boolean, default: true }
  },
  emits: commonEmits,
  setup (props, { emit }) {
    const { show, dialogStyles, closeDialog, setDialogTop } = useDialog(props, emit)
    const {
      generateBackdrop,
      generateDialogContainer,
      generateDialogContent
    } = useRenderPopup(props, show)
    const { dialogZIndex, backdropZIndex } = calculateDialogZIndex(props.dialogIndex)

    const maximize = ref(false)
    const animate = ref(false)
    const header = ref()
    const bodyHeight = ref(0)

    function generateHeader () {
      if (!props.header) return

      const buttons = []
      if (props.maxButton) {
        const maxButtonOption = {
          class: 'v-dialog-btn__maximize',
          type: 'button',
          onClick: maximizeModal
        }
        buttons.push(
          h('button', maxButtonOption, h(maximize.value ? IconRestore : IconMaximize))
        )
      }
      if (props.closeButton) {
        const closeButtonOption = {
          class: 'v-dialog-btn__close',
          type: 'button',
          onClick: () => { closeDialog(props.callback) }
        }
        buttons.push(h('button', closeButtonOption, h(IconClose)))
      }
      return h('div', { class: DIALOG_HEADER_CLASS, ref: header }, [
        h('h3', props.title),
        ...buttons
      ])
    }
    function generateBody () {
      // Dynamic component
      const options = {
        onClose: data => closeDialog(props.callback, data)
      }
      const component = h(props.component, mergeProps(props.params, options))

      const dialogOption = {
        class: 'v-dialog-body',
        style: {
          height: bodyHeight.value + 'px'
        }
      }
      return h('div', dialogOption, component)
    }
    // Maximize the dialog
    function maximizeModal () {
      if (!animate.value) {
        animate.value = true
      }
      maximize.value = !maximize.value
      setBodyHeight()
    }
    function setModalDialogTop () {
      setDialogTop(() => maximize.value ? 0 : calculateDialogTop(props.height))
    }
    function setBodyHeight () {
      const headerHeight = header.value?.offsetHeight || 0
      const dialogHeight = maximize.value ? window.innerHeight : props.height

      bodyHeight.value = dialogHeight - headerHeight
      // nextTick(() => {
      setModalDialogTop()
      // })
    }

    onMounted(() => {
      show.value = true

      nextTick(() => {
        if (props.fullscreen) {
          // do maximize after `show` data property set to true in `mixins/index.js`
          // nextTick(() => {
          //   maximizeModal()
          // })
          maximizeModal()
        } else {
          setBodyHeight()
        }
        hideDocumentBodyOverflow()
      })
    })

    return () => {
      const dialog = h(
        'div',
        {
          class: {
            'v-dialog-dialog': true,
            'v-dialog-default-animated': animate.value
          },
          style: dialogStyles.value
        },
        generateDialogContent({
          className: 'v-dialog-content',
          transitionName: 'v-dialog--smooth',
          child: [generateHeader(), generateBody()]
        })
      )

      const containerOptions = {
        dialogZIndex,
        class: {
          'v-dialog-modal': true,
          'v-dialog--maximize': maximize.value
        }
      }

      return [
        generateDialogContainer(dialog, containerOptions, closeDialog),
        generateBackdrop({ backdropZIndex })
      ]
    }
  }
}
