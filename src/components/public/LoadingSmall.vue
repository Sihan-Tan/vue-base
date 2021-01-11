<template>
  <!--小loading，通常用于组件内局部刷新-->
  <div class="loading-v2">
    <div class="round round-1"></div>
    <div class="round round-2"></div>
    <div class="round round-3"></div>
  </div>
</template>

<script>
export default {
  name: 'loading-small',
};
</script>

<style lang="less" scoped>
@keyframes loading1 {
  from {
    background-color: #fff;
  }
  to {
    background-color: var(--themeColor);
  }
}

.loading-v2 {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 50px;
}
.round {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  animation: loading1 0.6s ease infinite;
}
.round-1 {
  margin-left: -8px;
  animation-delay: 0.1s;
}
.round-2 {
  animation-delay: 0.2s;
}
.round-3 {
  margin-left: 8px;
  animation-delay: 0.3s;
}
.loading-leave-active {
  transition: opacity 0.3s;
}
.loading-enter,
.loading-leave-to {
  opacity: 0;
}
</style>
