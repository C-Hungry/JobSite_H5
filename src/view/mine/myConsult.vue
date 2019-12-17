<template>
  <div class="container">
    <ul class="question-list">
      <li class="question-item" v-for="(item, index) in questionList" :key="index">
        
      </li>
    </ul>
  </div>
</template>

<script>
import { myQuestions } from '@/api/user'
export default {
  name: "",
  data() {
    return {
      questionList: []
    };
  },
  methods: {
    getMyQuestions() {
      myQuestions({
        "PageIndex": 1,
	      "PageSize": 999
      }).then((res) => {

      }).finally(()=> {

      })
    }
  },
  created() {
    this.getMyQuestions();
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
}
</style>