import axios from '@/libs/api.request'

// 获取首页数据
export const getH5IndexData = () => {
  return axios.request({
    url: '/api/H5/H5IndexData',
    method: 'post'
  })
}
