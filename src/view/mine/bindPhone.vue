<template>
  <div class="bind-phone">
    <!-- <img width="100%" src="../../assets/images/banner01.png" alt=""> -->
    <div class="form">
      <div class="title">绑定手机号码</div>
      <van-cell-group class="mb20">
        <van-field v-model="formData.Phone" clearable label="手机号码" placeholder="请输入手机号码" />
        <van-field v-model="formData.VerifyCode" clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" @click="getVerifyCode" :disabled="timerNum > 0" size="small" color="#1585F5">{{timerNum > 0 ? `${timerNum}秒`:'发送验证码'}}</van-button>
        </van-field>
      </van-cell-group>
      <van-button @click="bindPhone" color="#1585F5" style="width: 100%;">确认绑定</van-button>
    </div>
  </div>
</template>

<script>
import { bindPhone } from '@/api/user'
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
      this.intervaler = setInterval(()=>{
        this.timerNum--;
        if (this.timerNum == 0) {
          this.intervaler && clearInterval(this.intervaler)
          this.intervaler = null;
        }
      }, 1000)
    },
    bindPhone() {
      if (!this.formData.Phone) {
        this.$toast('请输入手机号码');
        return
      }
      if (!this.formData.VerifyCode) {
        this.$toast('请输入短信验证码');
        return
      }
      bindPhone(this.formData).then((res) => {
        console.log(res)
      }).finally(()=> {
        
      })
    }
  },
  destroyed() {
    this.intervaler && clearInterval(this.intervaler)
  }
};
</script>

<style lang="less" scoped>
 .bind-phone {
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: #eee;
  //  background-image: url(../../assets/images/bind-phone-bg.jpg);
  //  background-size: 100% auto; 
   .form {
     margin: 10px 10px 0 10px;
     background-color: #ffffff;
     border-radius: 5px;
     padding: 20px 10px;
     .title {
       font-size: 16px;
       text-align: center;
       margin: 10px 0 20px 0;
     }
   }
 }
</style>