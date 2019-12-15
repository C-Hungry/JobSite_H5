import axios from '@/libs/api.request'

// 微信登录
export const wxLogin = (data) => {
  return axios.request({
    url: '/api/H5/WechatLogin',
    data,
    method: 'post'
  })
}
// 绑定手机号码
export const bindPhone = (data) => {
  return axios.request({
    url: '/api/H5/BindPhone',
    data,
    method: 'post'
  })
}

// 完善资料
export const improveUserInfo = (data) => {
  return axios.request({
    url: '/api/H5/ImproveUserInfo',
    data,
    method: 'post'
  })
}

// 绑定银行卡
export const bindBankCard = (data) => {
  return axios.request({
    url: '/api/H5/BindBankCard',
    data,
    method: 'post'
  })
}

// 我的工作
export const myJobs = (data) => {
  return axios.request({
    url: '/api/H5/MyJobs',
    data,
    method: 'post'
  })
}

// 我的推荐
export const inviteUsers = (data) => {
  return axios.request({
    url: '/api/H5/InviteUsers',
    data,
    method: 'post'
  })
}

// 我的咨询
export const myQuestions = (data) => {
  return axios.request({
    url: '/api/H5/MyQuestions',
    data,
    method: 'post'
  })
}

// 发起咨询
export const questionAdd = (data) => {
  return axios.request({
    url: '/api/H5/QuestionAdd',
    data,
    method: 'post'
  })
}

// 提现申请
export const applyCashout = (data) => {
  return axios.request({
    url: '/api/H5/ApplyCashout',
    data,
    method: 'post'
  })
}

// 发起咨询
export const cashOutList = (data) => {
  return axios.request({
    url: '/api/H5/CashOutList',
    data,
    method: 'post'
  })
}