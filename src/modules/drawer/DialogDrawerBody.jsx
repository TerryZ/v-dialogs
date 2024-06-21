import { inject, h, mergeProps } from 'vue'
import { propsInjectionKey } from '../../constants'

export default {
  setup (props, { slots }) {
    const {
      component,
      params,
      closeModalWithCallback
    } = inject(propsInjectionKey)

    function getModalContent () {
      // use slot content first
      if (slots.default) return slots.default()
      // Dynamic component
      if (!component) return

      const VNode = typeof component === 'function'
        ? component()
        : component

      const options = {
        onClose: data => closeModalWithCallback(data)
      }
      return h(VNode, mergeProps(params, options))
    }

    return () => <div class='v-dialog-body'>{getModalContent()}</div>
  }
}
