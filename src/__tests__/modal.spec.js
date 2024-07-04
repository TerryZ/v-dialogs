import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, markRaw } from 'vue'

import DialogModal from '@/modules/modal/DialogModal'
import DialogModalHeader from '@/modules/modal/DialogModalHeader'
import DialogModalBox from '@/modules/modal/DialogModalBox'
import UserProfile from '../../examples/UserProfile.vue'

describe('v-dialogs Modal 模式', () => {
  describe('不传递任何参数', async () => {
    const wrapper = mount(DialogModal, {
      props: {
        dialogKey: 'modal-1',
        dialogIndex: 1,
        component: markRaw(UserProfile)
      }
    })
    await nextTick()
    const header = wrapper.findComponent(DialogModalHeader)

    test('标题栏中的文本应为 `Dialog`', () => {
      expect(header.text()).to.equal('Dialog')
    })
    test('存在最大化按钮', () => {
      expect(header.find('.v-dialog-btn__maximize').exists()).to.equal(true)
    })
    test('存在关闭按钮', () => {
      expect(header.find('.v-dialog-btn__close').exists()).to.equal(true)
    })
    test('窗口尺寸应为，宽 700px，高 400px', () => {
      const content = wrapper.findComponent('.v-dialog-content')
      expect(content.element.style.width).to.equal('700px')
      expect(content.element.style.height).to.equal('400px')
    })
    test('应显示背景遮罩', () => {
      const content = wrapper.findComponent('.v-dialog-content')
      const root = content.element.parentElement.parentElement
      const sibling = root.previousElementSibling
      expect(sibling.querySelectorAll('.v-dialog-overlay').length).to.equal(1)
    })
  })

  describe('界面定制化', async () => {
    const wrapper = mount(DialogModal, {
      props: {
        dialogKey: 'modal-2',
        dialogIndex: 2,
        component: markRaw(UserProfile),
        backdrop: false,
        title: 'The Modal Dialog',
        closeButton: false,
        maxButton: false,
        width: 1000,
        height: 500
      }
    })
    await nextTick()
    const header = wrapper.findComponent(DialogModalHeader)
    const content = wrapper.findComponent('.v-dialog-content')

    test('背景遮罩应依然显示', () => {
      const root = content.element.parentElement.parentElement
      const sibling = root.previousElementSibling
      expect(sibling.querySelectorAll('.v-dialog-overlay').length).to.equal(1)
    })
    test('标题栏中的文本应为 `The Modal Dialog`', () => {
      expect(header.text()).to.equal('The Modal Dialog')
    })
    test('最大化按钮应不被渲染', () => {
      expect(header.find('.v-dialog-btn__maximize').exists()).equal(false)
    })
    test('关闭按钮应不被渲染', () => {
      expect(header.find('.v-dialog-btn__close').exists()).equal(false)
    })
    test('窗口尺寸应为，宽 1000px，高 500px', () => {
      expect(content.element.style.width).to.equal('1000px')
      expect(content.element.style.height).to.equal('500px')
    })
  })

  describe('窗口最大化切换', async () => {
    const wrapper = mount(DialogModal, {
      props: {
        dialogKey: 'modal-3',
        dialogIndex: 3,
        component: markRaw(UserProfile),
        title: 'The Modal Dialog',
        fullscreen: true
      }
    })
    await nextTick()
    const header = wrapper.findComponent(DialogModalHeader)
    const root = wrapper.findComponent('.v-dialog-content').element.parentElement.parentElement

    test('窗口以最大化显示，窗口打开时尺寸应充满屏幕', () => {
      expect(root.className.includes('v-dialog-modal--maximize')).toBeTruthy()
    })
    test('最大化按钮中应显示缩放图标', () => {
      expect(header.find('svg.bi-arrows-angle-contract').exists).toBeTruthy()
    })
    test('点击最大化按钮，窗口应取消全屏状态，恢复窗口模式显示', async () => {
      await header.find('.v-dialog-btn__maximize').trigger('click')
      expect(root.className.includes('v-dialog-modal--maximize')).toBeFalsy()
    })
    test('最大化按钮中应显示最大化图标', () => {
      expect(header.find('svg.bi-square').exists).toBeTruthy()
    })
  })

  describe('DialogModalBox 渲染纯文本', async () => {
    const wrapper = mount(DialogModalBox, {
      props: {
        visible: true,
        title: 'Hello Modal',
        closeButton: false,
        maxButton: false
      },
      slots: {
        default: 'Hello World'
      }
    })
    await nextTick()

    const header = wrapper.findComponent(DialogModalHeader)
    const body = wrapper.findComponent('.v-dialog-body')

    test('DialogModalBox 应渲染纯文本 `Hello World`', () => {
      expect(body.text()).to.equal('Hello World')
    })
    // 测试 props 透传
    test('标题栏应显示文本 `Hello Modal`', () => {
      expect(header.text()).to.equal('Hello Modal')
    })
    test('最大化按钮应不被渲染', () => {
      expect(header.find('.v-dialog-btn__maximize').exists()).equal(false)
    })
    test('关闭按钮应不被渲染', () => {
      expect(header.find('.v-dialog-btn__close').exists()).equal(false)
    })
  })
  describe('DialogModalBox 渲染 Vue 文件', async () => {
    const wrapper = mount(DialogModalBox, {
      props: {
        visible: true
      },
      slots: {
        default: markRaw(UserProfile)
      }
    })
    await nextTick()

    const body = wrapper.findComponent('.v-dialog-body')

    test('DialogModalBox 应渲染纯 UserProfile.vue 文件内容', () => {
      expect(body.find('.user-profile').exists()).toBeTruthy()
    })
  })
})
