import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/main/index'),

    children: [
      {
        path: '',
        name: 'Event',
        component: () => import('../views/main/EventSection.vue'),
      },

      {
        path: 'ranking',
        name: 'Ranking',
        component: () => import('../views/main/RankingSection.vue'),
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
