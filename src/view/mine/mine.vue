<template>
  <div style="background: #eee;" class="pt5">
    <div class="info">
      <div class="left">
        <van-image width="80" height="80" fit="cover" round :src="info.avatar"></van-image>
      </div>
      <!-- <div class="right">
        <div>张三</div>
        <div>13201597129</div>
      </div> -->
      <div class="right">未登录</div>
    </div>
    <div>
      <van-cell-group>
        <van-cell icon="edit" title="完善资料" is-link />
        <van-cell icon="balance-pay" title="我的钱包" is-link />
        <van-cell icon="good-job-o" title="我的推荐" is-link />
        <van-cell icon="phone-o" title="更换手机" is-link />
        <van-cell icon="friends-o" title="关于我们" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',
  data () {
    return {
      info: {
        avatar: ""
      }
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  background: #fff;
  margin: 15px;
  border-radius: 10px; 
  display: flex;
  align-items: center;
  .left {
    width: 100px;
    margin: 10px;
  }
  .right {
    font-size: 16px;
  }
}
</style>
