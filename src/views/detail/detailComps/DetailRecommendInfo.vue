<template>
  <div>
    <!-- <p>{{recommendList}}</p> -->
    <goods-list :goods='recommendList'
    @detailGoodsImageLoad='detailGoodsImageLoad'></goods-list>
  </div>
</template>
<script>
import GoodsList from '@/components/content/goods/GoodsList'

export default {
  name:'DetailRecommendInfo',
  components:{
    GoodsList
  },
  data(){
    return {
      // recommendList:[]
    }
  },
  props:{
    recommendList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    detailGoodsImageLoad(){
      this.$emit('detailGoodsImageLoad')
      // console.log(this.$refs.scroll.scroll.refresh());
    },
  }
}
</script>
  
<style scoped>
  
</style>