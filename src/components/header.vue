<template>
  <header class="clearfix header">
    <h1 class="fl logo"><router-link to="/">Vue-component 组件库</router-link></h1>
    <ul class="nav fr clearfix">
      <li class="nav-item fl">
        <router-link active-class="active" to="/guide">指南</router-link>
      </li>
      <li class="nav-item fl">
        <router-link active-class="active" to="/comps">组件</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.header {
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 10px;
  position: fixed;
  width: 1140px;
  margin: 0 auto;
  top: 0;
  background-color: #fff;
  z-index: 99;

  .logo a {
    display: block;
    color: #333;
    font-size: 18px;
    font-weight: 700;
  }
  .nav {
    .nav-item {
      a {
        color: #1989fa;
        opacity: 0.5;
        display: block;
        padding: 0 22px;
        position: relative;
      }
      a.active {
        opacity: 1;
        color: #1989fa;
        &::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: 0;
          left: calc(50% - 15px);
          width: 30px;
          height: 2px;
          background: #409eff;
        }
      }
    }
  }
}
</style>
