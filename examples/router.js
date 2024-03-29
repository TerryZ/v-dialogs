import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./ExamplesIndex.vue'),
    children: [
      { path: '/alert', component: () => import('./ExamplesAlert.vue') },
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
