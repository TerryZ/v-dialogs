import { useDialogComponent } from '../core/base'

export default {
  name: 'DialogComponentBody',
  setup (props, { slots }) {
    const { getComponentContent } = useDialogComponent(slots)

    return () => <div class='v-dialog-body'>{getComponentContent()}</div>
  }
}
