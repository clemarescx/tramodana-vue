import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FlowView from '@/components/FlowView'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/flowview',
    name: 'FlowView',
    component: FlowView
  }]
})
