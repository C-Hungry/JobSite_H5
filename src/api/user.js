import axios from '@/libs/api.request'

// 获取岗位详情
export const wxLogin = (data) => {
  return axios.request({
    url: '/api/H5/WechatLogin',
    data,
    method: 'post'
  })
}
