import { defineComponent, mergeProps } from 'vue'

import { addDialog } from '../../core/manage'

import DialogModal from './DialogModal'

export default defineComponent({
  setup (props, { attrs, slots }) {
    const { index, key } = addDialog()
    const modalBoxProps = {
      dialogKey: key,
      dialogIndex: index,
      functional: false
    }

    return () => (
      <DialogModal {...mergeProps(attrs, modalBoxProps)}>
        {slots.default && slots.default()}
      </DialogModal>
    )
  }
})
