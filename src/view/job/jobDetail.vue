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
        厂发薪资：
        <span class="money">{{jobInfo.SalaryByFactory}}</span>元/小时
      </div>
      <div>面试地址：{{jobInfo.CompanyAddress}}</div>
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
    <van-popup v-model="isShowSharePopup" style="background: unset;width: 300px;height: 400px;">
      <div ref="imageWrapper" id="poster" @click="productionImage">
        <img style="width: 300px;" :src="shareBg2Base64" alt="">
        <img class="poster-image" :src="shareMainImage2Base64" alt="">
        <div class="poster-title">{{jobInfo.Title}}</div>
        <div class="poster-detail">{{jobInfo.Title}}</div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getH5JobInfo, applyJob } from "@/api/job";
import html2canvas from "html2canvas";
export default {
  name: "",
  data() {
    return {
      loading: false,
      isShowSharePopup: false,
      shareBg: require('../../assets/images/share-bg.png'),
      shareBg2Base64: "",
      shareMainImage2Base64: "",
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
      getH5JobInfo({ Id: this.$route.query.id })
        .then(res => {
          let images = res.Images || [];
          res.MainImage = images[0] || "";
          this.jobInfo = res;
        })
        .finally(() => {
          this.$toast.clear();
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
        useCORS: true
      };
      html2canvas(canvasBox, options).then(canvas => {
        // toDataURL 图片格式转成 base64
        let dataURL = canvas.toDataURL("image/png");
        this.downloadImage(dataURL);
      });
    },
    downloadImage(url) {
      // 创建一个 img 标签，把图片插入到 DOM 中
      // 这里使用 img 是因为在客户端中，不能直接下载，要调用原生的方法
      // const parents = this.$refs.selfReport;
      const createImg = document.createElement("img");
      // const insertEle = this.$refs.insetElement;
      // parents.insertBefore(createImg, parents.childNodes[0]);

      createImg.setAttribute("src", url);

      // 如果是在网页中可以直接创建一个 a 标签直接下载
      let a = document.createElement("a");
      a.href = url;
      a.download = new Date().getTime() + ".png";
      a.click();
    },
    // 将图片转为base64格式
    img2base64(url, crossOrigin = 'anonymous') {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = img.naturalWidth;
          c.height = img.naturalHeight;
          const cxt = c.getContext('2d');
          cxt.drawImage(img, 0, 0);
          // 得到图片的base64编码数据
          resolve(c.toDataURL('image/png'));
        };
        // 结合合适的CORS响应头，实现在画布中使用跨域<img>元素的图像
        crossOrigin && img.setAttribute('crossOrigin', crossOrigin);
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
          this.isShowSharePopup = true;
          this.$toast.clear();
        }
      })
      this.img2base64(this.jobInfo.MainImage).then(res => {
        this.shareMainImage2Base64 = res;
        if (this.shareBg2Base64 && this.shareMainImage2Base64) {
          this.isShowSharePopup = true;
          this.$toast.clear();
        }
      })
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
#poster {
  position: relative;
  color: #ffffff;
  .poster-image {
    width: 80px;
    height: 60px;
    position: absolute;
    top: 50px;
    left: 40px;
    z-index: 100;
  }
  .poster-title {
    position: absolute;
    top: 50px;
    left: 40px;
    right: 40px;
    font-size: 16px;
  }
  .poster-detail {
    position: absolute;
    top: 30px;
  }
}
</style>