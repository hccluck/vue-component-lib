import packageJson from '../package.json';

import Button from './button';
import ButtonGroup from './button-group';
import Row from './row';
import Col from './col';

const components = [Button, ButtonGroup, Row, Col];

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
  Button,
};
