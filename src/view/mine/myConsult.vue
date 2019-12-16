<template>
  <div class="container">
    template
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
      this.$toast.loading({
        message: '提交中...',
        forbidClick: true,
        duration: 0
      });
      bindPhone(this.formData).then((res) => {
        this.$toast('提交成功')
        let userInfo = this.$store.state.user.userInfo;
        userInfo.Phone = this.formData.Phone;
        this.$store.commit('setUserInfo', userInfo);
        this.$router.go(-1);
      }).finally(()=> {
        this.$toast.clear();
      })
    }
  },
  destroyed() {
    this.intervaler && clearInterval(this.intervaler)
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