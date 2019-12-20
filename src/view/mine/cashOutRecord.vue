<template>
  <div class="container">
    <ul class="question-list" v-if="cashOutRecordList.length > 0">
      <li class="question-item" v-for="(item, index) in cashOutRecordList" :key="index">
        <van-tag class="fr" plain :type="item.Status == 1 ? 'danger' : item.Status == 2 ? 'success' : 'default'">
          {{item.Status == 1 ? '已申请' : item.Status == 2 ? '已打款' : '已拒绝'}}
        </van-tag>
        <div class="title mt5">
         <span class="strong">提现金额：</span>
         <span class="money">{{item.Money}}</span>
         <span class="unit">元</span>
        </div>
        <div class="title mt15">
         <span class="strong">提交时间：</span>
         <span>{{item.DateAdded}}</span>
        </div>
        <div class="replay" v-if="item.Status == 2">
          <van-divider></van-divider>
          <span class="strong">确认人：</span>
          <span>{{item.Reply}}</span>
        </div>
        <div v-if="item.Status == 2">
          <span>确认时间：{{item.ReplyUserReal}}</span>
          <span>{{item.ReplyDate && $moment(item.ReplyDate).format('YYYY-MM-DD HH:MM:SS')}}</span>
        </div>
        <div v-if="item.Status == 2">
          <span>备注：{{item.ReplyUserReal}}</span>
          <span>{{item.ReplyDate}}</span>
        </div>
      </li>
      <li class="nodata">没有更多了</li>
    </ul>
  </div>
</template>

<script>
import { getCashOutList } from '@/api/user'
export default {
  name: "",
  data() {
    return {
      cashOutRecordList: []
    };
  },
  methods: {
    getCashOutList() {
      getCashOutList({
        "PageIndex": 1,
	      "PageSize": 999
      }).then((res) => {
        this.cashOutRecordList = res.Data;
      })
    }
  },
  created() {
    this.getCashOutList();
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
    }
  }
}
</style>