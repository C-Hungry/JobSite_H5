<template>
  <div id="app">
    <div class="main">
      <router-view/>
    </div>
    <footer-bar></footer-bar>
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
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
  }
}
</style>
