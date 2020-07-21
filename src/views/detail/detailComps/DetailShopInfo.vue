<template>
  <div class="detailShopInfo">
    <div class="shopTop">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="shopMiddle">
      <div class="shop-middle-left">
          <div class="infoSells">
          <div class="sells-count">{{getSells}}</div>
          <div class="sells-text">总销量</div>
        </div>

        <div class="infoGoodsCount">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      
      <div class="shop-middle-right">
        <table class="shop-score">
          <tr v-for="(item,index) in shop.score"
          :key='index'>
            <td>{{shop.score[index].name}}</td>
            <td :class="{'showRedColor':'red'===showColor(index),
            'showGreendColor':'green'===showColor(index)}"
            >{{shop.score[index].score}}</td>
            <td><span
            :class="{'showSpanRedColor':'red'===showColor(index),
            'showSpanGreenColor':'green'===showColor(index)}" >{{getScore(index)}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shopBottom">
      <div class="enterShop">进店逛逛</div>
    </div>
  </div>
</template>
<script>
export default {
  name:'DetailShopInfo',
  data(){
    return{
    }
  },
  props:{
    shop:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    getSells:function(){
      const result = this.shop.sells/10000
      return result. toFixed(1)+'万'
    },
    getScore:function(){
      return function(index){
        this.isBetter = this.shop.score[index].isBetter
        // console.log(this.shop);
        // const isBetter = true
        if(this.isBetter){
          return '高'
        }else{
          return '低'
        }
      }
    }
  },
  methods:{
    showColor:function(index){
      const isBatter = this.shop.score[index].isBetter
      if (isBatter){
        return 'red'
      }else{
        return 'green'
      }
    }
  }
}
</script>
  
<style scoped>
  .detailShopInfo{
    padding: 25px 8px;
    border-bottom: 5px solid #f2f5f8;
    
    color: #333333;
  }
  .shopTop img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.1);
    display: inline;
  }
  .shopTop span{
    margin-left: 10px;
    font-size: 16px;
    color: #898989;
    position: relative;
    top: -17px;
  }
  .shopMiddle{
    display: flex;
    padding-top: 15px;
    color: #333333;
  }
  /* 店铺信息左边 */
  .shop-middle-left{
    flex: 1;
    display: flex;
    border-right: solid 1px rgba(0,0,0,.1);;
  }
   /* 宝贝销量 */
  .infoSells{
    flex: 1;
  }
  .sells-count{
    font-size: 18px;
    text-align: center;
    margin-top: 15px;
  }
  .sells-text{
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
  }
  /* =========================== */
   /* 宝贝数量 */
  .infoGoodsCount{
   flex: 1;
   margin-top: 15px;
  }
  .goods-count{
    font-size: 18px;
    text-align: center;
  }
  .goods-text{
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
  }
  /* ====================================== */
  /* 店铺信息右边 */
  .shop-middle-right{
    flex: 1;
    font-size: 13px;
    color: #333;
  }
  .shop-score{
    margin-left: 30px;
  }
  .shop-score td{
    padding: 5px 0;
    padding-right: 9px;
    
  }
  /* 动态绑定评分颜色 */
  .showRedColor{
   color: red;
  }
  .showGreendColor{
    color: green;
  }
  .showSpanRedColor{
    color: white;
    background-color: red;
  }
  .showSpanGreenColor{
    color: white;
    background-color: green;
  }
  /* 进店逛逛 */
  .enterShop{
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
  .shopBottom{
    text-align: center;
  }
</style>