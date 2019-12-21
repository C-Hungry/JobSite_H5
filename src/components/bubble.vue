<template>
  <div class="bubble" :style="{'bottom': bottom + 'px'}" @click="goToPath">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'bubble',
    props: {
      bottom: {
        type: Number,
        default: 80
      },
      path: {
        type: String,
        default: ''
      },
      replace: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      goToPath() {
        if (!this.path) {
          this.$toast('请绑定path')
          return
        }
        if (this.replace) {
          this.$router.replace({
            path: this.path
          })
        } else {
          this.$router.push({
            path: this.path
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .bubble {
    position: fixed;
    right: 15px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #ffffff;
    background-color: #ffffff;
    box-shadow: 0 0 10px #aaa;
    color: #1585F5;
    // border: 1px solid #1585F5;
    // background-color: #1585F5;
    // color: #ffffff;
    text-align: center;
    line-height: 21px;
    font-size: 15px;
    box-sizing: border-box;
    padding: 8px;
  }
</style>