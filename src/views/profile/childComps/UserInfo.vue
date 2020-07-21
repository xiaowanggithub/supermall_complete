<template>
  <div class="user-info">
    <div class="user-img">
      <img src="" alt="">
    </div>
    <div class="user-center">
      <div class="register">
        <a class="login" href="javascript:;">登录/</a>
        <a class="sign-in" href="javascript:;">注册</a>
      </div>
      <div class="register-detail">
        <img src="" alt="">暂无绑定手机号
      </div>
      <div class="small-triangle">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'UserInfo'
}
</script>
  
<style scoped>
  .user-info{
    width: 100%;
    height: 70px;
    background-color:  var(--color-tint);
    color: white;
    display: flex;
  }
  .user-img{
    width: 60px;
    height: 60px;
    background-color: white;
    margin-left: 20px;
    border-radius:50%;
  }
  .user-center{
    /* background-color: wheat; */
    margin-left: 20px;
    height: 45px;
    width: 200px;
    padding-top: 13px;
    position: relative;
  }
  .register{
    line-height: 100%;
  }
  .register-detail{
    line-height: 100%;
  }
  .small-triangle{
    border-top: 1px solid white;
    border-right: 1px solid white;
    width: 8px;
    height: 8px;
    position: absolute;
    top: 25px;
    right: 0;
    transform: rotate(45deg);
  }
  .register>a{
    text-decoration: none;
    font-size: 16px;
    color: white;
  }
  .register-detail{
    margin-top: 5px;
    font-size: 13px;
  }
</style>