<template>
  <div>
    <van-swipe :autoplay="5000" class="van-swipe-me">
      <van-swipe-item v-for="(image, index) in bannerList" :key="index">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          lazy-load
          :src="image"
        />
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar text="通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容通知内容" left-icon="volume-o" />
    <van-grid :gutter="10" :column-num="4" :border="false" class="mt5">
      <van-grid-item class="tc">
        <div slot="default">
          <img height="60px" src="https://niuzhigongzuo.com/static/images/index/index-shortcut-my-job.png" alt="">
          <div>我的工作</div>
        </div>
      </van-grid-item>
      <van-grid-item class="tc" icon="photo-o">
        <div slot="default">
          <img height="60px" src="https://niuzhigongzuo.com/static/images/index/index-shortcut-refer.png" alt="">
          <div>推荐有奖</div>
        </div>
      </van-grid-item>
    </van-grid>
    <van-grid :gutter="10" :column-num="3" :border="false" class="mt5">
      <van-grid-item class="tc">
        <div slot="default">
          <van-image
            width="60px"
            height="60px"
            fit="cover"
            lazy-load
            src="https://niuzhigongzuo.com/static/images/index/index-shortcut-my-job.png"
          />
          <div>我的工作</div>
        </div>
      </van-grid-item>
      <van-grid-item class="tc" icon="photo-o">
        <div slot="default">
          <van-image
            width="60px"
            height="60px"
            fit="cover"
            lazy-load
            src="https://niuzhigongzuo.com/static/images/index/index-shortcut-refer.png"
          />
          <!-- <img src="https://niuzhigongzuo.com/static/images/index/index-shortcut-refer.png" alt=""> -->
          <div>推荐有奖</div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      bannerList: [
        'https://cos.niuzhigongzuo.com/banner/aabf5668-265b-4026-a804-0e8241312856-1573223904943.png',
        'https://cos.niuzhigongzuo.com/banner/ec8f44f5-edca-4b8e-981f-61bdae1cc3b8-1573223999069.png',
        'https://cos.niuzhigongzuo.com/banner/0d164ec7-0048-4dee-914e-78481e0db80f-1573223958085.png'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.van-swipe-me {
  height: 136px;
}
</style>
