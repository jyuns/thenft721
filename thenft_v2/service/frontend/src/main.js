import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//? bootstrap settings
import { BootstrapVue } from 'bootstrap-vue';
Vue.use(BootstrapVue);

import '@/assets/styles/bootstrap.css';
import '@/assets/styles/bootstrap-vue.css';

const convert = require('./utils/convert.util');
Vue.prototype.$convert = convert;

const sort = require('./utils/sort.util');
Vue.prototype.$sort = sort;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')