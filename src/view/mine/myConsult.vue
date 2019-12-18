<template>
  <div class="container">
    <ul class="question-list" v-if="questionList.length > 0">
      <li class="question-item" v-for="(item, index) in questionList" :key="index">
        <div class="mb5">
          <van-tag plain :type="item.Status == 0 ? 'primary' : 'danger'">
            {{item.Status == 0 ? '已回复' : '未回复'}}
          </van-tag>
          <div class="datetime fr">{{item.DateAdded}}</div>
        </div>
        <div class="title mt15">
         <span class="strong">提问：</span>{{item.Qusetion}}
        </div>
        <div class="replay" v-if="item.Status == 0">
          <van-divider></van-divider>
          <span class="strong">回复：</span>
          <span>{{item.Reply}}</span>
        </div>
      </li>
    </ul>
    <bubble class="bubble" path="/consult" replace>继续咨询</bubble>
  </div>
</template>

<script>
import bubble from '_c/bubble'
import { myQuestions } from '@/api/user'
export default {
  name: "",
  data() {
    return {
      questionList: []
    };
  },
  components: {
    bubble
  },
  methods: {
    getMyQuestions() {
      myQuestions({
        "PageIndex": 1,
	      "PageSize": 999
      }).then((res) => {
        this.questionList = res.Data;
      }).finally(()=> {
        if (this.questionList.length == 0) {
          this.$router.replace('/consult');
        }
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
  .question-list {
    .question-item {
      background: #fff;
      margin: 10px;
      border-radius: 5px;
      padding: 10px;
      .title {
        font-size: 14px;
      }
      .datetime {
        color: #aaa;
        margin-top: 3px;
      }
      .replay {
        font-size: 14px;
      }
      .strong {
        font-weight: 600;
      }
    }
  }
}
</style>