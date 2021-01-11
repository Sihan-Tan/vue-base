import Vue from 'vue';
import App from '@/App.vue';
import router from '@/routes';
import store from '@/store';
import '@/assets/css/var.css';
import '@/assets/css/reset.css';
import '@/icons';
import '@/components/public';

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
