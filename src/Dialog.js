import Vue from 'vue'
import Container from './Container'

let pool

/**
 * Singleton mode
 *
 * @export
 * @returns
 */
export function getContainer () {
  if (pool) {
    return pool
  } else {
    const DialogContainer = Vue.extend(Container)
    pool = new DialogContainer()
    // document.body.appendChild(container.$mount().$el)
    pool.$mount(document.body.appendChild(document.createElement('div')))
    return pool
  }
}
