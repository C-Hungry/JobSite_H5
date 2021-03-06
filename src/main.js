// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import i18n from '@/locale'
import config from '@/config'
// import FastClick from 'fastclick'
import 'normalize.css/normalize.css'
import 'lib-flexible/flexible.js'
import '@/assets/styles/common.less'
import '@/assets/icons/iconfont.css'
import Vant from 'vant'
import { Lazyload } from 'vant'
import 'vant/lib/index.css'
import moment from 'moment'

Vue.use(Vant);
Vue.use(Lazyload);

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
Vue.prototype.$moment = moment

// FastClick.prototype.focus = () => {
//   let length = 0;
//   let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

// }

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      // FastClick.attach(document.body)
    },
    false
  )
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // i18n,
  store,
  render: h => h(App)
})
