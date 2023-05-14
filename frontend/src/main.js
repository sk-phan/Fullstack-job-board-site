import Vue from 'vue'
import App from './App.vue'
import vuetify from './vuetify'
import router from './router'
import store from './store'

import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
