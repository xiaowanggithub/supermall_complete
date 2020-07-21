<template>
  <div class="check-button" 
  :class="{'isActive':product.checked }"
  @click="checkClick"
  >
    <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
export default {
  name:'CheckButton',
  props:{
    product:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
  methods:{
    checkClick(){
      this.isActive = this.product.checked
      // console.log(this.product.checked);
    }
  }
}
</script>
  
<style scoped>
  .check-button{
      position: relative;
      top:43px;
      margin: 0;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      border: 2px solid rgb(223, 223, 223);
      cursor: pointer;
      
  }
  .isActive{
    background-color: var(--color-tint);
    border: none;
  }
  
  img{
    border-radius: 50%;
    width: 17px;
    height: 17px;
    /* line-height:100% */
  }
</style>