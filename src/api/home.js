import axios from '@/libs/api.request'

export const getH5IndexData = () => {
  return axios.request({
    url: '/api/H5/H5IndexData',
    method: 'post'
  })
}
