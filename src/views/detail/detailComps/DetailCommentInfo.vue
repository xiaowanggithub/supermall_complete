<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="comment-title">
      <div class="comment-title-left">
        用户评价
      </div>
      <div class="comment-title-right">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="comment-bottom">
      <div class="user-info">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key='index'>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {formatDate} from '@/common/utils'

export default {
  name:'DetailCommentInfo',
  data(){
    return {

    }
  },
  props:{
    commentInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters: {
		  showDate: function (value) {
        let date = new Date(value*1000);
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
}
</script>
  
<style scoped>
  .comment-info{
    padding: 5px 12px;
      color: #333;
      border-bottom: 5px solid #f2f5f8;
  }
  .comment-title{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .comment-title-left{
    float: left;
    font-size: 15px;
  }
  .comment-title-right{
    float: right;
    font-size: 13px;
    margin-right: 5px;
  }
  .arrow-right {
    border-top: 1px solid #999;
    border-left: 1px solid #999;
    width: 9px;
    height: 9px;
    background-color: transparent;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    display: inline-block;
    margin-left: .1rem;
  }
  .user-info img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .user-info{
    padding: 10px 0 5px;
  }
  /* 用户姓名 */
  .user-info span{
    position: relative;
    bottom: 13px;
    margin-left: 10px;
    font-size: 15px;
  }
  /* 评论 */
  .info-detail p{
    font-size: 14px;
    color: #777777;
  }
  .info-detail{
    padding: 0 5px 15px;
  }
  .info-other span{
    color: #999999;
    font-size: 12px;
  }
  .info-other .date{
    margin-right: 8px;
  }
  .info-imgs img{
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>