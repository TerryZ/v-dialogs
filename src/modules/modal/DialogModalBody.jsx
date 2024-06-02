import { inject, h, mergeProps } from 'vue'
import { propsInjectionKey } from '../../constants'

export default {
  setup (props, { slots }) {
    const {
      component,
      params,
      closeDialogWithCallback,
      bodyHeight
    } = inject(propsInjectionKey)

    function getModalContent () {
      // use slot content first
      if (slots.default) {
        return slots.default()
      }
      if (!component) return
      // Dynamic component
      const options = {
        onClose: data => closeDialogWithCallback(data)
      }
      return h(component, mergeProps(params, options))
    }

    return () => (
      <div
        class='v-dialog-body'
        style={{
          height: bodyHeight.value + 'px'
        }}
      >
        {getModalContent()}
      </div>
    )
  }
}
