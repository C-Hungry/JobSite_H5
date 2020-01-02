<template>
  <div class="container">
    <div class="f16 fb mb50">安薪打工</div>
    <div class="f28 fb mb15">
      在这里20余万人团高工资
    </div>
    <div class="f22 mb50">
      做自己的工头，赚自己的差价
    </div>
    <div class="f16 mb10">
      <van-icon size="20" class="vm" name="success" />
      海量企业，真实可靠
    </div>
    <div class="f16 mb10">
      <van-icon size="20" class="vm" name="success" />
      厂家直补数十亿
    </div>
    <div class="f16 mb10">
      <van-icon size="20" class="vm" name="success" />
      人均可领5000元
    </div>
    <div class="f16">
      <van-icon size="20" class="vm" name="success" />
      无中间环节，工资就是高
    </div>
    <div class="card">
      <img width="100px" height="100px" src="../../assets/images/myQR.png" alt="">
      <div class="text">
        <div class="mb5 f16 fb">关注我，不跑丢</div>
        <div style="color: #666;">一起来安鑫拿高工资</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  background-image: url(../../assets/images/join.png);
  background-size: 100% auto;
  padding: 30px;
  color: #ffffff;
  .card {
    background: #EDF5FD;
    border-radius: 8px;
    margin-top: 50px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .text {
      flex: 1;
      margin-left: 20px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>