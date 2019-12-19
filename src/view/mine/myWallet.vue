<template>
  <div class="container">
    <div class="wallet-header">
      <div class="mymoney">
        <div class="mb10 f14">我的钱包</div>
        <div class="f16">￥{{$store.state.user.userInfo.Balance}}<span class="f12 ml5">元</span></div>
      </div>
      <div class="record">提现记录</div>
    </div>
    <div class="balance-c">
      <van-row>
        <van-col class="balance" span="8">0.5元</van-col>
        <van-col class="balance" span="8">5元</van-col>
        <van-col class="balance" span="8">10元</van-col>
      </van-row>
      <van-row>
        <van-col class="balance" span="8">50元</van-col>
        <van-col class="balance" span="8">100元</van-col>
        <van-col class="balance" span="8">500元</van-col>
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
        Phone: "",
        VerifyCode: ""
      },
      timerNum: 0,
      intervaler: null
    };
  },
  methods: {
    getVerifyCode() {
      this.timerNum = 60;
      this.intervaler = setInterval(() => {
        this.timerNum--;
        if (this.timerNum == 0) {
          this.intervaler && clearInterval(this.intervaler);
          this.intervaler = null;
        }
      }, 1000);
    },
    applyCashout() {
      if (!this.formData.Phone) {
        this.$toast("请输入手机号码");
        return;
      }
      this.$toast.loading({
        message: "提交中...",
        forbidClick: true,
        duration: 0
      });
      bindPhone(this.formData).then(res => {
        this.$toast("提交成功");
        this.$router.go(-1);
      });
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
    padding: 0 30px;
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
    padding: 10px;
    border-radius: 5px;
  }
}
</style>