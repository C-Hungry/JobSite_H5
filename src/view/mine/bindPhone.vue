<template>
  <div class="bind-phone">
    <!-- <img width="100%" src="../../assets/images/banner01.png" alt=""> -->
    <div class="form">
      <div class="title">绑定手机号码</div>
      <van-cell-group class="mb20">
        <van-field v-model="formData.Phone" clearable label="手机号码" placeholder="手机号码" />
        <van-field v-model="formData.SMS" clearable label="短信验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" color="#1585F5">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <van-button color="#1585F5" style="width: 100%;">确认绑定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      formData: {
        Phone: "",
        SMS: ""
      }
    };
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