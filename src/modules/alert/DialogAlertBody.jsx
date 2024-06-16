import { inject } from 'vue'

import {
  propsInjectionKey,
  MESSAGE_TYPE_INFO,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_CONFIRM
} from '../../constants'
import { getAlertTypeClass } from '../../core/alert'

import IconInfo from '../../icons/IconInfo.vue'
import IconWarning from '../../icons/IconWarning.vue'
import IconError from '../../icons/IconError.vue'
import IconSuccess from '../../icons/IconSuccess.vue'
import IconConfirm from '../../icons/IconConfirm.vue'

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
      getAlertTypeClass(messageType)
    ]

    function getIcon (type) {
      switch (type) {
        case MESSAGE_TYPE_INFO: return <IconInfo />
        case MESSAGE_TYPE_WARNING: return <IconWarning />
        case MESSAGE_TYPE_ERROR: return <IconError />
        case MESSAGE_TYPE_SUCCESS: return <IconSuccess />
        case MESSAGE_TYPE_CONFIRM: return <IconConfirm />
        default: return undefined
      }
    }

    icon || classes.push('no-icon')

    return () => (
      <div class={classes} >
        <div class='v-dialog-alert__content'>
          {icon && (
            <div class='v-dialog-alert__icon'>
              { getIcon(messageType) }
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
