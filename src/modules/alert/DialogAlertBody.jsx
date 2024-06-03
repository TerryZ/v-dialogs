import { h, inject } from 'vue'

import { propsInjectionKey } from '../../constants'
import { getAlertIcon, getAlertClass } from '../../utils/helper'

export default {
  name: 'DialogAlertBody',
  setup () {
    const {
      icon,
      message,
      messageType
    } = inject(propsInjectionKey)

    const classes = [
      'v-dialog-body',
      'v-dialog-alert',
      getAlertClass(messageType)
    ]

    icon || classes.push('no-icon')

    return () => (
      <div class={classes} >
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
