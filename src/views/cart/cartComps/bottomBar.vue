<template>
  <div class="check-wrapper">
    <div class="check-all">
      <check-button class="button"
      @click.native="checkClick"
      :class="{'active':isActive}"></check-button>
    </div>
    <span class="select-all">全选</span>
    <span class="total">合计:￥{{this.total}}</span>
    <span class="pay">去结算({{this.price}})</span>
  </div>
</template>
<script>
import CheckButton from '@/components/content/checkButton/CheckButton';
import {mapGetters} from 'vuex'
import Bus from './bus'


export default {
  name:'BottomBar',
  components:{
    CheckButton,
  },
  data(){
    return{
      List:0,
      total:0,
      price:0,
      isActive:true,
    }
  },
  mounted(){
          // 监听事件总线
      Bus.$on('checkButtonClick', () => {
        // console.log(this.changeChecked);
        this.$nextTick(() => {
          this.price = this.getPrice(this.cartList)
          this.total = this.getTotal(this.cartList)
          this.inspectAllCheck()
        })

      })
    
  },
  methods:{
    // 检查商品中是否有未选中的商品，如果有就取消全选按钮
    inspectAllCheck(){
      let change = 0;
      for(let item of this.cartList){
        if(item.checked == false){
          // 当前列表有不选中的情况
          this.isActive = false
          // 有一个不被选中change就记录一次
          
        }
        if(item.checked == true){
          change += 1
          if(change == this.cartList.length){
            this.isActive = true
          }
        }
        // 如果全部被选中，全选按钮选中
        
      } 
    },
    checkClick(){
      this.isActive = !this.isActive
      if(this.isActive){
        // 重新计算商品价格和结算数量
        for(let item of this.cartList){
        //  如果全选按钮为true所有商品选中
          item.checked = true
        }
        // 如果全选按钮为true且所有商品被选中，重新计算商品价格和结算数量
        this.price = this.getPrice(this.cartList)
        this.total = this.getTotal(this.cartList)
      }else{
        for(let item of this.cartList){
          //  如果全选按钮为false所有商品不选中
          item.checked = false
        }
        // 如果全选按钮为false且所有商品不被选中，商品价格和结算数量归零
        this.price = 0
        this.total = 0
      }
    },
    getTotal(cartList){
      let sum = 0
      if(cartList){
        for(let item of cartList){
          // console.log(item);
          if(item.checked == true){
            sum = Number(item.newPrice*item.count) + Number(sum) 
            // console.log(totle.constructor==Number);
            sum = Number(sum).toFixed(2)
          }
        }
        return sum
      }
    
    },

    getPrice(cartList){
      let sum = 0
      if(cartList){
        for(let item of cartList){
          // console.log(item);
          if(item.checked == true){
            sum += 1
          }
        }
        return sum
      }
    
    },
  },
  computed:{
    ...mapGetters(['cartLength','cartList',]),
    // 计算合计价格
   
  },
  watch: {
    // 监测购物车数组变化，每当有变化都重新计算价格
    // cartList : function(){
    //   this.total = this.getTotal()
    //   console.log(this.cartList);
      
    // }
  },
  activated : function () {
    this.price = this.getPrice(this.cartList)
    this.total = this.getTotal(this.cartList)
    
  }
   
  
}
</script>
  
<style scoped>
  .check-wrapper{
    position: fixed;
    bottom: 49px;
    right: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background-color:#eee;
  }
  .check-all{
    width: 5px;
    float: left;
    
  }
  .button{
    position: relative;
    top: 12px;
    margin-left: 10px;
    background-color: white;
  }
  .pay{
    float: right;
    width: 100px;
    background-color: orangered;
    height: 44px;
    text-align: center;
    line-height: 44px;
    color: white;
  }
  .select-all{
    position: relative;
    top: 13px;
    margin-left: 35px;
    font-size: 14px;
    color: #888;
  }
  .total{
    position: relative;
    top: 13px;
    margin-left: 25px;
    font-size: 15px;
    color: #666;
  }
  .active{
    background-color: var(--color-tint);
    border: none;
  }
</style>