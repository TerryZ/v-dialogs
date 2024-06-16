<template>
  <h3 class="mb-3">
    Mask
  </h3>
  <div class="">
    <div class="mb-3">
      <h5>Base</h5>
      <div class="">
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="base"
        >
          Default mask
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="longText"
        >
          Long text
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="longTextCN"
        >
          Long text(Chinese)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { DialogMask } from '@/'

function base () {
  DialogMask()
}
function longText () {
  DialogMask('Bootstrap is a powerful, feature-packed frontend toolkit. Build anything—from prototype to production—in minutes.')
}
function longTextCN () {
  DialogMask('互联网科技与金融的结合变革了传统金融的经营思路，促使了金融行业的转型。如何利用科技进一步推动社会与经济的发展，成为了科技和金融领域需要共同思考的问题。11 日下午金融科技主论坛，不仅有蚂蚁金服发布在金融云、AI、风控、生物识别、开放平台等领域的最新进展以及技术突破，更有世界级别大咖：联合国粮农署副总干事 Mr. Daniel J. Gustafson 分享“科技如何消除贫困，推动农业发展”等。')
}
</script>
