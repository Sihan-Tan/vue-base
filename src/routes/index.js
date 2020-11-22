import VueRouter from 'vue-router';
import Vue from 'vue';
import Index from '@/views/index.vue';
Vue.use(VueRouter);
let router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  } // {
  //   path: '/welcome',
  //   name: 'Welcome',
  //   component: () =>
  //     import(/* webpackChunkName: "Welcome" */ '@/views/welcome.vue'),
  // },
  ]
});
export default router;