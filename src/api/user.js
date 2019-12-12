import axios from '@/libs/api.request'

// 微信登录
export const wxLogin = (data) => {
  return axios.request({
    url: '/api/H5/WechatLogin',
    data,
    method: 'post'
  })
}
