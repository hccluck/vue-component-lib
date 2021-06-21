<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'i-button',
  props: {},
};
</script>

<style lang="less" scoped>
@import url('../styles/index.less');
button {
  background: @primary-color;
  color: #fff;
  padding: 4px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
