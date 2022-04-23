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
        path: '/',
        name: 'Collection',
        component: () => import('../views/main/CollectionSection.vue'),
      },

      {
        path: 'event',
        name: 'Event',
        component: () => import('../views/main/EventSection.vue'),
      },
    ]
  },

  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/auth/index'),

    children: [
      {
        path: 'signin',
        name: 'Signin',
        component: () => import('../views/auth/signinSection.vue'),
      },

      {
        path: 'signup',
        name: 'Signup',
        component: () => import('../views/auth/signupSection.vue'),
      },

      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/auth/profileSection.vue'),
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
