<template>
<!-- 这里是返回顶部的小图标 -->
  <div class="backTop">
    <img src="../../../assets/img/common/top.png" alt="">
  </div>
</template>
<script>
export default {
  name:'BackTop',

}
</script>
  
<style scoped>
  .backTop{
    position: fixed;
    right: 12px;
    bottom: 60px;
  }
  .backTop img{
    height: 43px;
    width: 43px;
  }
</style>