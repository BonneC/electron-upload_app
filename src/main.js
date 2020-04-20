import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from 'bootstrap-vue';

import router from './router'
import store from './store'
import Navbar from "./components/Navbar";


Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.component('app-navbar', Navbar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
