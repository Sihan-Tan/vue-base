let getters = {
  count: function count(state) {
    return state.welcome.count;
  },
  table: function table(state) {
    return state.table.table;
  }
};
export default getters;