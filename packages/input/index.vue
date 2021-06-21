<template>
  <div class="about">
    <input :type="typeInput" @change="inputChange" />
  </div>
</template>

<script>
export default {
  props: {
    typeInput: String,
  },
  methods: {
    inputChange(val) {
      this.$emit('change', val);
    },
  },
};
</script>

<style lang="less" scoped>
.about {
  background: #f00;
}
</style>
