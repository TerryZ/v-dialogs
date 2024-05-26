import { textTruncate } from '../../utils/helper'

export default {
  name: 'DialogAlertHeader',
  props: {
    content: { type: String, default: '' }
  },
  setup (props) {
    return () => (
      <div class='v-dialog-header'>
        <h3>{textTruncate(props.content)}</h3>
      </div>
    )
  }
}
