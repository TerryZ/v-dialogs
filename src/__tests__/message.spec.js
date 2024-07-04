import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import DialogMessage from '@/modules/message/DialogMessage'
import DialogMessageBody from '@/modules/message/DialogMessageBody'

describe('v-dialogs Message 模式', () => {
  describe('不指定任何参数', async () => {
    const wrapper = mount(DialogMessage, {
      props: {
        dialogKey: 'message-1',
        dialogIndex: 1
      }
    })
    await nextTick()
    const body = wrapper.findComponent(DialogMessageBody)
    const root = body.element.parentElement.parentElement

    test('弹出默认形态窗口，信息内容为空', () => {
      expect(body.exists()).toBeTruthy()
      expect(body.find('.v-dialog-message__body').text()).to.equal('')
    })
    test('消息类型应为 `info`，显示默认信息类型图标', () => {
      expect(body.find('.v-dialog-message__prepend').exists()).toBeTruthy()
      expect(body.find('svg.bi-info-circle').exists()).toBeTruthy()
    })
    test('显示位置应为顶部', () => {
      // top 存在值则在顶部，bottom 存在值则在底部
      expect(root.style.top).to.not.equal('')
    })
    test('应不存在关闭按钮', () => {
      expect(body.find('.v-dialog-message__append').exists()).toBeFalsy()
    })
    test('应用默认屏幕间距 32px', () => {
      expect(root.style.top).to.equal('32px')
    })
  })
  test('完成定时器倒计时后，窗口应被销毁', async () => {
    vi.useFakeTimers()
    mount(DialogMessage, {
      props: {
        dialogKey: 'message-2',
        dialogIndex: 2
      }
    })
    await nextTick()

    expect(vi.getTimerCount()).toBe(1)

    vi.runAllTimers()
    // 暂时只能使用最精颗粒度来测试该功能
    // 有待后续 test-utils 对 Transition 的生命周期钩子有更完善的触发与测试方式
    expect(vi.getTimerCount()).toBe(0)

    vi.useRealTimers()
  })
  test('关闭倒计时，窗口不会自动被关闭', async () => {
    vi.useFakeTimers()
    mount(DialogMessage, {
      props: {
        dialogKey: 'message-3',
        dialogIndex: 3,
        duration: 0
      }
    })
    expect(vi.getTimerCount()).toBe(0)
    vi.useRealTimers()
  })

  describe('界面定制化', async () => {
    const wrapper = mount(DialogMessage, {
      props: {
        dialogKey: 'message-4',
        dialogIndex: 4,
        header: false,
        icon: false,
        closeButton: false,
        offset: 50,
        pill: false
      }
    })
    await nextTick()
    const body = wrapper.findComponent(DialogMessageBody)
    const root = body.element.parentElement.parentElement

    test('应不显示图标栏', () => {
      expect(body.find('.v-dialog-message__prepend').exists()).toBe(false)
    })
    test('应不显示关闭按钮', () => {
      expect(body.find('.v-dialog-message__append').exists()).toBe(false)
    })
    test('屏幕间距应为 50px', () => {
      expect(root.style.top).to.equal('50px')
    })
    test('应不显示标题栏', () => {
      expect(body.find('.v-dialog-message__content h3').exists()).toBe(false)
    })
    test('不应用胶囊圆角样式', () => {
      expect(body.classes().includes('v-dialog-message--pill')).toBe(false)
    })
  })

  describe('消息类型与位置', () => {
    describe('底部的 Warning 类型', async () => {
      const wrapper = mount(DialogMessage, {
        props: {
          dialogKey: 'message-5',
          dialogIndex: 5,
          message: 'Warning message',
          messageType: 'warning',
          placement: 'bottom'
        }
      })
      await nextTick()
      const body = wrapper.findComponent(DialogMessageBody)
      const root = body.element.parentElement.parentElement

      test('消息类型应为 `warning`', () => {
        expect(body.find('.v-dialog-message__prepend').exists()).toBeTruthy()
        expect(body.find('svg.bi-exclamation-triangle').exists()).toBeTruthy()
        expect(body.classes().includes('message-warning')).toBeTruthy()
      })
      test('显示位置应为底部', () => {
        expect(root.style.bottom).to.not.equal('')
      })
      test('消息内容应为 `Warning message`', () => {
        expect(body.find('.v-dialog-message__body').text()).to.equal('Warning message')
      })
    })
    describe('顶部的 Error 类型', async () => {
      const wrapper = mount(DialogMessage, {
        props: {
          dialogKey: 'message-6',
          dialogIndex: 6,
          message: 'Error message',
          messageType: 'error'
        }
      })
      await nextTick()
      const body = wrapper.findComponent(DialogMessageBody)
      const root = body.element.parentElement.parentElement

      test('消息类型应为 `error`', () => {
        expect(body.find('.v-dialog-message__prepend').exists()).toBeTruthy()
        expect(body.find('svg.bi-x-circle').exists()).toBeTruthy()
        expect(body.classes().includes('message-error')).toBeTruthy()
      })
      test('显示位置应为顶部', () => {
        expect(root.style.top).to.not.equal('')
      })
      test('消息内容应为 `Error message`', () => {
        expect(body.find('.v-dialog-message__body').text()).to.equal('Error message')
      })
    })
    describe('底部的 Success 类型', async () => {
      const wrapper = mount(DialogMessage, {
        props: {
          dialogKey: 'message-7',
          dialogIndex: 7,
          message: 'Success message',
          messageType: 'success',
          placement: 'bottom'
        }
      })
      await nextTick()
      const body = wrapper.findComponent(DialogMessageBody)
      const root = body.element.parentElement.parentElement

      test('消息类型应为 `success`', () => {
        expect(body.find('.v-dialog-message__prepend').exists()).toBeTruthy()
        expect(body.find('svg.bi-check-circle').exists()).toBeTruthy()
        expect(body.classes().includes('message-success')).toBeTruthy()
      })
      test('显示位置应为底部', () => {
        expect(root.style.bottom).to.not.equal('')
      })
      test('消息内容应为 `Success message`', () => {
        expect(body.find('.v-dialog-message__body').text()).to.equal('Success message')
      })
    })
  })
})
