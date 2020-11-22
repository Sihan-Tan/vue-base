import Vue from 'vue';
import Vuex from 'vuex';
import table from './modules/table';
import welcome from './modules/welcome';
import getters from './getters';
Vue.use(Vuex);
let store = new Vuex.Store({
  getters: getters,
  modules: {
    table: table,
    welcome: welcome
  }
});
export default store;