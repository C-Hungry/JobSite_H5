<template>
  <div class="home" style="height:100%;">
    <van-sticky :offset-top="0">
      <van-search
        class="ml5 mr10"
        v-model="jobParam.KeyWords"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-tabs v-model="jobParam.SortType" @change="onTabChange">
        <van-tab title="最新" :name="1"></van-tab>
        <van-tab title="人气" :name="2"></van-tab>
        <van-tab title="热评" :name="3"></van-tab>
      </van-tabs>
    </van-sticky>
    <van-pull-refresh style="height:100%;" v-model="isLoading" @refresh="onRefresh">
      <van-list
        :immediate-check="false"
        :loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="60"
        @load="getJobList"
      >
        <ul class="job-list">
          <li class="job-item" @click="toJobDetail(item)" v-for="(item, index) in jobList" :key="index">
            <div class="job-image mr10">
              <van-image width="80" height="60" fit="cover" :src="item.Images[0]"></van-image>
            </div>
            <div class="job-info">
              <div class="title te-1">{{item.Title}}</div>
              <div class="keyword te-1">{{item.KeyWords}}</div>
              <div>
                <span class="salary">{{item.TotalSalary}}</span>元/月
              </div>
            </div>
            <div class="job-join">
              <div class="title">工价</div>
              <div class="salary-hour">{{item.SalaryByFactory}}元/小时</div>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getJobList } from "@/api/job";
export default {
  name: "home",
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      jobList: [],
      jobParam: {
        PageIndex: 1,
        PageSize: 20,
        KeyWords: "",
        Keys: "",
        SortType: 1//1时间 2推荐 3热度
      }
    };
  },
  methods: {
    onRefresh() {
      this.isLoading = true;
      this.finished = false;
      this.jobParam.PageIndex = 1;
      this.getJobList();
    },
    onSearch() {
      this.onRefresh();
    },
    onTabChange(item) {
      this.jobParam.SortType = item;
      this.onRefresh();
    },
    toJobDetail(item) {
      this.$router.push({
        path: "/jobDetail",
        query: {
          id: item.Id
        }
      });
    },
    getJobList() {
      if (this.finished) return;
      this.loading = true;
      getJobList(this.jobParam)
        .then(res => {
          if (this.isLoading) {
            this.jobList = [];
          }
          if (!this.finished) {
            this.jobList = this.jobList.concat(res.Data);
          }
          if (this.jobList.length == res.TotalRows) {
            this.finished = true;
          }
        })
        .finally(() => {
          this.jobParam.PageIndex++;
          this.loading = false;
          this.isLoading = false;
        });
    },
    toJobList() {
      this.$router.push({
        path: "",
        query: {}
      });
    },
  },
  created() {
    this.jobParam.KeyWords = this.$route.query.keywords || "";
    this.jobParam.Keys = this.$route.query.keys || "";
    this.jobParam.SortType = this.$route.query.sortType || 1;
    this.getJobList();
  }
};
</script>

<style lang="less" scoped>
.banner-title {
  text-align: center;
  font-size: 16px;
  margin-bottom: 10px;
}
.job-list {
  padding: 0 10px;
  margin-top: 10px;
  .job-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .job-image {
    }
    .job-info {
      flex: 1;
      padding-right: 10px;
      .title {
        font-size: 14px;
        color: #000000;
        margin-bottom: 3px;
      }
      .keyword {
        margin-bottom: 2px;
      }
      .salary {
        font-size: 14px;
        color: #fd9f2d;
        display: inline-block;
        margin-right: 2px;
        font-weight: bold;
      }
    }
    .job-join {
      width: 76px;
      height: 40px;
      border: 1px solid #fd9f2d;
      text-align: center;
      line-height: 20px;
      border-radius: 3px;
      .title {
        height: 20px;
        background: #fd9f2d;
        color: #ffffff;
      }
      .salary-hour {
        height: 20px;
        color: #fd9f2d;
      }
    }
  }
}
</style>
