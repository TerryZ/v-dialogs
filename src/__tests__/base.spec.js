import { describe, it, expect } from 'vitest'

import { parseArgumentsToProps } from '@/core/helper'
import { createDialog, opening } from '@/core/manage'

import DialogAlert from '@/modules/alert/DialogAlert'

describe('v-dialogs 基础模块', () => {
  describe('工具类', () => {
    it('parseArgumentsToProps(message, callback, option) 返回结果应一一对应属性', () => {
      const props = parseArgumentsToProps('arguments', () => {}, { title: 'title' })
      expect(props.message).equal('arguments')
      expect(props.title).equal('title')
      expect(typeof props.callback).equal('function')
    })
    it('parseArgumentsToProps(message, option) 返回结果应一一对应属性', () => {
      const option = parseArgumentsToProps('arguments', { title: 'title' })
      expect(option.message).equal('arguments')
      expect(option.title).equal('title')
      expect(typeof option.callback).equal('undefined')
    })
  })

  describe('createDialog 创建一个 Alert 窗口', () => {
    const destroy = createDialog(DialogAlert, { message: 'hello' }, { type: 'alert', messageType: 'info' })

    it('应创建一个 Alert 窗口', () => {
      expect(document.querySelectorAll('.v-dialog').length).toBe(1)
    })
    it('应创建一个遮罩层', () => {
      expect(document.querySelectorAll('.v-dialog-overlay').length).toBe(1)
    })
    it('已打开窗口列表中应存在一个配置项', () => {
      expect(opening.value.length).toBe(1)
    })
    it('配置项中应存在窗口类型与消息类型信息', () => {
      const first = opening.value[0]

      expect(first.type).equal('alert')
      expect(first.messageType).equal('info')
    })
    it('返回结果应为一个函数', () => {
      expect(typeof destroy).equal('function')
    })
    it('执行该返回函数，应销毁窗口', () => {
      destroy()

      setTimeout(() => {
        expect(document.querySelectorAll('.v-dialog').length).toBe(0)
        expect(document.querySelectorAll('.v-dialog-overlay').length).toBe(0)
      }, 1000)
    })
  })
})
