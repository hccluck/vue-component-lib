import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import components from '../dist/vue-component-lib.umd.min';
console.log(components);
Vue.config.productionTip = false;

Vue.use(components);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
