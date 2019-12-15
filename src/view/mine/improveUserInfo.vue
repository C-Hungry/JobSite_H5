<template>
  <div class="container">
    <div class="form">
      <div class="title">完善资料</div>
      <van-cell-group class="mb20">
        <van-field v-model="formData.RealName" input-align="right" clearable label="真实姓名" placeholder="请输入真实姓名" />
        <van-cell title="学历" @click="isShowDegreePopup=true" is-link value="请选择学历" />
        <van-cell title="出生日期" @click="isShowBirthDayPopup=true" is-link value="请选择出生日期" />
        <van-field v-model="formData.Favorite" input-align="right" clearable label="兴趣爱好" placeholder="请输入兴趣爱好" />
      </van-cell-group>
      <van-button color="#1585F5" style="width: 100%;">提交</van-button>
    </div>
    <van-popup v-model="isShowDegreePopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="isShowDegreePopup=false"
        @confirm="onDegreePopupConfirm"
      />
    </van-popup>
    <van-popup v-model="isShowBirthDayPopup" position="bottom">
      <van-datetime-picker
        type="date"
        @confirm="onBirthDayPopupConfirm"
        @cancel="isShowBirthDayPopup=false"
        :min-date="new Date(1950,0,1)"
      />
    </van-popup>
  </div>
</template>

<script>
import { bindPhone } from '@/api/user'
export default {
  name: "",
  data() {
    return {
      formData: {
        RealName: "",
        BirthDay: "",
        Degree: "",
        Favorite: ""
      },
      columns: ['初中','高中','大专','本科及以上'], //1初中2高中3大专4本科及以上,
      isShowDegreePopup: false,
      isShowBirthDayPopup: false
    };
  },
  methods: {
    onDegreePopupConfirm(value) {
      this.formData.Degree = this.columns.indexOf(value) + 1;
      this.isShowDegreePopup = false;
    },
    onBirthDayPopupConfirm(value) {
      this.formData.BirthDay = this.$moment(value).format('YYYY-MM-DD');
      this.isShowBirthDayPopup = false;
    },
    getVerifyCode() {
      this.timerNum = 5;
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