import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const event = require('./modules/event.store');
const collection = require('./modules/collection.store');
const search = require('./modules/search.store');

export default new Vuex.Store({
  modules: {
    collection: collection,
    event: event,
    search: search,
  }
})