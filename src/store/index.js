import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import getters from './getters';

Vue.use(Vuex);
let store = new Vuex.Store({
  getters: getters,
  modules: {
    user
  }
});
export default store;
