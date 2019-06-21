import '@/assets/css/main.scss'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import AwsIot from '@/common/AwsIot.js'
import _ from 'lodash'
import VueMeta from 'vue-meta'
// import Vuetify from 'vuetify'

Vue.use(VueMeta)
// Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.$AwsIot = AwsIot
Vue.prototype.$_ = _

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
;
