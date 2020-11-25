import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
// importStoreHolder

Vue.use(Vuex);
let store = new Vuex.Store({
  getters: getters,
  modules: {
    user,
    // loadStoreHolder
  },
});
export default store;
