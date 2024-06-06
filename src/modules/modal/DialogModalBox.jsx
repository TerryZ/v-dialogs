import { defineComponent, mergeProps, ref } from 'vue'

import { addDialog } from '../../core/manage'

import DialogModal from './DialogModal'

export default defineComponent({
  setup (props, { attrs, slots }) {
    const renderDialog = ref(false)

    const { index, key } = addDialog()
    const baseProps = {
      dialogKey: key,
      dialogIndex: index,
      onRenderDialog: val => {
        renderDialog.value = val
      }
    }

    return () => {
      if (!attrs.visible && !renderDialog.value) return

      return (
        <DialogModal {...mergeProps(attrs, baseProps)}>
          {slots.default()}
        </DialogModal>
      )
    }
  }
})
