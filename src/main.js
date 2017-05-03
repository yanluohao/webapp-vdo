// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
// import axios from 'axios'
import index from "./components/index/index.vue";
import search from "./components/search/search.vue";

Vue.config.productionTip = false;
Vue.use(Router);
// Vue.prototype.$http=axios;

const router=new Router({
  routes:[
    {path:'/',component:index},
    {path:'',component:index},
    {path:"/search",component:search}
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
