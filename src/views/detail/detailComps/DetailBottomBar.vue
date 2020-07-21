<template>
  <div class="detail-bottom-bar">
    <div class="bar-left">
      <div class="service">
        <i class="icon"></i>
        <span>客服</span>
      </div>

      <div class="shop">
        <i class="icon"></i>
        <span>店铺</span>
      </div>

      <div class="collection">
        <i class="icon"></i>
        <span>收藏</span>
      </div>
    </div>
    
    <div class="bar-right">
      <div class="cart" @click="cartClick">加入购物车</div>
      <div class="buy" @click="buyClick">购买</div>
    </div>  
  </div>
</template>
<script>
export default {
  name:'DetailBottomBar',
  methods:{
    cartClick(){
      this.$emit('cartClick')
    },
    buyClick(){
      this.$emit('buyClick')
    }
  }
}
</script>
  
<style scoped>
 

  .detail-bottom-bar{
    height: 58px;
    background-color:white;
    z-index: 12;
    /* position: relative; */
    /* position: fixed;
    bottom: 0;
    left: 0;
    right: 0;  */
    display: flex;
    width: 100%;   
  }
  .bar-left {
    flex: 1;
    display: flex;
    font-size: 14px;
    color: #666666;
  }
  .bar-left div{
    flex: 1;
    text-align: center;
    /* margin-top: 10px; */
    /* margin-bottom: 3px; */
  }
  .bar-right{
    flex: 1;
    display: flex;
  }
  .bar-right div{
    
    line-height: 58px;
    text-align: center;
  }
  .cart{
    flex: 1.2;
    background-color: #ffe817;
    color: #333;
  }
  .buy{
    flex: 1;
    background-color: #f69;
    color: white;
  }
  .icon{
    display: block;
    width: 23px;
    height: 23px;
    margin: 8px auto 5px;
    background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .service i{
    background-position:0 -54px;
  }
  .shop i{
    background-position:0 -102px;
  }
  .collection i{
    background-position:0 2px;
  }
</style>