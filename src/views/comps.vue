<template>
  <div class="page-container page-component">
    <div class="nav">
      <side-nav :data="list" base="/comps/"></side-nav>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navConfig from '../nav.config.json';

export default {
  name: 'comps',
  data() {
    return {};
  },
  computed: {
    list: function () {
      return navConfig.index.slice(1);
    },
  },
  methods: {},
};
</script>

<style scoped>
.nav {
  width: 240px;
  position: fixed;
  top: 0;
  bottom: 0;
  margin-top: 70px;
  transition: padding-top 0.3s;
}
.container {
  padding-left: 270px;
  padding-bottom: 100px;
  box-sizing: border-box;
}
</style>
