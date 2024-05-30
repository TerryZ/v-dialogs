import { inject } from 'vue'

import { alertInjectionKey } from '../../constants'
import { textTruncate } from '../../utils/helper'
import { getDefaultTitle } from '../../core/helper'

export default {
  name: 'DialogAlertHeader',
  setup () {
    const { title, lang } = inject(alertInjectionKey)

    const text = title || getDefaultTitle(title, lang)

    return () => (
      <div class='v-dialog-header'>
        <h3>{textTruncate(text)}</h3>
      </div>
    )
  }
}
