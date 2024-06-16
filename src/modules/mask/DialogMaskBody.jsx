import IconLoading from '../../icons/IconLoading.vue'

export default {
  name: 'DialogMaskBody',
  setup (props, { slots }) {
    return () => (
      <div class='v-dialog-body'>
        <div class='v-dialog-mask__icon'>
          <IconLoading />
        </div>
        <div class='v-dialog-mask__content'>
          {slots.default && slots.default()}
        </div>
      </div>
    )
  }
}
