<template>
  <div class="container">
    <ul class="question-list" v-if="questionList.length > 0">
      <li class="question-item" v-for="(item, index) in questionList" :key="index">
        <div class="mb5">
          <van-tag plain :type="item.Status == 1 ? 'danger' : item.Status == 2 ? 'success' : 'default'">
            {{item.Status == 1 ? '未回复' : item.Status == 2 ? '已回复' : '已关闭'}}
          </van-tag>
          <div class="datetime fr">{{item.DateAdded}}</div>
        </div>
        <div class="title mt15">
         <span class="strong">问题：</span>{{item.Qusetion}}
        </div>
        <div class="replay" v-if="item.Status == 2">
          <van-divider></van-divider>
          <span class="strong">回复：</span>
          <span>{{item.Reply}}</span>
        </div>
        <div v-if="item.Status == 2">
          <van-divider></van-divider>
          <span>回复人：{{item.ReplyUserReal}}</span>
          <span class="fr">{{item.ReplyDate && $moment(item.ReplyDate).format('YYYY-MM-DD HH:MM:SS')}}</span>
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
  bottom: 48px;
  left: 0;
  right: 0;
  background: #eee;
  overflow-y: auto;
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