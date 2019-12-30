<template>
  <div style="background: #eee;position: relative;">
    <back></back>
    <van-skeleton
      title
      :row="20"
      :loading="loading"
      :animate="false"
    >
      <van-swipe :autoplay="5000" class="van-swipe-me">
        <van-swipe-item v-for="(image, index) in jobInfo.Images" :key="index">
          <van-image width="100%" height="100%" fit="cover" lazy-load :src="image" />
        </van-swipe-item>
      </van-swipe>
      <div class="p10 card">
        <div class="f16 fb">{{jobInfo.Title}}</div>
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
        <div class="mb10 f14">
          厂发薪资：
          <span class="money">{{jobInfo.SalaryByFactory}}</span>元/小时
        </div>
        <div class="f14">面试地址：{{jobInfo.CompanyAddress}}</div>
      </div>
      <div class="p10 card f14">
        <div class="fb title"><van-icon class="vm" size="14" color="#0795eb" name="label-o" />平台补贴</div>
        <div class="lh100" v-html="jobInfo.Allowance"></div>
      </div>
      <div class="p10 card f14">
        <div class="fb title"><van-icon class="vm" size="14" color="#0795eb" name="label-o" />薪资福利</div>
        <div class="lh100" v-html="jobInfo.SalaryDesc"></div>
      </div>
      <div class="p10 card">
        <div class="f14 fb title"><van-icon class="vm" size="14" color="#0795eb" name="label-o" />录用条件</div>
        <div class="lh100 f14" v-html="jobInfo.EmployCondition"></div>
      </div>
      <div class="p10 card f14">
        <div class="f14 fb title"><van-icon class="vm" size="14" color="#0795eb" name="label-o" />岗位介绍</div>
        <div class="lh100" v-html="jobInfo.JobDesc"></div>
      </div>
      <div class="p10 card f14 pb50">
        <div class="f14 fb title"><van-icon class="vm" size="14" color="#0795eb" name="label-o" />公司介绍</div>
        <div class="lh100" v-html="jobInfo.CompanyDesc"></div>
      </div>
      <div class="footer-bar">
        <div class="left">
          <van-icon name="share" size="20" @click="share" />
          <div class="f14">分享</div>
        </div>
        <div class="right" @click="apply">
          <div>
            <span class="money">{{jobInfo.SalaryByFactory}}元/小时</span>
          </div>
          <div class="f14" style="margin-top: 3px;">马上报名</div>
        </div>
      </div>
    </van-skeleton>
    
    <van-popup
      v-model="isShowSharePopup"
      style="background: unset;width: 300px;height: 400px;overflow-y: unset;"
    >
      <img width="300px" :src="haibaoData" alt />
      <div class="tc" style="z-index: 10000;">
        <div style="color: #ffffff;margin-bottom:3px;z-index: 10000;" class="f14">长按海报下载并分享</div>
        <van-icon
          @click="isShowSharePopup=false"
          class="van-icon-me mt10"
          color="#eee"
          size="32"
          name="clear"
        />
      </div>
    </van-popup>
    <div
      ref="imageWrapper"
      style="position: fixed;
  background: unset;
  top: -10000px;
  color: #ffffff;
  width: 300px;
  height: 385px;"
      id="poster"
    >
      <img style="width: 300px;" :src="shareBg2Base64" alt />
      <div
        style="position: absolute;
    top: 40px;
    left: 36px;
    right: 30px;
    bottom: 80px;
    overflow: hidden;"
      >
        <div
          style="height: 60px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;"
        >
          <img
            style="width: 80px;
    height: 60px;
    border-radius: 4px;
    margin-right: 10px;"
            :src="shareMainImage2Base64"
            alt
          />
          <div>
            <div style="font-size: 14px;
    margin-bottom: 8px;">{{jobInfo.Title}}</div>
            <div class="poster-detail">
              工价：
              <span class="money">{{jobInfo.SalaryByFactory}}</span>
              <span class="unit">元/小时</span>
            </div>
          </div>
        </div>
        <div class="label" v-if="jobInfo.KeyWords">
          <div
            style="display: inline-block;
      height: 18px;
      line-height: 18px;
      background: #fd9f2d;
      margin-bottom: 6px;
      margin-right: 5px;
      padding: 0 8px;
      border-radius: 9px; "
            v-for="(item, index) in jobInfo.KeyWords.split(',')"
            :key="index"
            @click="onSearchByLabel(item)"
          >{{item}}</div>
        </div>
        <div class="jod-desc" v-html="jobInfo.JobDesc"></div>
      </div>
      <div style="position: absolute;
    bottom: 30px;
    right: 110px;">
        <div style="color: #fff;
      margin-bottom: 2px;">长按识别二维码</div>
        <div>查看详情/去报名</div>
      </div>
      <img
        style="position: absolute;
    bottom: 30px;
    right: 22px;
    width: 80px;
    height: 80px;"
        :src="qrData"
        alt
      />
    </div>
    <!-- <div ref="imageWrapper" id="poster">
        <img style="width: 300px;" :src="shareBg2Base64" alt="">
        <div class="poster">
          <div class="poster-info">
            <img class="poster-image" :src="shareMainImage2Base64" alt="">
            <div>
              <div class="poster-title">{{jobInfo.Title}}</div>
              <div class="poster-detail">工价：
                <span class="money">{{jobInfo.SalaryByFactory}}</span>
                <span class="unit">元/小时</span>
              </div>
            </div>
          </div>
          <div class="label" v-if="jobInfo.KeyWords">
            <div
              class="tag"
              v-for="(item, index) in jobInfo.KeyWords.split(',')"
              :key="index"
              @click="onSearchByLabel(item)"
            >{{item}}</div>
          </div>
          <div class="jod-desc" v-html="jobInfo.JobDesc"></div>
        </div>
        <div class="detail">
          <div class="top">长按识别二维码</div>
          <div>查看详情/去报名</div>
        </div>
        <img class="qr-img" :src="qrData" alt="">
    </div>-->
  </div>
</template>

<script>
var QRCode = require("qrcode");
import { getH5JobInfo, applyJob } from "@/api/job";
import html2canvas from "html2canvas";
import back from "_c/back"
export default {
  name: "",
  components: {
    back
  },
  data() {
    return {
      loading: false,
      isShowSharePopup: false,
      shareBg: require("../../assets/images/share-bg.png"),
      shareBg2Base64: "",
      shareMainImage2Base64: "",
      qrData: "",
      haibaoData: "",
      jobInfo: {}
    };
  },
  methods: {
    // 获取详情
    getH5JobInfo() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
      this.loading = true;
      getH5JobInfo({ Id: this.$route.query.id })
        .then(res => {
          let images = res.Images || [];
          res.MainImage = images[0] || "";
          this.jobInfo = res;
        })
        .finally(() => {
          this.loading = false;
          this.$toast.clear();
        });
    },
    // 生二维码
    qr() {
      let _this = this;
      let href = `${location.origin}?inviteCode=${this.$store.state.user.userInfo && this.$store.state.user.userInfo.PersonalCode || ""}${location.hash}`;
      QRCode.toDataURL(href, function(err, url) {
        _this.qrData = url;
      });
    },
    // 报名
    apply() {
      this.$toast.loading({
        message: "报名中...",
        forbidClick: true,
        duration: 0
      });
      applyJob({ Id: this.$route.query.id }).then(res => {
        this.$toast.success({
          message: "报名成功",
          forbidClick: true
        });
        this.$router.push({
          name: 'myJobs'
        })
      });
    },
    productionImage() {
      // 手动创建一个 canvas 标签
      const canvas = document.createElement("canvas");
      // 获取父标签，意思是这个标签内的 DOM 元素生成图片
      let canvasBox = this.$refs.imageWrapper;
      // 获取父级的宽高
      const width = parseInt(window.getComputedStyle(canvasBox).width);
      const height = parseInt(window.getComputedStyle(canvasBox).height);
      // 宽高 * 2 并放大 2 倍 是为了防止图片模糊
      canvas.width = width * 2;
      canvas.height = height * 2;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      const context = canvas.getContext("2d");
      context.scale(2, 2);
      const options = {
        backgroundColor: null,
        canvas: canvas,
        useCORS: true,
        scale: 1
      };
      window.pageYOffset = 0;
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      setTimeout(() => {
        html2canvas(canvasBox, options).then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          this.haibaoData = dataURL;
          this.$toast.clear();
          this.isShowSharePopup = true;
        });
      }, 100);
    },
    // 将图片转为base64格式
    img2base64(url, crossOrigin = "anonymous") {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement("canvas");
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const cxt = c.getContext("2d");
          cxt.drawImage(img, 0, 0);
          // 得到图片的base64编码数据
          resolve(c.toDataURL("image/png"));
        };
        // 结合合适的CORS响应头，实现在画布中使用跨域<img>元素的图像
        crossOrigin && img.setAttribute("crossOrigin", crossOrigin);
        img.src = url;
      });
    },
    share() {
      this.$toast.loading({
        message: "海报生成中...",
        forbidClick: true,
        duration: 0
      });
      this.img2base64(this.shareBg).then(res => {
        this.shareBg2Base64 = res;
        if (this.shareBg2Base64 && this.shareMainImage2Base64) {
          this.productionImage();
        }
      });
      this.img2base64(this.jobInfo.MainImage).then(res => {
        this.shareMainImage2Base64 = res;
        if (this.shareBg2Base64 && this.shareMainImage2Base64) {
          this.productionImage();
        }
      });
    }
  },
  created() {
    this.qr();
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
  .van-icon {
    margin-right: 2px;
    margin-top: -3px;
  }
}
.footer-bar {
  text-align: center;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  .left {
    padding-top: 8px;
    width: 80px;
    background: #fff;
  }
  .right {
    padding-top: 8px;
    flex: 1;
    background: #0795eb;
    color: #ffffff;
  }
}
// #poster {
//   position: fixed;
//   top: -10000px;
//   color: #ffffff;
//   background: unset;
//   width: 300px;
//   .poster {
//     position: absolute;
//     top: 40px;
//     left: 36px;
//     right: 30px;
//     bottom: 80px;
//     overflow: hidden;
//   }
//   .poster-info {
//     height: 60px;
//     display: flex;
//     align-items: center;
//     margin-bottom: 10px;
//   }
//   .poster-image {
//     width: 80px;
//     height: 60px;
//     border-radius: 4px;
//     margin-right: 10px;
//   }
//   .poster-title {
//     font-size: 14px;
//     margin-bottom: 8px;
//   }
//   .label {
//     .tag {
//       display: inline-block;
//       height: 18px;
//       line-height: 18px;
//       background: #fd9f2d;
//       margin-bottom: 6px;
//       margin-right: 5px;
//       padding: 0 8px;
//       border-radius: 9px;
//     }
//   }
//   .detail {
//     position: absolute;
//     bottom: 30px;
//     right: 110px;
//     .top {
//       color: #fff;
//       margin-bottom: 2px;
//     }
//   }
//   .qr-img {
//     position: absolute;
//     bottom: 30px;
//     right: 22px;
//     width: 80px;
//     height: 80px;
//   }
//   .van-icon-me {
//     display: inline-block;
//     z-index: 10000;

//   }
// }
</style>