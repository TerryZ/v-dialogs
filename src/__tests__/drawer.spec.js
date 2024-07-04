import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, markRaw } from 'vue'

import DialogDrawer from '@/modules/drawer/DialogDrawer'
import DialogDrawerHeader from '@/modules/drawer/DialogDrawerHeader'
import DialogDrawerBox from '@/modules/drawer/DialogDrawerBox'
import UserProfile from '../../examples/UserProfile.vue'

describe('v-dialogs Drawer 模式', () => {
  describe('不传递任何参数', async () => {
    const wrapper = mount(DialogDrawer, {
      props: {
        dialogKey: 'drawer-1',
        dialogIndex: 1,
        component: markRaw(UserProfile)
      }
    })
    await nextTick()
    const header = wrapper.findComponent(DialogDrawerHeader)

    test('标题栏中的文本应为 `Dialog`', () => {
      expect(header.text()).to.equal('Dialog')
    })
    test('存在关闭按钮', () => {
      expect(header.find('.v-dialog-btn__close').exists()).to.equal(true)
    })
    test('窗口应为 400px 宽', () => {
      const content = wrapper.findComponent('.v-dialog-content')
      expect(content.element.style.width).to.equal('400px')
      expect(content.element.style.height).to.equal('100vh')
    })
    test('应显示背景遮罩', () => {
      const content = wrapper.findComponent('.v-dialog-content')
      const root = content.element.parentElement.parentElement
      const sibling = root.previousElementSibling
      expect(sibling.querySelectorAll('.v-dialog-overlay').length).to.equal(1)
    })
  })

  describe('界面定制化', async () => {
    const wrapper = mount(DialogDrawer, {
      props: {
        dialogKey: 'drawer-2',
        dialogIndex: 2,
        component: markRaw(UserProfile),
        backdrop: false,
        title: 'The Drawer Dialog',
        closeButton: false,
        placement: 'left',
        width: 600
      }
    })
    await nextTick()
    const header = wrapper.findComponent(DialogDrawerHeader)
    const content = wrapper.findComponent('.v-dialog-content')
    const root = content.element.parentElement.parentElement

    test('背景遮罩应不显示', () => {
      const root = content.element.parentElement.parentElement
      const sibling = root.previousElementSibling
      expect(sibling.querySelectorAll('.v-dialog-overlay').length).to.equal(0)
    })
    test('标题栏中的文本应为 `The Drawer Dialog`', () => {
      expect(header.text()).to.equal('The Drawer Dialog')
    })
    test('关闭按钮应不被渲染', () => {
      expect(header.find('.v-dialog-btn__close').exists()).equal(false)
    })
    test('窗口应为 600px 宽', () => {
      expect(content.element.style.width).to.equal('600px')
      expect(content.element.style.height).to.equal('100vh')
    })
    test('窗口应位于左侧', () => {
      expect(root.className.includes('v-dialog-drawer--left')).toBeTruthy()
    })
  })

  describe('窗口位置', () => {
    describe('窗口应位于顶部', async () => {
      const wrapper = mount(DialogDrawer, {
        props: {
          dialogKey: 'drawer-13',
          dialogIndex: 13,
          component: markRaw(UserProfile),
          placement: 'top'
        }
      })
      await nextTick()
      // const header = wrapper.findComponent(DialogDrawerHeader)
      const root = wrapper.findComponent('.v-dialog-content').element.parentElement.parentElement
      test('窗口应位于顶部', () => {
        expect(root.className.includes('v-dialog-drawer--top')).toBeTruthy()
      })
    })
    describe('窗口应位于底部', async () => {
      const wrapper = mount(DialogDrawer, {
        props: {
          dialogKey: 'drawer-14',
          dialogIndex: 14,
          component: markRaw(UserProfile),
          placement: 'bottom'
        }
      })
      await nextTick()
      // const header = wrapper.findComponent(DialogDrawerHeader)
      const root = wrapper.findComponent('.v-dialog-content').element.parentElement.parentElement
      test('窗口应位于底部', () => {
        expect(root.className.includes('v-dialog-drawer--bottom')).toBeTruthy()
      })
    })
  })

  describe('DialogDrawerBox 渲染纯文本', async () => {
    const wrapper = mount(DialogDrawerBox, {
      props: {
        visible: true,
        title: 'Hello Drawer',
        closeButton: false
      },
      slots: {
        default: 'Hello World'
      }
    })
    await nextTick()

    const header = wrapper.findComponent(DialogDrawerHeader)
    const body = wrapper.findComponent('.v-dialog-body')

    test('DialogDrawerBox 应渲染纯文本 `Hello World`', () => {
      expect(body.text()).to.equal('Hello World')
    })
    // 测试 props 透传
    test('标题栏应显示文本 `Hello Drawer`', () => {
      expect(header.text()).to.equal('Hello Drawer')
    })
    test('关闭按钮应不被渲染', () => {
      expect(header.find('.v-dialog-btn__close').exists()).equal(false)
    })
  })
  describe('DialogDrawerBox 渲染 Vue 文件', async () => {
    const wrapper = mount(DialogDrawerBox, {
      props: {
        visible: true
      },
      slots: {
        default: markRaw(UserProfile)
      }
    })
    await nextTick()

    const body = wrapper.findComponent('.v-dialog-body')

    test('DialogDrawerBox 应渲染纯 UserProfile.vue 文件内容', () => {
      expect(body.find('.user-profile').exists()).toBeTruthy()
    })
  })
})
