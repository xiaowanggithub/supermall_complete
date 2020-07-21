<template>
<!-- 当使用这个插件时，只需要将需要被滚动的内容放进<scrol></scrol>中就可以了 -->
  <!--注意！！！使用这个组件时一定要给组件<scrol></scrol>设置一个高度否则滚动不起效果 -->
  <div class="wrapper" ref="wrapper">
    <!-- wrapper一定要有高度 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  
  data() {
      return {
        scroll: null,
        message:'hhh'
      }
  },
  props:{
    probeType:{
      type:Number,
      default:1,
      // 0，1都是不监听滚动
    },
    pullUpLoad:{
      type:Boolean,
      default:false,
    }
  },
  methods:{
    scrollTo(x, y, time=500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
    refresh(){
      this.scroll && this.scroll.refresh
      console.log('refresh被调用了');
      
    },
    name(){
      console.log('xiaowang');
      
    }


  },
  mounted(){
    // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // 默认情况下在content里的元素无法监听点击，将click设置为true后可以监听点击
        probeType: this.probeType,
        // 不直接在BScroll对象里写死probeType是因为可能有时候需要监听滚动有时使用插件时不需要监听滚动
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
      this.scroll.on('scroll',(position) => {
        // console.log(position)
        this.$emit('getPosition',position)
      })
      // 3.监听上拉事件
      this.scroll.on('pullingUp',() => {
        this.$emit('pullUp')
      })
     
      
  }
  

}
</script>
  
<style scoped>
  /* .wrapper{
    height: 200px;
    background-color: red;
    overflow: hidden;
  } */
</style>