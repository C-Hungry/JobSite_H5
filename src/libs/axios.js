import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import router from '@/router'
import { Toast } from 'Vant'
import { getToken } from '@/libs/util'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use((config) => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      config.data = config.data || {}
      if (config.data) {
        config.data.token = getToken() || ''
      }
      if (config.method === 'post') {
        config.data = qs.stringify(config.data)
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      if (data.ResponseID == 0) {
        return data.Data
      } else if (data.ResponseID == 1) {
        Toast(data.Message || '网络请求出错，请登录重试');
        if (data.Message == '登录失败' || data.Message == '用户信息异常，请联系管理员') {
          store.dispatch('handleLogOut').then(() => {
            router.push({
              name: 'mine'
            })
          })
        }
        return Promise.reject(data)
      } else {
        Toast(data.Message || '网络请求出错，请登录重试');
        if (data.Message == '登录失败' || data.Message == '用户信息异常，请联系管理员') {
          store.dispatch('handleLogOut').then(() => {
            router.push({
              name: 'mine'
            })
          })
        }
        return Promise.reject(data)
      }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
