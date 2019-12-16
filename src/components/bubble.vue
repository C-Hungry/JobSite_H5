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
        default: 65
      },
      path: {
        type: String,
        default: ''
      }
    },
    methods: {
      goToPath() {
        if (!this.path) {
          this.$toast('请绑定path')
          return
        }
        this.$router.push({
          path: this.path
        })
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
    border: 1px solid #1585F5;
    background-color: #1585F5;
    color: #ffffff;
    text-align: center;
    line-height: 20px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 8px;
  }
</style>