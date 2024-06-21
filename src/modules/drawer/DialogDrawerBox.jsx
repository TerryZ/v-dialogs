import { defineComponent, mergeProps, ref } from 'vue'

import { addDialog } from '../../core/manage'

import DialogDrawer from './DialogDrawer'

export default defineComponent({
  name: 'DialogModalDrawer',
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
        <DialogDrawer {...mergeProps(attrs, baseProps)}>
          {slots.default()}
        </DialogDrawer>
      )
    }
  }
})
