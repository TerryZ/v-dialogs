import { inject } from 'vue'

import {
  propsInjectionKey,
  MESSAGE_TYPE_INFO,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TYPE_CONFIRM
} from '../../constants'
import { getMessageTypeClass } from '../../core/message'

import IconInfo from '../../icons/IconInfo.vue'
import IconWarning from '../../icons/IconWarning.vue'
import IconError from '../../icons/IconError.vue'
import IconSuccess from '../../icons/IconSuccess.vue'
import IconClose from '../../icons/IconClose.vue'

export default {
  name: 'DialogMessageBody',
  setup () {
    const {
      icon,
      message,
      messageType,
      closeButton,
      closeDialogWithCallback
    } = inject(propsInjectionKey)

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
    return () => (
      <div class={['v-dialog-body', getMessageTypeClass(messageType)]}>
        {icon && (
          <div class='v-dialog-message__prepend'>
            {getIcon(messageType)}
          </div>
        )}
        <div class='v-dialog-message__body'>{message}</div>
        {closeButton && (
          <div
            class='v-dialog-message__append'
            onClick={closeDialogWithCallback}
          >
            <IconClose class='v-dialog-message__close' />
          </div>
        )}
      </div>
    )
  }
}
