import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const instance = require('./utils/axios.util');
Vue.prototype.$axios = instance;

import { BootstrapVue } from 'bootstrap-vue';
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
