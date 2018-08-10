import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCompass, faAngleRight, faBalanceScale, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store/'

Vue.config.productionTip = false

library.add(faCompass, faAngleRight, faBalanceScale, faBars)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
