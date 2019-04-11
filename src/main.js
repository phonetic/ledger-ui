import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  data: {
    endpoint: 'asdf'
  },
  router,
  render: h => h(App)
}).$mount('#app')