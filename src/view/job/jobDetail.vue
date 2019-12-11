<template>
  <div style="background: #eee;">
    <van-swipe :autoplay="5000" class="van-swipe-me">
      <van-swipe-item v-for="(image, index) in jobInfo.Images" :key="index">
        <van-image width="100%" height="100%" fit="cover" lazy-load :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="p10 card">
      <div class="f16">{{jobInfo.Title}}</div>
      <div class="f16" v-if="jobInfo.KeyWords">
        <van-tag
          round
          color="#c8c8c8"
          class="mr5 mb10 mt10"
          v-for="(item, index) in jobInfo.KeyWords.split(',')"
          :key="index"
          @click="onSearchByLabel(item)"
        >{{item}}</van-tag>
      </div>
      <div class="mb10">
        厂发薪资：<span class="money">{{jobInfo.SalaryByFactory}}</span>元/小时
      </div>
      <div>
        面试地址：{{jobInfo.CompanyAddress}}
      </div>
    </div>
    <div class="p10 card">
      <div class="f14 fb title">平台补贴</div>
      <div class="lh100" v-html="jobInfo.Allowance"></div>
    </div>
    <div class="p10 card">
      <div class="f14 fb title">薪资福利</div>
      <div class="lh100" v-html="jobInfo.SalaryDesc"></div>
    </div>
    <div class="p10 card">
      <div class="f14 fb title">录用条件</div>
      <div class="lh100" v-html="jobInfo.EmployCondition"></div>
    </div>
    <div class="p10 card">
      <div class="f14 fb title">岗位介绍</div>
      <div class="lh100" v-html="jobInfo.JobDesc"></div>
    </div>
    <div class="p10 card">
      <div class="f14 fb title">公司介绍</div>
      <div class="lh100" v-html="jobInfo.CompanyDesc"></div>
    </div>
    <div class="footer-bar" @click="apply">
      <div><span class="money">{{jobInfo.SalaryByFactory}}元/小时</span></div>
      <div>马上报名</div>
    </div>
  </div>
</template>

<script>
import { getH5JobInfo } from "@/api/job";
export default {
  name: "",
  data() {
    return {
      jobInfo: {}
    };
  },
  methods: {
    getH5JobInfo() {
      getH5JobInfo({ Id: this.$route.query.id })
        .then(res => {
          this.jobInfo = res;
        })
        .finally(() => {

        });
    },
    apply() {
      this.$toast('功能开发中...');
    }
  },
  created() {
    this.getH5JobInfo();
  }
};
</script>

<style lang="less" scoped>
.van-swipe-me {
  height: 200px;
  position: relative;
}
.money {
  display: inline-block;
  margin-right: 3px; 
  font-size: 16px;
  font-weight: bold;
  color: #fd9f2d;
}
.card {
  background: #ffffff;
  margin-bottom: 5px;
}
.footer-bar {
  text-align: center;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #0795EB;
  font-size: 16px;
  color: #ffffff;
  padding-top: 8px;
  box-sizing: border-box; 
}
</style>