import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import store from '../store'

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

router.beforeEach(async (to, from, next) => {
  let login = await store.dispatch('auth/AUTH')
  let path = to.path

  //! 추후 로직 추가 필요
  if(login) {
    if(path == '/auth/signin') next('/')
    else if(path == '/auth/signup') next('/')
    else next()
  } else next()

})

export default router
