<template>
  <div class="container">
    <ul class="job-list" v-if="jobList.length > 0">
      <li class="job-item" v-for="(item, index) in jobList" :key="index">
        <div class="job-info">
          <div class="mr10">
            <van-image width="90" height="70" fit="cover" :src="item.MainImage"></van-image>
          </div>
          <div>
            <div class="mb10 te-1 f14">{{item.Title}}</div>
            <div class="mb10">
              <span style="color: #aaa;">报名政策：</span>
              <span class="money">{{item.SalaryByFactory || 0}}</span>
              <span class="unit">元/小时</span>
            </div>
            <div class="color: " @click="toJobDetail(item)">查看工作详情<van-icon class="vm" size="14" name="arrow" /></div>
          </div>
        </div>
        <div class="apply-info">
          <div class="mb10">公司名称：{{item.CompanyName}}</div>
          <div>报名时间：{{item.DateAdded}}</div>
        </div>
        <img class="applied" src="../../assets/images/applied.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import bubble from '_c/bubble'
import { myJobs } from '@/api/user'
export default {
  name: "",
  data() {
    return {
      jobList: []
    };
  },
  components: {
    bubble
  },
  methods: {
    getMyJobs() {
      myJobs({
        "PageIndex": 1,
	      "PageSize": 999
      }).then((res) => {
        if (res.Data.length) {
          res.Data.map(item => {
            let images = item.Images && JSON.parse(item.Images) || [];
            item.MainImage = images[0] || "";
            return item
          })
        }
        this.jobList = res.Data;
      })
    },
    toJobDetail(item) {
      this.$router.push({
        path: "/jobDetail",
        query: {
          id: item.JobId
        }
      });
    },
  },
  created() {
    this.getMyJobs();
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
  .job-list {
    .job-item {
      background: #fff;
      margin: 10px;
      border-radius: 5px;
      padding: 10px;
      position: relative;
      .job-info {
        display: flex;
        align-items: center;
      }
      .apply-info {
        padding: 10px;
        background-color: #f1f1f1;
        margin-top: 10px;
      }
      .applied {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
  }
}
</style>