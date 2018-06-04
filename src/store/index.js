import Vue from 'vue'
import Vuex from 'vuex'

import diagrams from './modules/diagrams'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    diagrams
  }
})
