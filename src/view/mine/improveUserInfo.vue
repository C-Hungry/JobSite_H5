<template>
  <div class="container">
    <div class="form">
      <div class="title">完善资料</div>
      <van-cell-group class="mb20">
        <van-field required v-model="formData.RealName" input-align="right" clearable label="真实姓名" placeholder="真实姓名" />
        <van-cell required title="学历" @click="isShowDegreePopup=true" is-link :value="formData.DegreeText || '学历'" />
        <van-cell required title="出生日期" @click="isShowBirthDayPopup=true" is-link :value="formData.BirthDay || '出生日期'" />
        <van-field v-model="formData.Favorite" input-align="right" clearable label="兴趣爱好" placeholder="兴趣爱好" />
      </van-cell-group>
      <van-button color="#1585F5" style="width: 100%;" @click="improveUserInfo">提交</van-button>
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
        value
        @confirm="onBirthDayPopupConfirm"
        @cancel="isShowBirthDayPopup=false"
        :min-date="new Date(1970,0,1)"
      />
    </van-popup>
  </div>
</template>

<script>
import { improveUserInfo } from '@/api/user'
export default {
  name: "",
  data() {
    return {
      formData: {
        RealName: "",
        BirthDay: "",
        Degree: "",
        DegreeText: "",
        Favorite: ""
      },
      columns: ['初中','高中','大专','本科及以上'], //1初中2高中3大专4本科及以上,
      isShowDegreePopup: false,
      isShowBirthDayPopup: false
    };
  },
  methods: {
    onDegreePopupConfirm(value) {
      this.formData.DegreeText = value;
      this.formData.Degree = this.columns.indexOf(value) + 1;
      this.isShowDegreePopup = false;
    },
    onBirthDayPopupConfirm(value) {
      this.formData.BirthDay = this.$moment(value).format('YYYY-MM-DD');
      this.isShowBirthDayPopup = false;
    },
    improveUserInfo() {
      if (!this.formData.RealName) {
        this.$toast('请输入真实姓名');
        return
      }
      if (!this.formData.Degree) {
        this.$toast('请选择学历');
        return
      }
      if (!this.formData.BirthDay) {
        this.$toast('请选择出生日期');
        return
      }
      this.$toast.loading({
        message: '提交中...',
        forbidClick: true,
        duration: 0
      });
      improveUserInfo(this.formData).then((res) => {
        this.$toast('提交成功')
        this.$router.go(-1);
      })
    }
  },
  created() {
    let userInfo = Object.assign({}, this.$store.state.user.userInfo);
    this.formData = {
      RealName:  userInfo.RealName || "",
      BirthDay: (userInfo.BirthDay && this.$moment(userInfo.BirthDay).format('YYYY-MM-DD')) || "2000-01-01",
      Degree: userInfo.Degree || "",
      DegreeText: (userInfo.Degree && this.columns[userInfo.Degree-1]) || "",
      Favorite: userInfo.Favorite || "",
    }
  }
};
</script>

<style lang="less" scoped>
.van-cell__value {
  color: #333;
}
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