// import { mount } from '@vue/test-utils'
// import { expect } from 'chai'

// import Container from '@/Container'
// import { generateMaskOption } from '@/utils/options'

// describe('v-dialogs Mask 模式', () => {
//   describe('不传递任何参数', () => {
//     const w = mount(Container, {
//       attachTo: document.body
//     })
//     w.vm.addDialog(generateMaskOption())

//     it('显示文本内容应为 `数据加载中……`', () => {
//       expect(w.find('.v-dialog-mask__content').text()).to.equal('数据加载中……')
//     })

//     it('显示时针旋转效果的动画图标', () => {
//       expect(w.find('.v-dialog-timer').exists()).equal(true)
//       w.destroy()
//     })
//   })

//   describe('界面定制化', () => {
//     const w = mount(Container, {
//       attachTo: document.body
//     })
//     w.vm.addDialog(generateMaskOption('Data loading...', {
//       backdrop: false
//     }))

//     it('显示文本应为 `Data loading...`', () => {
//       expect(w.find('.v-dialog-mask__content').text()).to.equal('Data loading...')
//     })
//     it('`backdrop` 设置为 false，遮罩依然显示', () => {
//       expect(w.find('.v-dialog-overlay').exists()).equal(true)
//       w.destroy()
//     })
//   })
// })
