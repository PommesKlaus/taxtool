import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import VersionSelect from './views/VersionSelect.vue'
import VersionNew from './views/VersionNew.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'versionSelect',
      component: VersionSelect,
    },
    {
      path: '/new-version',
      name: 'versionNew',
      component: VersionNew,
    },
    {
      path: '/:versionId',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/:versionId/localgaap/differences',
      name: 'localgaapDifferences',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Localgaap/Differences.vue'),
      meta: { navCategory: 'localgaap' },
    },
    {
      path: '/:versionId/localgaap/differences/:oar',
      name: 'localgaapDifferenceDetail',
      component: () => import(/* webpackChunkName: "about" */ './views/Localgaap/DifferenceDetail.vue'),
      meta: { navCategory: 'localgaap' },
    },
    {
      path: '/:versionId/localgaap/new-difference',
      name: 'localgaapDifferenceNew',
      component: () => import(/* webpackChunkName: "about" */ './views/Localgaap/DifferenceDetail.vue'),
      meta: { navCategory: 'localgaap' },
    },
  ]
})
