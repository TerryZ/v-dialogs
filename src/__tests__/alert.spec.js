import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'

import DialogAlert from '@/modules/alert/DialogAlert'
import DialogAlertHeader from '@/modules/alert/DialogAlertHeader'
import DialogAlertBody from '@/modules/alert/DialogAlertBody'
import DialogAlertFooter from '@/modules/alert/DialogAlertFooter'

describe('v-dialogs Alert 模式', () => {
  describe('不指定任何参数', async () => {
    const wrapper = mount(DialogAlert, {
      props: {
        dialogKey: 'alert-1',
        dialogIndex: 1
      }
    })
    await nextTick()
    // const header = wrapper.findComponent('.v-dialog-header')
    const header = wrapper.findComponent(DialogAlertHeader)
    const body = wrapper.findComponent(DialogAlertBody)
    const footer = wrapper.findComponent(DialogAlertFooter)

    it('标题栏中应显示 Information 文本', () => {
      expect(header.text()).to.equal('Information')
    })
    it('显示默认的信息类型图标', () => {
      expect(body.find('.v-dialog-alert__icon').exists()).to.equal(true)
      expect(body.find('.bi-info-circle').exists()).to.equal(true)
    })
    it('信息内容为空', () => {
      expect(body.find('.v-dialog-alert__message').text()).to.equal('')
    })
    it('存在一个确认按钮', () => {
      expect(footer.find('.v-dialog-alert__buttons button').exists()).to.equal(true)
      expect(footer.find('.v-dialog-alert__buttons button').text()).to.equal('OK')
    })
    it('点击 OK 按钮，触发 `click` 事件', () => {
      footer.find('button').trigger('click')
      expect(footer.emitted('click').length).to.equal(1)
    })
    it('窗口与遮罩应均被销毁', () => {
      setTimeout(() => {
        expect(document.querySelectorAll('.v-dialog').length).toBe(0)
        expect(document.querySelectorAll('.v-dialog-overlay').length).toBe(0)
      }, 1000)
    })
  })

  describe('彩色阴影的 Error 消息类型对话框', async () => {
    const vNodeContent = h('div', [
      'Hello, This is a ',
      h('strong', 'Alert Dialog'),
      '!'
    ])
    const wrapper = mount(DialogAlert, {
      props: {
        dialogKey: 'alert-2',
        dialogIndex: 2,
        colorfulShadow: true,
        messageType: 'error',
        title: 'System Error',
        icon: false,
        message: vNodeContent
      }
    })
    await nextTick()
    const header = wrapper.findComponent(DialogAlertHeader)
    const body = wrapper.findComponent(DialogAlertBody)
    // const footer = wrapper.findComponent(DialogAlertFooter)

    it('窗口应用了错误时的红色阴影', () => {
      const div = wrapper.findComponent('.v-dialog__shadow--error')
      expect(div.exists()).to.equal(true)
    })
    it('应用了 Error 消息类型', () => {
      expect(body.classes().includes('alert-error')).toBeTruthy()
    })
    it('标题栏文本应为 System Error', () => {
      expect(header.text()).to.equal('System Error')
    })
    it('图标应不显示', () => {
      expect(body.find('.v-dialog-alert__icon').exists()).to.equal(false)
    })
    it('VNode 内容应被正确渲染', () => {
      expect(body.find('.v-dialog-alert__message').text()).to.equal('Hello, This is a Alert Dialog!')
      expect(body.find('.v-dialog-alert__message strong').text()).toBe('Alert Dialog')
    })
  })

  describe('Confirm 对话框', async () => {
    const wrapper = mount(DialogAlert, {
      props: {
        dialogKey: 'alert-3',
        dialogIndex: 3,
        messageType: 'confirm',
        header: false,
        language: 'cn',
        message: '确定执行该操作吗？',
        customClass: 'rounded-0'
      }
    })
    await nextTick()
    const header = wrapper.findComponent(DialogAlertHeader)
    const body = wrapper.findComponent(DialogAlertBody)
    const footer = wrapper.findComponent(DialogAlertFooter)

    it('应用了 Confirm 消息类型', () => {
      expect(body.classes().includes('alert-confirm')).toBeTruthy()
    })
    it('标题栏应不存在', () => {
      expect(header.exists()).toBeFalsy()
    })
    it('应用了自定义样式 `rounded-0`', () => {
      const content = wrapper.findComponent('.v-dialog-content')
      expect(content.classes()).to.include('rounded-0')
    })
    it('设置语言为中文时，确认按钮显示文本应为 `确认`', () => {
      expect(footer.find('.v-dialog-btn__ok').text()).toBe('确认')
    })
    it('Confirm 类型下，应出现 `取消` 按钮', () => {
      expect(footer.find('.v-dialog-btn__cancel').exists()).toBe(true)
      expect(footer.find('.v-dialog-btn__cancel').text()).toBe('取消')
    })
  })
})
