<template>
  <div class="footer-bar">
    <van-tabbar style="background-color: #f7f8fa;" route>
      <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item name="mine" icon="manager-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'footer-bar',
  data () {
    return {
      active: 'home'
    }
  }
}
</script>

<style lang="less" scoped>
.footer-bar {
  background-color: #f7f8fa;
}
</style>
