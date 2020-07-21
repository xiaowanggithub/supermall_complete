<template>
  <div class="product-item">
    
    <div class="selector">
      <div>
        <check-button :product='product' 
        @click.native='checkedChange'></check-button>
        <!-- <CheckButton @checkBtnClick="checkedChange" v-model="product.checked"></CheckButton> -->
      </div>
    </div>
    <div class="product-img">
      <img :src="product.imgURL" alt="">
    </div>
    <div class="product-detail">
      <div class="productTitle">{{product.title}}</div>
      <div class="productDesc">商品描述：{{product.desc}}</div>
      <div class="item-bottom">
        <div class="price">￥{{product.newPrice}}</div>
        <div class="count">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from '@/components/content/checkButton/CheckButton';
import Bus from './bus'

export default {
  name:'ProductItem',
  props:{
    product:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  components:{
    CheckButton,
    
  },
  methods:{
        // 测试事件总线
    checkButtonClick(){// 向事件总线发送按钮被点击事件
      Bus.$emit('checkButtonClick');
    },
    checkedChange: function () {
      // this.product.checked = !this.product.checked;
      // console.log(this.product.checked);
      this.$store.dispatch('changeChecked',this.product)
      // 一旦按钮被点击向事件总线里发送购物车按钮被点击事件
      this.checkButtonClick()
    }
  }
}
</script>
  
<style scoped>
  .icon{

  }
  .product-img img{
    width: 80px;
    height: 110px;
    border-radius: 5px;
  }
  .product-item{
    display: flex;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .selector{
    flex: 0.2;
  }
  .product-img{
    flex: 0.6;
  }
  .product-detail{
    flex: 1.7;
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .productTitle{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 95%;
  }
  .productDesc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #666;
    margin-top: 15px;
    width: 95%;
  }
  .item-bottom{
    display: flex;
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    justify-content:space-between;
  }
  .price{
    color: orangered;
  }
  .count{
    position: relative;
    right: 10px;
  }
</style>