import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import DialogMask from '@/modules/mask/DialogMask'
import DialogMaskBody from '@/modules/mask/DialogMaskBody'

describe('v-dialogs Mask 模式', () => {
  describe('不传递任何参数', async () => {
    const wrapper = mount(DialogMask, {
      props: {
        dialogKey: 'mask-1',
        dialogIndex: 1
      }
    })
    await nextTick()
    const body = wrapper.findComponent(DialogMaskBody)
    it('默认应用胶囊形状圆角', () => {
      const container = wrapper.findComponent('.v-dialog-content')
      expect(container.classes().includes('mask--pill')).toBeTruthy()
    })
    it('显示 loading 动画图标', () => {
      expect(body.find('.v-dialog-mask__icon').exists()).toBeTruthy()
      expect(body.find('svg.v-dialog-icon-loading').exists()).toBeTruthy()
    })
    it('默认显示 `Loading……` 文本', () => {
      expect(body.find('.v-dialog-mask__content').text()).toBe('Loading……')
    })
  })
})
//   describe('不传递任何参数', () => {
//     const w = mount(Container, {
//       attachTo: document.body
//     })
//     w.vm.addDialog(generateMaskOption())

//     it('显示文本内容应为 `数据加载中……`', () => {
//       expect(w.find('.v-dialog-mask__content').text()).to.equal('数据加载中……')
//     })

//     it('显示时针旋转效果的动画图标', () => {
//       expect(w.find('.v-dialog-timer').exists()).equal(true)
//       w.destroy()
//     })
//   })

//   describe('界面定制化', () => {
//     const w = mount(Container, {
//       attachTo: document.body
//     })
//     w.vm.addDialog(generateMaskOption('Data loading...', {
//       backdrop: false
//     }))

//     it('显示文本应为 `Data loading...`', () => {
//       expect(w.find('.v-dialog-mask__content').text()).to.equal('Data loading...')
//     })
//     it('`backdrop` 设置为 false，遮罩依然显示', () => {
//       expect(w.find('.v-dialog-overlay').exists()).equal(true)
//       w.destroy()
//     })
//   })
// })
