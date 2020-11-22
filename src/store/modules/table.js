let state = {
  table: 100
};
let mutations = {
  describe: function describe(state) {
    state.table--;
  }
};
let actions = {
  act_describe: function act_describe(ctx) {
    ctx.commit('describe');
  }
};
export default {
  namespace: true,
  state: state,
  mutations: mutations,
  actions: actions
};