import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: location.pathname, // Set html relative root path for gh-pages
  routes: [
    {
      path: '/',
      name: 'Main',
      component: require('@/components/Main')
    }
  ]
})
