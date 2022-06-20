import { mount } from '@vue/test-utils'
import { expect } from 'chai'

import Container from '@/Container'
import { generateAlertOption } from '@/utils/options'

describe('v-dialogs Alert 模式', () => {
  describe('不指定任何参数', () => {
    const w = mount(Container, {
      attachTo: document.body
    })
    w.vm.addDialog(generateAlertOption())

    it('弹出默认形态窗口，信息内容为空', () => {
      expect(w.find('.v-dialog-alert').exists()).to.equal(true)
      expect(w.find('.v-dialog-alert__content').text()).to.equal('')
    })

    it('消息类型应为 `info`', () => {
      expect(w.find('.v-dialog-alert.alertInfo').exists()).to.equal(true)
    })

    it('存在标题栏，且文本内容应为 `提示`', () => {
      expect(w.find('.v-dialog-header').text()).to.equal('提示')
      w.destroy()
    })
  })

  describe('大文本输入', () => {
    const w = mount(Container, {
      attachTo: document.body
    })

    let msg = '这是一段用于演示的文本内容这是一段用于演示的文本内容这是一段用于演示的文本内容'
    msg += '这是一段用于演示的文本内容这是一段用于演示的文本内容这是一段用于演示的文本内容'
    msg += '这是一段用于演示的文本内容这是一段用于演示的文本内容这是一段用于演示的文本内容'
    msg += '这是一段用于演示的文本内容这是一段用于演示的文本内容这是一段用于演示的文本内容'
    msg += '这是一段用于演示的文本内容这是一段用于演示的文本内容这是一段用于演示的文本内容'

    w.vm.addDialog(generateAlertOption(msg))
    it('消息框应以大尺寸形式展示', () => {
      const style = w.find('.v-dialog-dialog').element.style
      expect(style.width).equal('700px')
      expect(style.height).equal('400px')
      w.destroy()
    })
  })

  describe('confirm 确认对话框', () => {
    const w = mount(Container, {
      attachTo: document.body
    })

    w.vm.addDialog(generateAlertOption('confirm', {
      messageType: 'confirm'
    }))

    it('标题栏文本应为 `确认`', () => {
      expect(w.find('.v-dialog-header').text()).to.equal('确认')
    })
    it('操作区域应有两个按钮，`确认` 与 `取消`', () => {
      const buttons = w.findAll('.v-dialog-alert__buttons button')
      expect(buttons.length).equal(2)
      expect(buttons.at(0).text()).equal('确认')
      expect(buttons.at(1).text()).equal('取消')
      w.destroy()
    })
  })

  describe('界面定制化', () => {
    const w = mount(Container, {
      attachTo: document.body
    })

    w.vm.addDialog(generateAlertOption('custom', {
      messageType: 'warning',
      title: false,
      icon: false
    }))

    it('`title` 设置为 false，标题栏应不存在', () => {
      expect(w.find('.v-dialog-header').exists()).to.equal(false)
    })

    it('消息类型应为 `warning`', () => {
      expect(w.find('.v-dialog-content.v-dialog__shadow--warning').exists()).to.equal(true)
    })

    it('`icon` 设置为 false，图标区域应被关闭', () => {
      expect(w.find('.v-dialog-alert.no-icon').exists()).to.equal(true)
      w.destroy()
    })
  })
})
