import VueRouter from 'vue-router';
import Vue from 'vue';
import Index from '@/views/index.vue';
// importRouteHolder

Vue.use(VueRouter);
let router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    // loadRouteHolder
  ],
});
export default router;
