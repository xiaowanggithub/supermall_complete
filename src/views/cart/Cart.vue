<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll>
      <product-item 
      v-for="(item,index) in cartList"
      :key='index'
      :product='item'></product-item>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
import Scroll from '@/components/common/scroll/Scroll'
import ProductItem from './cartComps/productItem'
import BottomBar from './cartComps/bottomBar'

export default {
  name:'Cart',
  components:{
    NavBar,
    Scroll,
    ProductItem,
    BottomBar,
  },
  computed:{
    // 两种语法
    ...mapGetters(['cartLength','cartList'])
    // ...mapGetters({
    //   length : 'cartLength',
    //   list : 'cartList'
    // })
  },

}
</script>
  
<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: white;
  }
  .wrapper{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* overflow: hidden; */
  }
</style>