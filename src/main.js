import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import App from './App.vue'
import router from './router'
import store from './store'
import navigation from '@/components/Nav'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  navigation,
  render: h => h(App)
}).$mount('#app')
