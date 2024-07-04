import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import DialogToast from '@/modules/toast/DialogToast'
import DialogToastBody from '@/modules/toast/DialogToastBody'

describe('v-dialogs Toast 模式', () => {
  describe('不指定任何参数', async () => {
    const wrapper = mount(DialogToast, {
      props: {
        dialogKey: 'toast-1',
        dialogIndex: 1
      }
    })
    await nextTick()
    const body = wrapper.findComponent(DialogToastBody)
    const root = body.element.parentElement.parentElement

    test('弹出默认形态窗口，信息内容为空', () => {
      expect(body.exists()).toBeTruthy()
      expect(body.find('.v-dialog-toast__body div').text()).to.equal('')
    })
    test('消息类型应为 `info`，显示默认信息类型图标', () => {
      expect(body.find('.v-dialog-toast__prepend').exists()).toBeTruthy()
      expect(body.find('svg.bi-info-circle').exists()).toBeTruthy()
    })
    test('显示位置应为右上角', () => {
      expect(root.className.includes('v-dialog-toast--right')).toBeTruthy()
      // top 存在值则在顶部，bottom 存在值则在底部
      expect(root.style.top).to.not.equal('')
    })
    test('存在默认标题 `Information`', () => {
      expect(body.find('.v-dialog-toast__body h3').text()).to.equal('Information')
    })
    test('存在关闭按钮', () => {
      expect(body.find('.v-dialog-toast__append').exists()).toBeTruthy()
    })
    test('应用默认屏幕间距 16px', () => {
      expect(root.style.top).to.equal('16px')
    })
  })
  test('完成定时器倒计时后，窗口应被销毁', async () => {
    vi.useFakeTimers()
    mount(DialogToast, {
      props: {
        dialogKey: 'toast-2',
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
    mount(DialogToast, {
      props: {
        dialogKey: 'toast-3',
        dialogIndex: 3,
        duration: 0
      }
    })
    expect(vi.getTimerCount()).toBe(0)
    vi.useRealTimers()
  })

  describe('界面定制化', async () => {
    const wrapper = mount(DialogToast, {
      props: {
        dialogKey: 'toast-4',
        dialogIndex: 4,
        header: false,
        icon: false,
        closeButton: false,
        offset: 32
      }
    })
    await nextTick()
    const body = wrapper.findComponent(DialogToastBody)
    const root = body.element.parentElement.parentElement

    test('应不显示图标栏', () => {
      expect(body.find('.v-dialog-toast__prepend').exists()).toBe(false)
    })
    test('应不显示关闭按钮', () => {
      expect(body.find('.v-dialog-toast__append').exists()).toBe(false)
    })
    test('屏幕间距应为 32px', () => {
      expect(root.style.top).to.equal('32px')
    })
    test('应不显示标题栏', () => {
      expect(body.find('.v-dialog-toast__content h3').exists()).toBe(false)
    })
  })

  describe('消息类型与位置', () => {
    describe('左上角的 Warning 类型', async () => {
      const wrapper = mount(DialogToast, {
        props: {
          dialogKey: 'toast-5',
          dialogIndex: 5,
          title: 'Custom warning title',
          messageType: 'warning',
          placement: 'top-left'
        }
      })
      await nextTick()
      const body = wrapper.findComponent(DialogToastBody)
      const root = body.element.parentElement.parentElement

      test('消息类型应为 `warning`', () => {
        expect(body.find('.v-dialog-toast__prepend').exists()).toBeTruthy()
        expect(body.find('svg.bi-exclamation-triangle').exists()).toBeTruthy()
        expect(body.classes().includes('toast-warning')).toBeTruthy()
      })
      test('显示位置应为左上角', () => {
        expect(root.className.includes('v-dialog-toast--left')).toBeTruthy()
        expect(root.style.top).to.not.equal('')
      })
      test('标题应为 `Custom warning title`', () => {
        expect(body.find('.v-dialog-toast__body h3').text()).to.equal('Custom warning title')
      })
    })
    describe('左下角的 Error 类型', async () => {
      const wrapper = mount(DialogToast, {
        props: {
          dialogKey: 'toast-6',
          dialogIndex: 6,
          language: 'cn',
          messageType: 'error',
          placement: 'bottom-left'
        }
      })
      await nextTick()
      const body = wrapper.findComponent(DialogToastBody)
      const root = body.element.parentElement.parentElement

      test('消息类型应为 `error`', () => {
        expect(body.find('.v-dialog-toast__prepend').exists()).toBeTruthy()
        expect(body.find('svg.bi-x-circle').exists()).toBeTruthy()
        expect(body.classes().includes('toast-error')).toBeTruthy()
      })
      test('显示位置应为左下角', () => {
        expect(root.className.includes('v-dialog-toast--left')).toBeTruthy()
        expect(root.style.bottom).to.not.equal('')
      })
      test('标题应为 `错误`', () => {
        expect(body.find('.v-dialog-toast__body h3').text()).to.equal('错误')
      })
    })
    describe('右下角的 Success 类型', async () => {
      const wrapper = mount(DialogToast, {
        props: {
          dialogKey: 'toast-7',
          dialogIndex: 7,
          messageType: 'success',
          placement: 'bottom-right'
        }
      })
      await nextTick()
      const body = wrapper.findComponent(DialogToastBody)
      const root = body.element.parentElement.parentElement

      test('消息类型应为 `success`', () => {
        expect(body.find('.v-dialog-toast__prepend').exists()).toBeTruthy()
        expect(body.find('svg.bi-check-circle').exists()).toBeTruthy()
        expect(body.classes().includes('toast-success')).toBeTruthy()
      })
      test('显示位置应为右下角', () => {
        expect(root.className.includes('v-dialog-toast--right')).toBeTruthy()
        expect(root.style.bottom).to.not.equal('')
      })
      test('标题应为 `Success`', () => {
        expect(body.find('.v-dialog-toast__body h3').text()).to.equal('Success')
      })
    })
  })
})
