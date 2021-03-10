import Vue from 'vue'
import App from './App.vue'
import VueMask from 'v-mask'
import router from './router/index.js'

Vue.use(VueMask);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
