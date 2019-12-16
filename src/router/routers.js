export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      keepAlive: true
    },
    component: () => import('@/view/home/home')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      title: '搜索'
    },
    component: () => import('@/view/search/search')
  },
  {
    path: '/mine',
    name: 'mine',
    meta: {
      title: '我的'
    },
    component: () => import('@/view/mine/mine')
  },
  {
    path: '/bindPhone',
    name: 'bindPhone',
    meta: {
      title: '绑定手机号',
      // hideFooter: true
    },
    component: () => import('@/view/mine/bindPhone')
  },
  {
    path: '/jobList',
    name: 'jobList',
    meta: {
      title: '岗位列表'
    },
    component: () => import('@/view/job/jobList')
  },
  {
    path: '/jobDetail',
    name: 'jobDetail',
    meta: {
      title: '岗位详情',
      hideFooter: true
    },
    component: () => import('@/view/job/jobDetail')
  },
  {
    path: '/improveUserInfo',
    name: 'improveUserInfo',
    meta: {
      title: '完善资料'
    },
    component: () => import('@/view/mine/improveUserInfo')
  },
  {
    path: '/bindBankCard',
    name: 'bindBankCard',
    meta: {
      title: '绑定补贴卡'
    },
    component: () => import('@/view/mine/bindBankCard')
  },
  {
    path: '/myConsult',
    name: 'myConsult',
    meta: {
      title: '我的咨询'
    },
    component: () => import('@/view/mine/myConsult')
  },
  {
    path: '/consult',
    name: 'consult',
    meta: {
      title: '免费咨询'
    },
    component: () => import('@/view/mine/consult')
  }
]
