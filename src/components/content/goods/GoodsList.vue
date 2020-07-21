<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" 
    :key='index'
    :goodsItem='item'
    @homeGoodsImageLoad='homeGoodsImageLoad'
    @detailGoodsImageLoad='detailGoodsImageLoad'></goods-list-item>
    
  </div>
</template>
<script>
import GoodsListItem from '../goods/GoodsListItem'

export default {
  name:'GoodsList',
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  methods:{
    homeGoodsImageLoad(){
      this.$emit('homeGoodsImageLoad')
    },
    detailGoodsImageLoad(){
      this.$emit('detailGoodsImageLoad')
    }
  }
}
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    /* flex-wrap 属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向
    wrap根据宽度来排放元素。 */
    justify-content: space-around;
    /* justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。
    space-around项目位于各行之前、之间、之后都留有空白的容器内。 */
  }
</style>