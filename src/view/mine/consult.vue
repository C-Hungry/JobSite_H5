<template>
  <div class="bind-phone">
    <!-- <img width="100%" src="../../assets/images/banner01.png" alt=""> -->
    <div class="form">
      <div class="title">免费咨询</div>
      <van-cell-group>
        <van-field
          required
          v-model="formData.Question"
          rows="4"
          autosize
          label="留言"
          label-width="50px"
          type="textarea"
          maxlength="100"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
      <van-button @click="questionAdd" color="#1585F5" style="width: 100%;">提交</van-button>
    </div>
  </div>
</template>

<script>
import { questionAdd } from '@/api/user'
export default {
  name: "",
  data() {
    return {
      formData: {
        Question: ""
      }
    };
  },
  methods: {
    questionAdd() {
      if (!this.formData.Question) {
        this.$toast('请输入留言');
        return
      }
      this.$toast.loading({
        message: '提交中...',
        forbidClick: true,
        duration: 0
      });
      questionAdd(this.formData).then((res) => {
        this.$toast('提交成功')
        this.$router.replace('/myConsult');
      }).finally(()=> {
        this.$toast.clear();
      })
    }
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