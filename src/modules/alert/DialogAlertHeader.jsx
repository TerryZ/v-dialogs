import { inject } from 'vue'

import { propsInjectionKey } from '../../constants'
import { getDefaultTitle, textTruncate } from '../../core/helper'

export default {
  name: 'DialogAlertHeader',
  setup () {
    const { title, lang } = inject(propsInjectionKey)

    const text = title || getDefaultTitle(title, lang)

    return () => (
      <div class='v-dialog-header'>
        <h3>{textTruncate(text)}</h3>
      </div>
    )
  }
}
