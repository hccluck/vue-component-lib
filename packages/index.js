import packageJson from '../package.json';

import Input from './input/index.vue';
import Button from './button/index.vue';

const components = [Input, Button];

// eslint-disable-next-line no-unused-vars
const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: packageJson.version,
  install,
  Input,
  Button,
};
