<template>

<div id='home'>
  <!-- 顶部导航栏 -->
  <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
  <tab-control ref="tabControl1" 
    :titles="['流行', '新款', '精选']"
      @tabClick='tabClick'
      class="tabControl" v-show="isFixed"
      ></tab-control>
  <scroll ref="scroll"
          :probe-type='3'
          class="content"
          @getPosition='contentScroll'
          :pull-up-load='true'
          @pullUp='loadMore'>
          <!-- 记得加v-bind否则默认传入的是字符串而不是变量 -->
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper @imageLoad='imageLoad'> </swiper>
    </div>
    <!-- 推荐展示 -->
    <recommend-view :recommends='recommends'></recommend-view>
    <!-- 每周推荐 -->
    <week-fashion></week-fashion>
    <!-- 分类标签 -->
    <tab-control ref="tabControl2" 
    :titles="['流行', '新款', '精选']"
      @tabClick='tabClick'
      ></tab-control>
  
    <goods-list :goods="showGoods"
    @homeGoodsImageLoad='homeGoodsImageLoad'
    ></goods-list>
  </scroll>
  <back-top @click.native ="backTop" v-show='isShow'></back-top>
  <!-- 监听子组件back-top的根元素的点击事件 -->
</div>
</template>
<script>
import swiper from '@/views/home/homeComps/homeSwiper'
import NavBar from '@/components/common/navbar/NavBar'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'
import {debounce} from "@/common/utils";


import {getHomeMultidata, getHomeGoods} from '@/network/home'

import TabControl from '@/components/content/tabControl/tabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import RecommendView from '@/views/home/homeComps/recommendView';
import WeekFashion from '../home/homeComps/weekFashion'

export default {
  name:'Home',
  components:{
    swiper,
    NavBar,
    Scroll,
    BackTop,
    TabControl,
    GoodsList,
    RecommendView,
    // 这里注册的名字就是上面组件的名字但是NavBar要写成nav-bar，不支持大写
    WeekFashion,
  
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShow:false,
      tabOffsetTop:0,
      isFixed:false,
      saveY:0
    }
  },

  created(){
    // 1.请求多个数据
    this.HgetHomeMultidata()
    // 有this才是调用methods的函数，如果没有this则是调用的import的getHomeMultidata

    // 2.请求商品数据
    this.HgetHomeGoods('pop')
    this.HgetHomeGoods('new')
    this.HgetHomeGoods('sell')
    
  },
  mounted(){
      
      //   this.$bus.$on('goodsImageLoad',() =>{
      //   // console.log(this.$refs.tabControl1);
      //   // console.log('接受');
      //   // this.$refs.scroll.scroll.refresh()
      // })
    
    //       this.$nextTick(function(){ 
    //         for(let i=0; i<30 ;i++){
    // 　      　console.log(this.$refs.scroll);  
    //         }　　
    // 　　　}) 
      
 
    // 1.图片加载完成的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 50)
      // this.$bus.$on('itemImageLoad', () => {
      //   refresh()
      // })
      // 监听item中图片加载完成
      
      // fun必须传一个函数
      // const refresh = debounce(this.$refs.scroll.scroll.refresh(), 50)
      // this.$bus.$on('itemImageLoad', () => {
      // //   // refresh()
      // //   // this.$refs.scroll.scroll.refresh()
      //   console.log(this.$refs.scroll);
      // })

  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    },
    // destroyed() {
    //     console.log('destroyed');
    //   },
  },
  methods:{
    // 事件监听相关函数
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    //监听滚动条
    contentScroll(position){
      // 1.监听滚动条，选择返回顶部是否显示
      this.isShow = (-position.y)>1000
      // 2.如果滚动超过tab-control的offsetTop就吸顶（position：fixed）
      this.isFixed = (-position.y)>this.tabOffsetTop
    },
    backTop(){
      this.$refs.scroll.scrollTo(0,0)
      //通过refs访问scroll子组件，通过该方式访问子组件之后，可以调用子组件的变量或函数
      
    },
    imageLoad(){
      // 获取tabContent的offsetTop
      // 所有的组件都有一个属性$el,用于获取组件中的元素
      
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 上拉加载更多
    loadMore(currentType){
      this.HgetHomeGoods(this.currentType)
      // console.log('上拉加载更多')
      
    },
    // 监听goods图片加载完成
    homeGoodsImageLoad(){
      this.$refs.scroll.scroll.refresh()
      // console.log(this.$refs.scroll.scroll.refresh());
    },
    // 网络请求相关函数
    HgetHomeMultidata(){
      getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list;
      // res.banner是请求回来的轮播图数据，保存在data的banners中
      // banners用来保存对象否则当函数执行完毕，res会被垃圾处理机制处理
      this.recommends = res.data.recommend.list;
    })
    },
    HgetHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
        let dataList = res.data.list;
        for(let i of dataList){
          this.goods[type].list.push(i)
          // type加[]是因为type是变量需要用[]框起来
        }
        this.goods[type].page += 1
        // setTimeout(() => {
        //   this.$refs.scroll.scroll.finishPullUp()
        // },500)
        this.$refs.scroll.scroll.finishPullUp()

        // 调用finishPullUp()告诉scroll加载结束，如果不调用这个方法只能加载一次
    })
    },
    
  
  },
  destroyed(){
    console.log('destroyed')
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y

  },
}
</script>
 

<style scoped>
  .home-bar{
    background-color:  var(--color-tint);
    /* 使用base.css中定义的变量 */
    color: white;
    position:fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
  }
  #home{
    /* padding-top: 44px; */
    height: 100vm;
    /* vm是视口单位 */
  }

  /* 必须要给组件设置高度 */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tabControl{
    /* padding-top: 44px; */
    position: relative;
    z-index: 10;
    top: 44px;
    background-color: white;
  }
</style>