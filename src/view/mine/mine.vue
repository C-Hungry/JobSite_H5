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
      <div class="right" @click="login">未登录</div>
    </div>
    <div>
      <van-cell-group>
        <van-cell @click="apply" icon="edit" title="完善资料" is-link />
        <van-cell @click="apply" icon="balance-pay" title="我的钱包" is-link />
        <van-cell @click="apply" icon="good-job-o" title="我的推荐" is-link />
        <van-cell @click="apply" icon="phone-o" title="更换手机" is-link />
        <van-cell @click="apply" icon="friends-o" title="关于我们" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import URI from '@/libs/uri';
import { wxLogin } from "@/api/user";
export default {
  name: 'mine',
  data () {
    return {
      info: {
        avatar: ""
      },
      code: ""
    }
  },
  methods: {
    apply() {
      this.$toast('功能开发中...');
    },
    login() {
      let appId = 'wx0e88ca5bb6a2a776';
      let redirect_uri = encodeURIComponent(location.href);
      location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
    },
    getUserInfo() {
      wxLogin({Code: this.code, InviteCode: '102233'}).then(res => {
        console.log(res)
      })
    }
  },
  mounted() {
    let code = URI.query.get('code');
    if (code) {
      this.code = code;
      this.getUserInfo();
    }
    console.log(code)
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
    margin-right: 0px;
  }
  .right {
    font-size: 16px;
  }
}
</style>
