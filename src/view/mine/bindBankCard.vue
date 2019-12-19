<template>
  <div class="container">
    <div class="form">
      <div class="title">绑定补贴卡</div>
      <van-cell-group class="mb20">
        <van-field required v-model="formData.RealName" input-align="right" clearable label="姓名" placeholder="开户人姓名" />
        <van-field required v-model="formData.IdCard" input-align="right" clearable label="身份证号" placeholder="开户人身份证号" />
        <van-field required v-model="formData.BankAccount" input-align="right" clearable label="银行卡号" placeholder="开户人银行卡号" />
        <van-cell required title="开户银行" @click="isShowBankCardPopup=true" is-link :value="formData.BankName || '开户银行'" />
        <van-cell required title="开户地区" @click="isShowAreaPopup=true" is-link :value="(formData.Province + formData.City) || '开户地区'" />
      </van-cell-group>
      <van-button color="#1585F5" style="width: 100%;" @click="bindBankCard">提交</van-button>
    </div>
    <van-popup v-model="isShowBankCardPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="bankList"
        @cancel="isShowBankCardPopup=false"
        @confirm="onBankCardPopupConfirm"
      />
    </van-popup>
    <van-popup v-model="isShowAreaPopup" position="bottom">
      <van-area
        :area-list="areaList"
        :columns-num="2"
        @cancel="isShowAreaPopup=false"
        @confirm="onAreaPopupConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import areaList from '@/libs/area'
import bankList from '@/libs/bank'
import { bindBankCard } from '@/api/user'
export default {
  name: "",
  data() {
    return {
      formData: {
        Id: 0, //0新增 非0修改
        RealName: "",
        IdCard: "",
        BankAccount: "",
        BankName: "",
        Province: "",
        City: "",
        AliPay: ""
      },
      areaList: areaList,
      bankList: bankList,
      isShowBankCardPopup: false,
      isShowAreaPopup: false
    };
  },
  methods: {
    onBankCardPopupConfirm(value) {
      this.formData.BankName = value;
      this.isShowBankCardPopup = false;
    },
    onAreaPopupConfirm(value) {
      if (value && value.length) {
        let isNotExit = value.filter(item => !item.code).length;
        if (isNotExit) {
          this.$toast('请选择开户地区')
          return
        } else {
          this.formData.Province = value[0].name;
          this.formData.City = value[1].name;
          this.isShowAreaPopup = false;
        }
      } else {
        this.$toast('请选择开户地区')
      }
    },
    bindBankCard() {
      if (!this.formData.RealName) {
        this.$toast('请输入姓名');
        return
      }
      if (!this.formData.IdCard) {
        this.$toast('请输入身份证号');
        return
      }
      if (!this.formData.BankAccount) {
        this.$toast('请输入银行证号');
        return
      }
      if (!this.formData.BankName) {
        this.$toast('请选择开户银行');
        return
      }
      if (!this.formData.Province || !this.formData.City) {
        this.$toast('请选择开户地区');
        return
      }
      this.$toast.loading({
        message: '提交中...',
        forbidClick: true,
        duration: 0
      });
      bindBankCard(this.formData).then((res) => {
        this.$toast('提交成功')
        this.$router.go(-1);
      })
    }
  },
  created() {
    // this.formData = this.$store.state.user.userInfo.Phone || "";
  },
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