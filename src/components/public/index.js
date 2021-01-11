import Vue from 'vue';

const req = require.context('.', true, /\.vue$/);

req.keys().forEach((component) => {
  const cConfig = req(component);
  const ctrl = cConfig.default || cConfig;
  Vue.component(ctrl.name, ctrl);
});
