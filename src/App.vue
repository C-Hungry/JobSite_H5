<template>
  <div id="app">
    <div class="main">
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    </div>
    <footer-bar v-if="!this.$route.meta.hideFooter"></footer-bar>
  </div>
</template>

<script>
import footerBar from '_c/footer-bar'
export default {
  name: 'App',
  components: {
    footerBar
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  // overflow: auto;
  margin: 0;
  padding: 0;
  color: #333;
}
#app {
  .size;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
    margin-bottom: 60px; 
  }
}
</style>
