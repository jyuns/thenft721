import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { path: '/collections' }
  },

  // collections
  {
    path: '/collections',
    name: 'collections',
    component: () => import('../views/collections'),
  },

  {
    path: '/collections/create',
    component: () => import('../views/collections.update'),
  },

  {
    path: '/collections/update/:id',
    component: () => import('../views/collections.update'),
  },

  // partners
  {
    path: '/partners',
    name: 'partners',
    component: () => import('../views/partners'),
  },

  {
    path: '/partners/create',
    component: () => import('../views/partners.update'),
  },

  {
    path: '/partners/update/:id',
    component: () => import('../views/partners.update'),
  },  

  // events
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/events'),
  },

  {
    path: '/events/create',
    component: () => import('../views/events.update'),
  },

  {
    path: '/events/update/:id',
    component: () => import('../views/events.update'),
  },  

  // news
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/news'),
  },

  {
    path: '/news/create',
    component: () => import('../views/news.update'),
  },

  {
    path: '/news/update/:id',
    component: () => import('../views/news.update'),
  },

  // promotion
  {
    path: '/promotions',
    name: 'promotions',
    component: () => import('../views/promotions'),
  },

  {
    path: '/promotions/create',
    component: () => import('../views/promotions.update'),
  },

  {
    path: '/promotions/update/:id',
    component: () => import('../views/promotions.update'),
  },  




]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
