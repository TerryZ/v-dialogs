import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./ExamplesIndex.vue'),
    children: [
      { path: '/global', component: () => import('./ExamplesGlobal.vue') },
      { path: '/alert', component: () => import('./ExamplesAlert.vue') },
      { path: '/message', component: () => import('./ExamplesMessage.vue') },
      { path: '/toast', component: () => import('./ExamplesToast.vue') },
      { path: '/mask', component: () => import('./ExamplesMask.vue') },
      { path: '/modal', component: () => import('./ExamplesModal.vue') },
      { path: '/drawer', component: () => import('./ExamplesDrawer.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { router }
