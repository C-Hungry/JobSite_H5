<template>
  <div class="container">
    <div class="wallet-header">
      <div class="mymoney">
        <div class="mb10 f14"><van-icon class="vm mr5" style="margin-top: -5px;" name="balance-o" size="16"/>我的钱包</div>
        <div class="f16">￥{{$store.state.user.userInfo && $store.state.user.userInfo.Balance}}<span class="f12 ml5">元</span></div>
      </div>
      <div class="record" @click="toCashOutRecord">提现记录</div>
    </div>
    <div class="balance-c">
      <div class="balance-title mb20">选择提现金额：</div>
      <van-row type="flex" justify="space-between">
        <van-col class="balance" @click="chooseMoney(0.5)" :class="{'balance-active': formData.Money == 0.5}" span="7">0.5元</van-col>
        <van-col class="balance" @click="chooseMoney(5)" :class="{'balance-active': formData.Money == 5}" span="7">5元</van-col>
        <van-col class="balance" @click="chooseMoney(20)" :class="{'balance-active': formData.Money == 20}" span="7">20元</van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col class="balance" @click="chooseMoney(50)" :class="{'balance-active': formData.Money == 50}" span="7">50元</van-col>
        <van-col class="balance" @click="chooseMoney(100)" :class="{'balance-active': formData.Money == 100}" span="7">100元</van-col>
        <van-col class="balance" @click="chooseMoney(500)" :class="{'balance-active': formData.Money == 500}" span="7">500元</van-col>
      </van-row>
      <van-button @click="applyCashout" color="#1585F5" style="width: 100%;">提交</van-button>
    </div>
    
  </div>
</template>

<script>
import { applyCashout } from "@/api/user";
export default {
  name: "",
  data() {
    return {
      formData: {
        Money: 0
      }
    };
  },
  methods: {
    chooseMoney(money) {
      if (this.formData.Money == money) {
        this.formData.Money = 0;
      } else {
        this.formData.Money = money;
      }
    },
    applyCashout() {
      if (!this.formData.Money) {
        this.$toast("请选择提现金额");
        return;
      }
      this.$toast.loading({
        message: "提交中...",
        forbidClick: true,
        duration: 0
      });
      applyCashout(this.formData).then(res => {
        this.$toast.success({
          message: "提交成功，请耐心等待处理",
          forbidClick: true,
          duration: 2000
        });
        this.formData.Money = 0;
        this.$store.dispatch('handleGetUserInfo');
      });
    },
    toCashOutRecord() {
      this.$router.push({
        name: 'cashOutRecord'
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #eee;
  //  background-image: url(../../assets/images/bind-phone-bg.jpg);
  //  background-size: 100% auto;
  .wallet-header {
    margin: 10px;
    height: 80px;
    background-color: #1989fa;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding: 0 25px;
    font-size: 14px;
    border-radius: 5px;
    .mymoney {
      width: 100px;
      font-size: 16px;
      flex: 1;
    }
    .record {
      height: 22px;
      line-height: 22px;
      text-align: right;
      border-radius: 10px;
      border: 1px solid #fff;
      padding: 0 8px;
    }
  }
  .balance-c {
    margin: 10px;
    background-color: #ffffff;
    padding: 25px;
    border-radius: 5px;
    font-size: 14px;
    .balance {
      text-align: center;
      height: 36px;
      line-height: 36px;
      border-radius: 18px; 
      color: #1989fa;
      border: 1px solid #1989fa;
      margin-bottom: 20px;
      &-active {
        background-color: #1989fa;
        color: #ffffff;
      }
    }
  }
}
</style>