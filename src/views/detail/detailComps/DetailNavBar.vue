<template>
  <div>
    <nav-bar class="navBar">
      <div class="left" slot="left" @click="leftClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div class="center" slot='center'>
         <div 
          v-for="(item,index) in titles" 
          :key='index'
          class="itemTitle"
          @click="itemClick(index)"
          :class="{activation:index===currentIndex}"
          >{{item}}
          </div>
      </div>
     
    </nav-bar>
  </div>
</template>
<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
  name:'DetailNavBar',
  components:{
    NavBar,
  },
  props:{
    // index:{
    //   type:Number,
    //   default(){
    //     return 0
    //   }
    // }
  },
  data(){
    return{
       titles: ['商品', '参数', '评论', '推荐'],
       currentIndex:0,
      //  isActivation:true,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('itemClick',index)
      
    },
    leftClick(){
      this.$router.back()
    }
  }

}
</script>
  
<style scoped>
  .center{
    display: flex;
    font-size: 14px;
  }
  .itemTitle{
    flex: 1;
  }
  .activation{
    color: var(--color-high-text);
  }
  .left img{
    margin-top:11px
  }
</style>