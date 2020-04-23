import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from 'bootstrap-vue';

import router from './router'
import store from './store'
import Navbar from "./components/Navbar";

import VModal from 'vue-js-modal'


import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import {required, alpha_num, min, image, ext} from 'vee-validate/dist/rules';
import {setInteractionMode} from 'vee-validate';

setInteractionMode('eager');


Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(VModal, {dialog: true})

Vue.component('app-navbar', Navbar)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
    ...required,
    message: 'This field is required'
});
extend('alpha_num', alpha_num)
extend('min', min)
extend('ext', ext)
extend('image', image)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
