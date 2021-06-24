<template>
  <div class="page-container page-component">
    <div class="nav">
      <side-nav :data="list" base="/guide/"></side-nav>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navConfig from '../nav.config.json';

export default {
  name: 'guide',
  data() {
    return {};
  },
  computed: {
    list: function () {
      return navConfig.index.slice(0, 1);
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
.content {
  padding-left: 270px;
  padding-bottom: 100px;
  box-sizing: border-box;
}
</style>
