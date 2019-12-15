<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" @refresh="getH5IndexData">
      <div class="pa">
        <van-search
          @click="toSearch"
          background="rgb(255, 255, 255, 0)"
          shape="round"
          class="van-search-me"
          placeholder="请输入搜索关键词"
          disabled
        />
        <van-swipe :autoplay="5000" class="van-swipe-me">
          <van-swipe-item v-for="(image, index) in homeData.TopBanners" :key="index">
            <van-image width="100%" height="100%" fit="cover" lazy-load :src="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <van-notice-bar
        :text="homeData.Tips"
        left-icon="volume-o"
      />
      <van-grid :gutter="10" :column-num="4" :border="false" class="mt5">
        <van-grid-item class="tc" icon="photo-o">
          <div slot="default">
            <van-image width="60" height="60" :src="homeData.NavigateIcons[0]"></van-image>
            <div>我的咨询</div>
          </div>
        </van-grid-item>
        <van-grid-item class="tc" icon="photo-o">
          <div slot="default">
            <van-image width="60" height="60" :src="homeData.NavigateIcons[1]"></van-image>
            <div>我的工作</div>
          </div>
        </van-grid-item>
        <van-grid-item class="tc pt10 pb10">
          <div slot="default">
            <van-image width="60" height="60" :src="homeData.NavigateIcons[2]"></van-image>
            <div>门店岗位</div>
          </div>
        </van-grid-item>
        <van-grid-item class="tc" icon="photo-o">
          <div slot="default">
            <van-image width="60" height="60" :src="homeData.NavigateIcons[3]"></van-image>
            <div>推荐有奖</div>
          </div>
        </van-grid-item>
      </van-grid>
      <!-- 岗位类型 -->
      <van-grid :column-num="3" :border="false" class="mt5">
        <van-grid-item class="tc" @click="toJobList(1)">
          <div slot="default" class="job-classify job-new">
            <div class="job-classify-content">
              <van-image width="18" height="18" :src="icon2"></van-image>
              <span>最新岗位</span>
            </div>
            <div>最新发布的岗位</div>
          </div>
        </van-grid-item>
        <van-grid-item class="tc" @click="toJobList(2)">
          <div slot="default" class="job-classify job-popularity">
            <div class="job-classify-content">
              <van-image width="18" height="18" :src="icon1"></van-image>
              <span>人气岗位</span>
            </div>
            <div>报名最多的岗位</div>
          </div>
        </van-grid-item>
        <van-grid-item class="tc" @click="toJobList(3)">
          <div slot="default" class="job-classify job-hot">
            <div class="job-classify-content">
              <van-image width="18" height="18" :src="icon3"></van-image>
              <span>热评岗位</span>
            </div>
            <div>评价最高的岗位</div>
          </div>
        </van-grid-item>
      </van-grid>
      <!-- 门店推荐 -->
      <template v-if="homeData.RecommendJobs.length > 0">
        <div class="mt20 mb20 tc">
          <van-image width="170" fit="contain" :src="icon5" />
        </div>
        <ul class="job-list">
          <li class="job-item" @click="toJobDetail(item)" v-for="(item, index) in homeData.RecommendJobs" :key="index">
            <div class="job-image mr10">
              <van-image width="80" height="60" fit="cover" :src="item.MainImage"></van-image>
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
      </template>
      <!-- 热门岗位 -->
      <template v-if="homeData.HotJobs.length > 0">
        <div class="mt20 mb20 tc">
          <van-image width="170" fit="contain" :src="icon4" />
        </div>
        <ul class="job-list">
          <li class="job-item" @click="toJobDetail(item)" v-for="(item, index) in homeData.HotJobs" :key="index">
            <div class="job-image mr10">
              <van-image width="80" height="60" fit="cover" :src="item.MainImage"></van-image>
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
      </template>
      <!-- 中间banner -->
      <div class="mt10 mb10" v-if="homeData.CenterBanners && homeData.CenterBanners[0]">
        <van-image fit="contain" :src="homeData.CenterBanners[0]" />
      </div>
      <!-- 其他岗位 -->
      <template v-if="homeData.OtherJobs.length > 0">
        <ul class="job-list">
          <li class="job-item" @click="toJobDetail(item)" v-for="(item, index) in homeData.OtherJobs" :key="index">
            <div class="job-image mr10">
              <van-image width="80" height="60" fit="cover" :src="item.MainImage"></van-image>
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
          <li class="nodata">没有更多了</li>
        </ul>
      </template>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getH5IndexData } from "@/api/home";
import { getJobList } from "@/api/job";
export default {
  name: "home",
  data() {
    return {
      isLoading: false,
      homeData: {
        CenterBanners: [],
        HotJobs: [],
        NavigateIcons: [],
        RecommendJobs: [],
        TopBanners: [],
        OtherJobs: [],
        Tips: ''
      },
      jobList: [],
      jobParam: {
        PageIndex: 1,
        PageSize: 20
      },
      icon1: require("../../assets/images/index-classify-hot-job.png"),
      icon2: require("../../assets/images/index-classify-new-job.png"),
      icon3: require("../../assets/images/index-classify-hight-rate-job.png"),
      icon4: require("../../assets/images/rmgw.png"),
      icon5: require("../../assets/images/mdtj.png")
    };
  },
  methods: {
    getH5IndexData() {
      this.isLoading = true;
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      getH5IndexData()
        .then(res => {
          this.homeData = res;
          if (this.homeData.HotJobs && this.homeData.HotJobs.length) {
            this.homeData.HotJobs.map(item => {
              let images = item.Images && JSON.parse(item.Images) || [];
              item.MainImage = images[0] || "";
            });
          }
          if (this.homeData.RecommendJobs && this.homeData.RecommendJobs.length) {
            this.homeData.RecommendJobs.map(item => {
              let images = item.Images && JSON.parse(item.Images) || [];
              item.MainImage = images[0] || "";
            });
          }
          if (this.homeData.OtherJobs && this.homeData.OtherJobs.length) {
            this.homeData.OtherJobs.map(item => {
              let images = item.Images && JSON.parse(item.Images) || [];
              item.MainImage = images[0] || "";
            });
          }
          this.homeData.Tips = '李**刚才报名了无锡岗位，刘*刚才报名了昆山岗位，王**刚才报名了郑州岗位，张**刚才报名了郑州岗位，张*刚才报名了深圳岗位，刘*刚才报名了昆山岗位'
        })
        .finally(() => {
          this.$toast.clear();
          this.isLoading = false;
        });
    },
    toJobList(sortType) {
      this.$router.push({
        path: "/jobList",
        query: {
          sortType: sortType
        }
      });
    },
    toJobDetail(item) {
      this.$router.push({
        path: "/jobDetail",
        query: {
          id: item.Id
        }
      });
    },
    toSearch() {
      this.$router.push({
        path: "/search"
      });
    }
  },
  created() {
    this.getH5IndexData();
  }
};
</script>

<style lang="less" >
.home .van-grid-item__content {
  padding: 0;
}
</style>

<style lang="less" scoped>
.van-swipe-me {
  height: 150px;
  position: relative;
}
.van-search-me {
  position: absolute;
  top: 0;
  left: 10px;
  right: 10px;
  z-index: 100;
}
.job-classify {
  border-radius: 6px;
  padding: 10px 15px;
  color: #aab0c0;
  &-content {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    & > span {
      display: inline-block;
      margin-left: 3px;
      font-size: 14px;
      color: #000000;
    }
  }
}
.job-popularity {
  background-color: #fff1ef;
}
.job-new {
  background-color: #f1f6ff;
}
.job-hot {
  background-color: #fff6e9;
}

.job-list {
  padding: 0 10px;
  .job-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    margin-top: 5px;
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
.nodata {
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: #aab0c0;
}
</style>
