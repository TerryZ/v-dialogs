import { inject } from 'vue'

import { propsInjectionKey } from '../../constants'
import { getDefaultTitle } from '../../core/helper'

export default {
  name: 'DialogAlertHeader',
  setup () {
    const { title, lang, messageType } = inject(propsInjectionKey)

    const text = title || getDefaultTitle(messageType, lang)

    return () => (
      <div class='v-dialog-header'>
        <h3>{text}</h3>
      </div>
    )
  }
}
