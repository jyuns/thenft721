import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const event = require('./modules/event.store');

export default new Vuex.Store({
  modules: {
    event: event,
  }
})