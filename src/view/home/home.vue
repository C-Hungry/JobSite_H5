<template>
  <div class="home">
    <van-swipe :autoplay="5000" class="van-swipe-me">
      <van-swipe-item v-for="(image, index) in homeData.TopBanners" :key="index">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          lazy-load
          :src="image"
        />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar text="李**刚才报名了无锡岗位，刘*刚才报名了昆山岗位，王**刚才报名了郑州岗位，张**刚才报名了郑州岗位，张*刚才报名了深圳岗位，刘*刚才报名了昆山岗位" left-icon="volume-o" />
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
    <van-grid :column-num="3" :border="false" class="mt5">
      <van-grid-item class="tc">
        <div slot="default" class="job-classify job-popularity">
          <div class="job-classify-content">
            <van-image width="18" height="18" src="https://niuzhigongzuo.com/static/images/index/index-classify-hot-job.png"></van-image>
            <span>人气岗位</span>
          </div>
          <div>报名最多的岗位</div>
        </div>
      </van-grid-item>
      <van-grid-item class="tc">
        <div slot="default" class="job-classify job-new">
          <div class="job-classify-content">
            <van-image width="18" height="18" src="https://niuzhigongzuo.com/static/images/index/index-classify-new-job.png"></van-image>
            <span>最新岗位</span>
          </div>
          <div>最新发布的岗位</div>
        </div>
      </van-grid-item>
      <van-grid-item class="tc">
        <div slot="default" class="job-classify job-hot">
          <div class="job-classify-content">
            <van-image width="18" height="18" src="https://niuzhigongzuo.com/static/images/index/index-classify-hight-rate-job.png"></van-image>
            <span>热评岗位</span>
          </div>
          <div>评价最高的岗位</div>
        </div>
      </van-grid-item>
    </van-grid>
    <div class="mt20 mb20 tc">
      <van-image
        width="170"
        fit="contain"
        src="https://niuzhigongzuo.com/static/images/index/index-hot-job.png"
      />
    </div>
    <ul class="job-list">
      <li class="job-item" v-for="(item, index) in homeData.HotJobs" :key="index">
        <div class="job-image mr10">
          <van-image width="80" height="60" fit="contain" :src="item.MainImage"></van-image>
        </div>
        <div class="job-info">
          <div class="title te-1">{{item.Title}}</div>
          <div class="keyword te-1">{{item.KeyWords}}</div>
          <div><span class="salary">{{item.TotalSalary}}</span>元/月</div>
        </div>
        <div class="job-join">
          <div class="title">工价</div>
          <div class="salary-hour">{{item.SalaryByFactory}}元/小时</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getH5IndexData } from '@/api/home'
export default {
  name: 'home',
  data () {
    return {
      homeData: {
        CenterBanners: [],
        HotJobs: [],
        NavigateIcons: [],
        RecommendJobs: [],
        TopBanners: []
      }
    }
  },
  methods: {
    getH5IndexData() {
      getH5IndexData().then(res => {
        this.homeData = res;
        if (this.homeData.HotJobs && this.homeData.HotJobs.length) {
          this.homeData.HotJobs.map(item =>{
            item.MainImage = item.Images && item.Images.length && item.Images[0] || ''
          })
        }
      })
    },
    toJobList() {
      this.$router.push({
        path: '',
        query: {

        }
      })
    }
  },
  created() {
    this.getH5IndexData();
  }
}
</script>

<style lang="less" >
  .home .van-grid-item__content {
    padding: 0;
  }
</style>

<style lang="less" scoped>
.van-swipe-me {
  height: 136px;
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
    &>span {
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
    .job-image {

    }
    .job-info {
      flex: 1;
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
        color: #FD9F2D;
        display: inline-block;
        margin-right: 2px;
        font-weight: bold; 
      }
    }
    .job-join {
      width: 76px;
      height: 40px;
      border: 1px solid #FD9F2D;
      text-align: center;
      line-height: 20px;
      border-radius: 3px;
      .title {
        height: 20px;
        background: #FD9F2D;
        color: #ffffff;
      }
      .salary-hour {
        height: 20px;
        color: #FD9F2D;
      }
    }
  }
}

</style>
