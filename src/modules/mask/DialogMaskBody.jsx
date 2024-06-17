import { inject } from 'vue'

import IconLoading from '../../icons/IconLoading.vue'

import { propsInjectionKey } from '../../constants'

export default {
  name: 'DialogMaskBody',
  setup (props, { slots }) {
    const { icon } = inject(propsInjectionKey)

    return () => (
      <div class='v-dialog-body'>
        {icon && (
          <div class='v-dialog-mask__icon'>
            <IconLoading />
          </div>
        )}
        <div class='v-dialog-mask__content'>
          {slots.default && slots.default()}
        </div>
      </div>
    )
  }
}
