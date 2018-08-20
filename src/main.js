import Vue from 'vue'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCompass, faAngleRight, faBalanceScale, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './filter'
import App from './App.vue'
import router from './router'
import store from './store/'

Vue.config.productionTip = false

library.add(faCompass, faAngleRight, faBalanceScale, faBars)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$baseApiUrl = 'http://127.0.0.1:8000/graphql'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
