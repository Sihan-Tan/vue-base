let state = {
  count: 0
};
let mutations = {
  increment: function increment(state) {
    state.count++;
  }
};
let actions = {
  act_increment: function act_increment(ctx) {
    ctx.commit('increment');
  }
};
export default {
  namespace: true,
  state: state,
  mutations: mutations,
  actions: actions
};