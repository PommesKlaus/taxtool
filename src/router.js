import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:versionId',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/:versionId/localTax/differences',
      name: 'localTaxDifferences',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/LocalTax/Differences.vue')
    }
  ]
})
