import { mount } from '@vue/test-utils'
import { expect } from 'chai'

import Container from '@/Container'
import Profile from './Profile.vue'
import { generateModalOption } from '@/utils/options'

describe('v-dialogs Modal 模式', () => {
  describe('不传递任何参数', () => {
    const w = mount(Container, {
      attachTo: document.body
    })
    w.vm.addDialog(generateModalOption(Profile))

    it('存在标题栏且标题文本为 `Dialog`', () => {
      expect(w.find('.v-dialog-header').exists()).equal(true)
      expect(w.find('.v-dialog-header h3').text()).equal('Dialog')
    })

    it('存在最大化按钮', () => {
      expect(w.find('.v-dialog-btn__maximize').exists()).equal(true)
    })

    it('存在关闭按钮', () => {
      expect(w.find('.v-dialog-btn__close').exists()).equal(true)
    })

    it('应显示背景遮罩', () => {
      expect(w.find('.v-dialog-overlay').exists()).equal(true)
    })

    it('窗口尺寸应为，宽：700px，高：400px', () => {
      const style = w.find('.v-dialog-dialog').element.style
      expect(style.width).equal('700px')
      expect(style.height).equal('400px')
      w.destroy()
    })
  })

  describe('界面定制化', () => {
    const w = mount(Container, {
      attachTo: document.body
    })
    w.vm.addDialog(generateModalOption(Profile, {
      backdrop: false,
      title: 'The Modal Dialog',
      closeButton: false,
      maxButton: false,
      fullscreen: true
    }))

    it('背景遮罩应被关闭', () => {
      expect(w.find('.v-dialog-overlay').exists()).equal(false)
    })

    it('最大化按钮应不被渲染', () => {
      expect(w.find('.v-dialog-btn__maximize').exists()).equal(false)
    })

    it('关闭按钮应不被渲染', () => {
      expect(w.find('.v-dialog-btn__close').exists()).equal(false)
    })

    it('存在标题栏且标题文本为 `The Modal Dialog`', () => {
      expect(w.find('.v-dialog-header').exists()).equal(true)
      expect(w.find('.v-dialog-header h3').text()).equal('The Modal Dialog')
    })

    it('窗口以最大化显示，窗口尺寸应充满屏幕', () => {
      expect(w.find('.v-dialog-modal.v-dialog--maximize').exists()).equal(true)
    })

    // it('显示文本应为 `Data loading...`', () => {
    //   expect(w.find('.v-dialog-mask__content').text()).to.equal('Data loading...')
    // })
    // it('`backdrop` 设置为 false，遮罩依然显示', () => {
    //   expect(w.find('.v-dialog-overlay').exists()).equal(true)
    //   w.destroy()
    // })
  })
})
