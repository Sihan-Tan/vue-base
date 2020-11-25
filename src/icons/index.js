import Vue from 'vue';
import SvgIcon from '@/components/public/SvgIcon';
console.log(SvgIcon)
Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
