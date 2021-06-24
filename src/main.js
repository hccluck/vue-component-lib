import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './route.config.js';
import App from './App.vue';

import demoBlock from './components/demo-block';
import MainHeader from './components/header.vue';
import SideNav from './components/side-nav';

import './assets/css/reset.css';
import './assets/css/public.css';
import './assets/css/docs.less';

// import components from '../lib/index/index.js';
// import '../lib/index/style.css';
import components from 'main/index';
import hljs from 'highlight.js';

console.log(components);

Vue.config.productionTip = false;

Vue.use(components);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);

const router = new VueRouter({
  mode: 'hash',
  routes,
});

router.afterEach(() => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  document.title = 'Vue-component';
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
