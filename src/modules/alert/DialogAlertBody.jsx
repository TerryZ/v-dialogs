import { h } from 'vue'
import { getAlertIcon, getAlertClass } from '../../utils/helper'

export default {
  name: 'DialogAlertBody',
  props: {
    icon: { type: Boolean, default: true },
    height: { type: Number, default: undefined },
    message: { type: String, default: '' },
    messageType: { type: String, default: '' }
  },
  setup (props) {
    const classes = ['v-dialog-body', 'v-dialog-alert']

    classes.push(getAlertClass(props.messageType))

    if (!props.icon) {
      classes.push('no-icon')
    }

    return () => (
      <div
        class={classes}
        style={{ height: props.height + 'px' }}
      >
        <div class='v-dialog-alert__content'>
          {props.icon && (
            <div class='v-dialog-alert__icon'>
              { h(getAlertIcon(props.messageType)) }
            </div>
          )}
          <div
            class='v-dialog-alert__message'
            v-html={props.message}
          />
        </div>
      </div>
    )
  }
}
