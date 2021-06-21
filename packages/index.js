import Vue from 'vue';

import Input from './input/index.vue';
import Button from './button/index.vue';

const Components = {
  Input,
  Button,
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
