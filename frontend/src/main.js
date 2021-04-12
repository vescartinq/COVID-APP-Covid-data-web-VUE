import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// BOOTSTRAP
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// AXIOS
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

// BACKEND
// axios.defaults.baseURL = 'http://localhost:4000/api'; //dev
axios.defaults.baseURL = 'https://covid-app-mevn.herokuapp.com/api'; //build

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
