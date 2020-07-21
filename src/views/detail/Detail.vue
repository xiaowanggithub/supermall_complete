<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar"
    @itemClick='itemNavBarClick'
    ref="datailNavBar">
    </detail-nav-bar>
    <scroll class="content" ref="detailScroll" 
    @getPosition='contentScroll'
    :probeType='3'
    >
      <detail-swiper :images="topImages"></detail-swiper>
      <detail-base-info :good='good'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info ='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-params-info ref="params" :params='params'></detail-params-info>
      <detail-comment-info ref="comment" :commentInfo='commentInfo'></detail-comment-info>
      <detail-recommend-info ref="recommend" :recommend-list='recommendList'
      @detailGoodsImageLoad='imageLoad'></detail-recommend-info>
    </scroll>
    <detail-bottom-bar class="detail-bottom-bar" 
      @cartClick='cartClick'
      @buyClick='buyClick'>
    </detail-bottom-bar>
    <back-top @click.native ="backTop" v-show='isShow'></back-top>
  </div>
</template>
<script>
import DetailNavBar from './detailComps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail'
import DetailSwiper from './detailComps/DetailSwiper'
import DetailBaseInfo from './detailComps/DetailBaseInfo'
import DetailShopInfo from './detailComps/DetailShopInfo'
import Scroll from '@/components/common/scroll/Scroll'
import DetailGoodsInfo from './detailComps/DetailGoodsInfo'
import DetailParamsInfo from './detailComps/detailParamsInfo'
import DetailCommentInfo from './detailComps/DetailCommentInfo'
import DetailRecommendInfo from './detailComps/DetailRecommendInfo'
import {debounce} from '@/common/utils'
import DetailBottomBar from './detailComps/DetailBottomBar'
import {backTopMixin} from '@/common/mixin'
import BackTop from '@/components/content/backTop/BackTop'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    BackTop,
  },
  mixins: [backTopMixin],
  data(){
    return{
      iid:null,
      topImages: [],
      good:{},
      shop:{},
      shops:{},
      detailInfo:{},
      params:{},
      commentInfo:{},
      recommendList:[],
      themeTops:[],
      themeTopsList:[],
      index:0,
      getThemeTopY:null
    }
  },
  activated(){
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情页数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部轮播图数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      this.good = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 2.获取店铺数据
      // console.log(res);
      this.shop = new Shop(res.result.shopInfo)
      // 3.获取商品详情图片数据
      this.detailInfo = data.detailInfo;
      // 4.获取底部商品细节描述数据
      this.params = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 5.获取评论信息
      console.log(res);
      if(data.rate.cRate){
        this.commentInfo = data.rate.list[0]
      }
      // 这里获取的高度值不对，因为图片还没有被加载高度没有被计算在内
      // this.$nextTick(() =>{
      //   this.themeTops = [];
      //   this.themeTops.push(0);
      //   this.themeTops.push(this.$refs.params.$el.offsetTop)
      //   this.themeTops.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTops.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTops);
      // })
      // 创建函数，并运用防抖。在nextnextTick中调用此函数
      this.getThemeTopY = debounce(() => {
          this.themeTops = [];
          this.themeTops.push(0);
          this.themeTops.push(this.$refs.params.$el.offsetTop)
          this.themeTops.push(this.$refs.comment.$el.offsetTop)
          this.themeTops.push(this.$refs.recommend.$el.offsetTop)
          
          this.themeTopsList = this.themeTops
          // console.log(this.themeTopsList)
        },100)
      // ------------------------------------------------------
    })
    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommendList = res.data.list
      // console.log(this.recommendList.constructor === Array)
    })
  },
  // 因为使用了keep-alive所以不应该吧请求数据写在create里，在creat里就不会每次重新请求数据导致页面不刷新
  // created(){
  //   // 1.保存传入的iid
  //   this.iid = this.$route.params.iid

  //   // 2.根据iid请求详情页数据
  //   getDetail(this.iid).then(res => {
  //     // 1.获取顶部轮播图数据
  //     const data = res.result
  //     this.topImages = data.itemInfo.topImages
  //     this.good = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
  //     // 2.获取店铺数据
  //     // console.log(res);
  //     this.shop = new Shop(res.result.shopInfo)
  //     // 3.获取商品详情图片数据
  //     this.detailInfo = data.detailInfo;
  //     // 4.获取底部商品细节描述数据
  //     this.params = new GoodsParam(data.itemParams.info,data.itemParams.rule)
  //     // 5.获取评论信息
  //     console.log(res);
  //     if(data.rate.cRate){
  //       this.commentInfo = data.rate.list[0]
  //     }
  //     // 这里获取的高度值不对，因为图片还没有被加载高度没有被计算在内
  //     // this.$nextTick(() =>{
  //     //   this.themeTops = [];
  //     //   this.themeTops.push(0);
  //     //   this.themeTops.push(this.$refs.params.$el.offsetTop)
  //     //   this.themeTops.push(this.$refs.comment.$el.offsetTop)
  //     //   this.themeTops.push(this.$refs.recommend.$el.offsetTop)
  //     //   console.log(this.themeTops);
  //     // })
  //     // 创建函数，并运用防抖。在nextnextTick中调用此函数
  //     this.getThemeTopY = debounce(() => {
  //         this.themeTops = [];
  //         this.themeTops.push(0);
  //         this.themeTops.push(this.$refs.params.$el.offsetTop)
  //         this.themeTops.push(this.$refs.comment.$el.offsetTop)
  //         this.themeTops.push(this.$refs.recommend.$el.offsetTop)
          
  //         this.themeTopsList = this.themeTops
  //         // console.log(this.themeTopsList)
  //       },100)
  //     // ------------------------------------------------------
  //   })
  //   // 3.请求推荐数据
  //   getRecommend().then(res => {
      
  //     this.recommendList = res.data.list
  //     // console.log(this.recommendList.constructor === Array)
  //   })
  // },
  methods:{
    imageLoad(){
      this.$refs.detailScroll.scroll.refresh()
      // console.log(this.$refs.scroll.scroll.refresh);
      // console.log('刷新');
      this.$nextTick(() =>{
        // this.themeTops = this.getThemeTopY()
        this.getThemeTopY()
        // 有时候会报错说getThemeTopY不是函数，应该是因为组件创建得太快，没有反应过来
        // 调用防抖函数
      })
    },
    itemNavBarClick(index){
      this.$refs.detailScroll.scrollTo(0,-this.themeTops[index])
    },
    // 监听滚动，实现滚动内容对应导航标题
    contentScroll(position){
      // 1.获取Y值
      const positionY = -position.y
      // console.log(position);
      const length = this.themeTopsList.length
      // 2.和themeTops中的值作比较
      for(let i=0; i<length; i++){
        // console.log(this.themeTopsList);
        if((this.index !== i) &&((i<length-1 && positionY>=this.themeTopsList[i] && positionY<this.themeTopsList[i+1])
        ||(i===length-1 && positionY>=this.themeTopsList[i]))){
          this.index = i
          this.$refs.datailNavBar.currentIndex = this.index
        }
      }
      // 1.监听滚动条，选择返回顶部是否显示
      this.listenScroll(position)
    },
    // 监听加入购物车
    cartClick(){
        // 1.创建对象
        const product = {}
        // 2.对象信息
        product.iid = this.iid;
        product.imgURL = this.topImages[0]
        product.title = this.good.title
        product.desc = this.good.desc;
        product.newPrice = this.good.nowPrice;
        // 3.添加到Store中
        // this.$store.commit('addCart', obj)
        // 这里是将ibj传到store对象里去
        this.$store.dispatch('addCart',product).then((res) => {
          // 弹出toast框
          this.$toast(res)
        })
        
    },
    // 监听购买
    buyClick(){
      this.$toast('凡事问问自己配不配！！！')
    }
    
  }
}
</script>
  
<style scoped>
  .detail{
    position: relative;
    z-index: 12;
    background-color: white;
    height: 100vh;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 0px;
    left: 0;
    right: 0;
    /* height: 1600px; */
    /* 这个高度设置的是滚动区域内容的高度
    *  父元素也需要设置一个高度，可视高度，在这个高度内可拖动滚动条
     */
  }
  .detail-nav-bar{
    position: relative;
    z-index: 11;
    background-color: #fff;
  }
  .detail-bottom-bar{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 11;
  }


</style>