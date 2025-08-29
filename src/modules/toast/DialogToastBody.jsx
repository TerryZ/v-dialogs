import { inject } from 'vue'

import {
  propsInjectionKey,
  MESSAGE_TYPE_INFO,
  MESSAGE_TYPE_WARNING,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_SUCCESS
} from '../../constants'
import { getDefaultTitle } from '../../core/helper'
import { getToastTypeClass } from './toast'

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
      header,
      title,
      lang,
      closeButton,
      closeGroupDialogWithCallback
    } = inject(propsInjectionKey)

    const bodyClass = [
      'v-dialog-body',
      getToastTypeClass(messageType)
    ]
    const titleText = title || getDefaultTitle(messageType, lang)

    function getIcon (type) {
      switch (type) {
        case MESSAGE_TYPE_INFO: return <IconInfo />
        case MESSAGE_TYPE_WARNING: return <IconWarning />
        case MESSAGE_TYPE_ERROR: return <IconError />
        case MESSAGE_TYPE_SUCCESS: return <IconSuccess />
        default: return undefined
      }
    }
    return () => (
      <div class={bodyClass}>
        {icon && (
          <div class='v-dialog-toast__prepend'>
            {getIcon(messageType)}
          </div>
        )}
        <div class='v-dialog-toast__body'>
          {header && (<h3>{titleText}</h3>)}
          <div>{message}</div>
        </div>
        {closeButton && (
          <div
            class='v-dialog-toast__append'
            onClick={closeGroupDialogWithCallback}
          >
            <IconClose class='v-dialog-toast__close' />
          </div>
        )}
      </div>
    )
  }
}
