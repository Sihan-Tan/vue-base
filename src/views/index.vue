<template>
  <div class="index">
    1324
    <svg-icon icon-class="user" />
  </div>
</template>

<script>
import { demo } from '@/api/index';

export default {
  name: 'Index',
  mounted() {
    demo();
  },
};
</script>
<style lang="less">
.index {
  color: white;
  background-image: url("~@/assets/images/123.jpg");
}
</style>
