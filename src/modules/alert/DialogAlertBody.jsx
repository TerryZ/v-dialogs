import { h, inject } from 'vue'

import { propsInjectionKey } from '../../constants'
import { getAlertIcon, getAlertClass } from '../../utils/helper'

export default {
  name: 'DialogAlertBody',
  setup () {
    const {
      icon,
      message,
      messageType,
      bodyHeight
    } = inject(propsInjectionKey)

    const classes = [
      'v-dialog-body',
      'v-dialog-alert',
      getAlertClass(messageType)
    ]

    icon || classes.push('no-icon')

    return () => (
      <div
        class={classes}
        style={{ height: bodyHeight.value + 'px' }}
      >
        <div class='v-dialog-alert__content'>
          {icon && (
            <div class='v-dialog-alert__icon'>
              { h(getAlertIcon(messageType)) }
            </div>
          )}
          <div
            class='v-dialog-alert__message'
            v-html={message}
          />
        </div>
      </div>
    )
  }
}
