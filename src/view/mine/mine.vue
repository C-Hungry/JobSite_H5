<template>
  <div style="background: #eee;" class="pt5">
    <div class="info">
      <div class="left">
        <van-image width="80" height="80" fit="cover" round :src="userInfo.HeadImage"></van-image>
      </div>
      <div class="right" v-if="userInfo.NickName">
        <div>{{userInfo.NickName}}</div>
        <!-- <div>{{userInfo.Phone || '-'}}</div> -->
      </div>
      <div v-else class="right" @click="login">未登录</div>
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
      code: "",
      inviteCode: ""
    }
  },
  methods: {
    apply() {
      this.$toast('功能开发中...');
    },
    login() {
      this.$store.dispatch('handleWeChatAuth', {inviteCode: this.inviteCode});
    },
    getWxUserInfo() {
      this.$store.dispatch('handleWeChatLogin', {code: this.code, inviteCode: this.inviteCode}).then(res=> {
        this.$router.push({
          name: 'bindPhone'
        })
      })
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  mounted() {
    this.code = URI.query.get('code') || '';
    this.inviteCode = URI.query.get('inviteCode') || '';
    if (!this.userInfo && this.code) {
      this.getWxUserInfo()
      return
    }
    if (!this.userInfo && !this.code) {
      this.login();
      return
    }
    this.$store.dispatch('handleAuthPhone')
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
