<template>
  <div class="back">
    <van-icon @click="backToHome" class="vm" size="20" color="#333333" name="arrow-left" />
  </div>
</template>

<script>
  export default {
    name: 'back',
    methods: {
      backToHome() {
        if (history.length == 1) {
          this.$router.push({
            name: 'home'
          })
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .back {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 32px;
    height: 32px;
    background: rgba(153, 153, 153, 0.7);
    border-radius: 50%;
    z-index: 1000;
    text-align: center;
    line-height: 32px;
  }
</style>