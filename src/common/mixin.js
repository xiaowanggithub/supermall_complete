import BackTop from '@/components/content/backTop/BackTop'
import {POP, NEW, SELL} from "./const";

export const backTopMixin = {
  components:{
    BackTop,
  },
  data() {
    return {
      isShow:false
    }
  },
  methods: {
    backTop(){
      this.$refs.detailScroll.scrollTo(0,0,300)
      //通过refs访问scroll子组件，通过该方式访问子组件之后，可以调用子组件的变量或函数
    },
    listenScroll(position){
      this.isShow = (-position.y)>1000
    }
    // contentScroll(position){
    //   // 1.监听滚动条，选择返回顶部是否显示
    //   this.isShow = (-position.y)>1000
    //   console.log(position);
    // },
  },
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      // console.log(this.currentType);
    }
  }
}