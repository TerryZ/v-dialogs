<template>
  <section>
    <h3 class="mt-5">
      Alert
    </h3>
    <div class="mb-3">
      <button
        type="button"
        class="btn btn-primary me-2"
        @click="newAlert"
      >
        new alert
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="noParameters"
      >
        no parameters
      </button>
    </div>
    <div>
      <div
        class="btn-group"
        role="group"
      >
        <button
          type="button"
          class="btn btn-info"
          @click="callAlert()"
          id="btn-alert-info"
        >
          Info
        </button>
        <button
          type="button"
          class="btn btn-warning"
          @click="callAlert('warning')"
          id="btn-alert-warning"
        >
          Warning
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="callAlert('error')"
          id="btn-alert-error"
        >
          Error
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="callAlert('success')"
          id="btn-alert-success"
        >
          Success
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="callAlert('confirm')"
          id="btn-alert-confirm"
        >
          Confirm
        </button>
      </div>
    </div>
    <h5 class="mt-3">
      No icon
    </h5>
    <div>
      <button
        type="button"
        class="btn btn-outline-info"
        @click="callAlert('info', false)"
        id="btn-alert-info"
      >
        Info
      </button>
    </div>
    <h5 class="mt-3">
      Header bar
    </h5>
    <div>
      <button
        type="button"
        class="btn btn-outline-dark me-2"
        @click="callAlert('info', false, false)"
        id="btn-alert-info"
      >
        Close header bar
      </button>
      <button
        type="button"
        class="btn btn-outline-info"
        @click="callAlert('info', false, 'The custom header content')"
        id="btn-alert-info"
      >
        Custom content
      </button>
    </div>
  </section>
</template>

<script>
import { DialogAlert } from '@/components/v-dialogs'

export default {
  methods: {
    callAlert (type = 'info', icon = true, title) {
      // this.$dlg.alert('互联网科技与金融的结合变革了传统金融的经营思路，促使了金融行业的转型。如何利用科技进一步推动社会与经济的发展，成为了科技和金融领域需要共同思考的问题。11 日下午金融科技主论坛，不仅有蚂蚁金服发布在金融云、AI、风控、生物识别、开放平台等领域的最新进展以及技术突破，更有世界级别大咖：联合国粮农署副总干事 Mr. Daniel J. Gustafson 分享“科技如何消除贫困，推动农业发展”等。');
      const dlg = this.$dlg
      const option = {
        language: 'cn',
        icon: icon,
        messageType: type
      }
      if (typeof title !== 'undefined') option.title = title
      if (type === 'confirm') {
        option.cancelCallback = () => {
          dlg.alert('You canceled the confirm Alert')
        }
      }
      const msg = 'This is a Dialog plugin for <b>Vue2</b>, the name is <b>v-dialog</b>!'
      const key = dlg.alert(msg, () => {
        dlg.alert('You selected Ok!')
      }, option)
      console.log('Alert key:', key)
      // console.log(title)
    },
    newAlert () {
      // DialogAlert('the new alert', { type: 'error' })
      //   .then(() => {
      //     console.log('alert closed')
      //   })
      //   .catch(() => {
      //     console.log('confirm alert cancel')
      //   })
      DialogAlert('the new alert', {
        messageType: 'error',
        backdrop: false
      })
    },
    noParameters () {
      DialogAlert()
    }
  }
}
</script>
