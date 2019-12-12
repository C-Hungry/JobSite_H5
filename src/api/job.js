import axios from '@/libs/api.request'

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

// 岗位报名
export const applyJob = (data) => {
  return axios.request({
    url: '/api/H5/JobSignUp',
    data,
    method: 'post'
  })
}