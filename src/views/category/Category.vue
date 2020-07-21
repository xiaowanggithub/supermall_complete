<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" :data="[categoryData]">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick"
                       class="tab-nav"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>

  <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->

</template>
<script>
import Scroll from '@/components/common/scroll/Scroll'
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/tabControl'

import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'
import TabContentDetail from './childComps/TabContentDetail'

import {getCategory, getSubcategory, getCategoryDetail} from "@/network/category";
import {tabControlMixin} from "@/common/mixin";
import {POP, SELL, NEW} from "@/common/const";

export default {
  name:'Category',
  components:{
    Scroll,
    NavBar,
    TabMenu,
    TabContentCategory,
    TabControl,
    TabContentDetail,
  },
  mixins: [tabControlMixin],
  data(){
    return{
      categories:[],
      currentIndex:-1,
      categoryData:{},
    }
  },
  created() {
    // 1.请求分类数据
    this._getCategory()
    
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 1.获取左边标签分类数据
        this.categories = res.data.category.list

        // 2.初始化每个类别的子数据（定义每个分类对象的数据结构）
        // 用于存放后面的分类数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            // subcategories存放右边上半部分小标签数据
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        // 使得进入categoryData的时候默认显示第一个分类的数据，后续的数据请求通过监听点击获取
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      // 左边列表被点击的index传给currentIndex
      this.currentIndex = index;
      // mailKey是分类数据中不重复的一串数字，类似id
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        // console.log(res.data);
        // 获取到的分类数据放入每个对应分类
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData);
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData[this.currentIndex].categoryDetail[this.currentType]);
      })
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index)
    }
  },
  mounted(){
      // 默认情况下BScroll是不可以实时的监听滚动位置
      // probe 侦测
      // 0,1都是不侦测实时的位置
      // 2: 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测.
      // 3: 只要是滚动, 都侦测.
    // this.myScroll = new BScroll(this.$refs.wrapper,
    // {
    //   probeType: 3,
    //   pullUpLoad: true
    // }
    // )
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return []
      console.log('ok');
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      
    }
  }
}

</script>
  
<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar{
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
    z-index: 5;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
  .tab-nav{
    font-size: 15px;
    color: #666;
  }
</style>