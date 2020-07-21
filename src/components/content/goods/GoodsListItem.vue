<template>
  <div class="goods-item" @click="itemClick" >
    <img v-lazy="showImg" alt="" @load="homeGoodsImageLoad "> 
     <!-- <p>{{goodsItem}}8</p> -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem:{
      type:Object,
      default(){
        return{}
      }
    }
  },
  mounted(){
    // console.log('kk');
  },
  computed:{
    showImg(){
      // return this.goodsItem.show.img || this.goodsItem.image
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    homeGoodsImageLoad(){
      if(this.$route.path.indexOf('/home')!=-1){
        this.$emit('homeGoodsImageLoad')
        // console.log('yes');
      }
      else if(this.$route.path.indexOf('/detail')!=-1){
        this.$emit('detailGoodsImageLoad')
      }
      // console.log(this.$route.path.indexOf('/home')!=-1);
      // console.log(this.$route.path);
      
    },
    itemClick(){
      this.$router.push('/detail/'+this.goodsItem.iid)
      // console.log(this.$route.path);
      
    },

    
  }
}
</script>
  
<style scoped>
  .goods-item{
    position: relative;
    width: 48%;
    padding-bottom: 40px;
   
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    /* 显示省略符号来代表被修剪的文本。 */
    text-overflow: ellipsis;
    /* 这个属性声明建立布局过程中如何处理元素中的空白符。nowrap
    文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。和上一标签共同作用 */
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
  }
</style>