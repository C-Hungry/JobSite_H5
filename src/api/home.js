import axios from '@/libs/api.request'

export const getH5IndexData = () => {
  return axios.request({
    url: '/api/H5/H5IndexData',
    method: 'post'
  })
}

// 获取岗位列表
export const getJobList = (data) => {
  return axios.request({
    url: '/api/H5/H5JobList',
    data,
    method: 'post'
  })
}

// 获取岗位关键词列表
export const getJobKeyWordsList = (data) => {
  return axios.request({
    url: '/api/Job/JobKeyWordsList',
    data,
    method: 'post'
  })
}

// 获取岗位详情
export const getH5JobInfo = (data) => {
  return axios.request({
    url: '/api/H5/H5JobInfo',
    data,
    method: 'post'
  })
}