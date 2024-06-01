// import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import { textTruncate } from '@/utils/helper'
import { parseArguments } from '@/utils/options'

describe('v-dialogs 核心模块', () => {
  it('textTruncate(text, 10) 函数的文本切割结果应为 "这是一段用于演示的文..."', () => {
    const title = '这是一段用于演示的文本内容'
    expect(textTruncate(title, 10)).equal('这是一段用于演示的文...')
  })
  it('textTruncate(undefined, 10) 结果应为 "" 空字符串', () => {
    expect(textTruncate(undefined, 10)).equal('')
  })

  it('argumentsParse([message, callback, option]) 返回结果应一一对应属性', () => {
    const option = parseArguments(['arguments', () => {}, { title: 'title' }])
    expect(option.message).equal('arguments')
    expect(option.title).equal('title')
    expect(typeof option.callback).equal('function')
  })
  it('argumentsParse([message, option]) 返回结果应一一对应属性', () => {
    const option = parseArguments(['arguments', { title: 'title' }])
    expect(option.message).equal('arguments')
    expect(option.title).equal('title')
    expect(typeof option.callback).equal('undefined')
  })
})
