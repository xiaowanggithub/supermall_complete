<template>
  <div id="app">
    <!-- <div class="test-viewport">测试转换</div> -->
    <keep-alive exclude="Detail ">
      <router-view></router-view>
    </keep-alive>
    
    <mainTabBar class="mainTabBar"></mainTabBar>
    
  </div>
</template>

<script>
import mainTabBar from './components/content/mainTabBar/mainTabBar'

 

export default {
  name: 'App',
  components: {
    mainTabBar,
  },
  data(){
    return {
     
    }
  },

}
</script>

<style>
  @import './assets/css/base.css';
  .mainTabBar{
    z-index: 10;
  }
  .test-viewport {
  width: 750px;
  height: 100px;
  font-size: 40px;
  text-align: center;
  line-height: 100px;
  background: #13b5b1;
}
</style>
