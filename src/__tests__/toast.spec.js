// import { mount } from '@vue/test-utils'
// import { expect } from 'chai'

// import Container from '@/Container'
// import { generateToastOption } from '@/utils/options'

// describe('v-dialogs Toast 模式', () => {
//   describe('不指定任何参数', () => {
//     const w = mount(Container, {
//       attachTo: document.body
//     })
//     const option = generateToastOption()
//     w.vm.addDialog(option)

//     it('弹出默认形态窗口，信息内容为空', () => {
//       expect(w.find('.v-dialog-toast').exists()).to.equal(true)
//       expect(w.find('.v-dialog-toast__content div').text()).to.equal('')
//     })

//     it('消息类型应为 `info`', () => {
//       expect(option.messageType).to.equal('info')
//     })

//     it('显示位置应为右下角', () => {
//       expect(w.find('.v-dialog-toast.bottomRight').exists()).to.equal(true)
//     })

//     it('存在标题栏，且文本内容应为 `提示`', () => {
//       expect(w.find('.v-dialog-toast__content h3').text()).to.equal('提示')
//     })

//     it('存在图标，且为信息类型图标', () => {
//       expect(w.find('.v-dialog-toast__icon').exists()).equal(true)
//       expect(w.find('.dlg-icon-toast--info').exists()).equal(true)
//       w.destroy()
//     })
//   })

//   describe('界面定制化', () => {
//     const w = mount(Container, {
//       attachTo: document.body
//     })

//     w.vm.addDialog(generateToastOption('custom', {
//       messageType: 'warning',
//       position: 'topCenter',
//       title: false,
//       icon: false
//     }))

//     it('`title` 设置为 false，标题栏应不存在', () => {
//       expect(w.find('.v-dialog-toast__content h3').exists()).to.equal(false)
//     })

//     it('消息类型应为 `warning`', () => {
//       expect(w.find('.v-dialog-toast.toast-warning').exists()).to.equal(true)
//     })

//     it('`position` 设置为 `topCenter`，显示位置应为顶部居中位置', () => {
//       expect(w.find('.v-dialog-toast.topCenter').exists()).to.equal(true)
//     })

//     it('`icon` 设置为 false，图标区域应被关闭', () => {
//       expect(w.find('.v-dialog-toast__icon').exists()).equal(false)
//       w.destroy()
//     })
//   })

//   describe('边界值处理', () => {
//     const w = mount(Container, {
//       attachTo: document.body
//     })

//     let msg = '这是一段用于演示的文本内容这是一段用于演示的文本内容这是一段用于演示的文本内容'
//     msg += '这是一段用于演示的文本内容这是一段用于演示的文本内容这是一段用于演示的文本内容'
//     msg += '这是一段用于演示的文本内容这是一段用于演示的文本内容这是一段用于演示的文本内容'

//     w.vm.addDialog(generateToastOption(msg, {
//       title: '这是一段用于演示的文本内容这是一段用于演示的文本内容'
//     }))

//     it('`title` 设置较多文字，标题栏内容应为 `这是一段用于演示的文...`', () => {
//       expect(w.find('.v-dialog-toast__content h3').text()).equal('这是一段用于演示的文...')
//     })

//     it('不指定 `messageType`，消息类型应重置为 `info`', () => {
//       expect(w.find('.dlg-icon-toast--info').exists()).to.equal(true)
//     })

//     it('不指定 `position`，显示位置应重置为右下角', () => {
//       expect(w.find('.v-dialog-toast.bottomRight').exists()).to.equal(true)
//     })

//     it('设置内容过多时，将保留 56 个文字，并显示 `...` 符号表示文本溢出', () => {
//       let expectText = '这是一段用于演示的文本内容这是一段用于演示的文本内容这是一段用于演示的文本内容'
//       expectText += '这是一段用于演示的文本内容这是一段...'
//       expect(w.find('.v-dialog-toast__content div').text()).equal(expectText)
//       w.destroy()
//     })
//   })
// })
