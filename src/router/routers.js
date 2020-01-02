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
    path: '/myQR',
    name: 'myQR',
    meta: {
      title: '安薪打工',
      keepAlive: true,
      hideFooter: true
    },
    component: () => import('@/view/home/myQR')
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
  },
  {
    path: '/myJobs',
    name: 'myJobs',
    meta: {
      title: '我的工作'
    },
    component: () => import('@/view/mine/myJobs')
  },
  {
    path: '/myWallet',
    name: 'myWallet',
    meta: {
      title: '我的钱包'
    },
    component: () => import('@/view/mine/myWallet')
  },
  {
    path: '/cashOutRecord',
    name: 'cashOutRecord',
    meta: {
      title: '提现记录'
    },
    component: () => import('@/view/mine/cashOutRecord')
  },
  {
    path: '/myInvite',
    name: 'myInvite',
    meta: {
      title: '我的推荐'
    },
    component: () => import('@/view/mine/myInvite')
  },
]
