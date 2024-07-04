import { describe, test, expect } from 'vitest'
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
    test('默认应用胶囊形状圆角', () => {
      const container = wrapper.findComponent('.v-dialog-content')
      expect(container.classes().includes('mask--pill')).toBeTruthy()
    })
    test('显示 loading 动画图标', () => {
      expect(body.find('.v-dialog-mask__icon').exists()).toBeTruthy()
      expect(body.find('svg.v-dialog-icon-loading').exists()).toBeTruthy()
    })
    test('默认显示 `Loading……` 文本', () => {
      expect(body.find('.v-dialog-mask__content').text()).toBe('Loading……')
    })
  })

  describe('样式定制化', async () => {
    const wrapper = mount(DialogMask, {
      props: {
        dialogKey: 'mask-2',
        dialogIndex: 2,
        message: 'Bootstrap is a powerful, feature-packed frontend toolkit. Build anything—from prototype to production—in minutes.',
        pill: false,
        icon: false
      }
    })
    await nextTick()
    const body = wrapper.findComponent(DialogMaskBody)

    test('不应用胶囊形状圆角', () => {
      const container = wrapper.findComponent('.v-dialog-content')
      expect(container.classes().includes('mask--pill')).toBeFalsy()
    })
    test('不显示 loading 动画图标', () => {
      expect(body.find('.v-dialog-mask__icon').exists()).toBeFalsy()
    })
  })

  describe('不使用内容面板', async () => {
    const wrapper = mount(DialogMask, {
      props: {
        dialogKey: 'mask-3',
        dialogIndex: 3,
        panel: false,
        customClass: 'text-white'
      }
    })
    await nextTick()
    const container = wrapper.findComponent('.v-dialog-content')

    test('不应用内容面板样式，内容平铺于遮罩', () => {
      const container = wrapper.findComponent('.v-dialog-content')
      expect(container.classes().includes('mask--no-panel')).toBeTruthy()
    })
    test('应用了自定义样式 `text-white`', () => {
      expect(container.classes().includes('text-white')).toBeTruthy()
    })
  })

  describe('自定义遮罩区域', async () => {
    // 创建自定义元素
    const el = document.createElement('div')
    el.id = 'container'
    document.body.appendChild(el)

    mount(DialogMask, {
      props: {
        dialogKey: 'mask-4',
        dialogIndex: 4,
        appendTo: '#container'
      }
    })
    await nextTick()

    test('遮罩与内容应添加在目标元素内', () => {
      const target = document.querySelector('#container')
      expect(target.querySelectorAll('.v-dialog').length).toBe(1)
      expect(target.querySelectorAll('.v-dialog-overlay').length).toBe(1)
    })
  })
})
