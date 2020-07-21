<template>
  <div class="detailSwiper">
    <van-swipe class="van-swipe" :autoplay="3000">
      <van-swipe-item v-for="(item,index) in images" :key='index'>
        <img :src="item" alt="">
        <!-- <p>xxx</p> -->
        
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import 'vant/lib/index.css';
// 要记得引入vant的样式

Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
  name:'DetailSwiper',
  data(){
    return{
      
    }
  },
  props:{
    images:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swipe,
    SwipeItem
  },
  created(){
    // console.log(images);
    
    // for(let i of this.images){
    //   console.log(i);
    // }
    
    
  }
}
</script>
  
<style scoped>
/* .detailSwiper .van-swipe-item {
  height: 10rem;
  width: 100%;
  line-height: 50px;
  text-align: center;
  background-color: #39a9ed;
} */
.van-swipe{
  height: 250px;
  overflow: hidden;
}
img{
  width: 100%;
  
}
</style>