<template>
  <div class="baseInfo">
    <div class="detailTitle">
      {{good.title}}
    </div>
    <div class="price">
      <span class="newPrice">{{good.newPrice}}</span>
      <span class="oldPrice">{{good.oldPrice}}</span>
      <span class="discount" v-if='good.discount'>{{good.discount}}</span>
    </div>
    <div class="otherInfo">
      <span v-for="(item,index) in good.columns"
      :key='index'
      class="sales"
      >{{good.columns[index]}}</span>

    </div>
    <div class="service">
      <span class="serviceItem"
      v-for="(item,index) in good.services"
      :key='index'
      >
        <img :src="good.services[index].icon" alt="">
        <span>{{good.services[index].name}}</span>
      </span>
      
    </div>
  </div> 
</template>
<script>
export default {
  name:'DetailBaseInfo',
  data(){
    return{
      title:''
    }
  },
  props:{
    good:{
      type:Object,
      default(){
        return {}
      } 
    }
  },

}
</script>
  
<style scoped >
  .baseInfo{
    margin-top:15px;
    padding: 0 8px 5px 8px ;
    /* height: 300px; */
    border-bottom: 5px solid rgba(100,100,100,.1);
  }
  .detailTitle{
    color: #222;
    /* width: 95%; */
    text-shadow: 0 0 black;
    background-color:white;
  }
  .price{
    margin-top: 10px;
  }
  .newPrice{
    font-size: 24px;
    color: var(--color-high-text);
  }
  .oldPrice{
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
    color: #999999;
  }
  .discount{
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;
    position: relative;
    top: -8px;
  }
  .otherInfo{
    display: flex;
    justify-content:space-between;
    margin-top: 15px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    padding-bottom: 5px;
  }
  .otherInfo span{
    color: #999999;
    font-size: 13px;
    
  }
  .service{
    display: flex;
    justify-content:space-between;
    height: 60px;
  }
  .serviceItem{
    align-self:center;
  }
  .serviceItem img{
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;
  }
  .serviceItem span{
    font-size: 13px;
    
  }

</style>