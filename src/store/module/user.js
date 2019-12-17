import { wxLogin, queryUserInfo } from '@/api/user'
import config from '@/config'
import { setToken, getToken, setUserInfo, getUserInfo } from '@/libs/util'

export default {
  state: {
    userInfo: getUserInfo(),
    token: getToken()
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setUserInfo(userInfo)
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 微信授权
    handleWeChatAuth ({ commit }, { inviteCode }) {
      let appId = process.env.NODE_ENV === 'development' ? config.appId.dev : config.appId.pro;
      let redirect_uri = encodeURIComponent(location.href);
      location.href= `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${inviteCode}#wechat_redirect`
    },
    // 微信登录
    handleWeChatLogin ({ commit }, { code, inviteCode }) {
      return new Promise((resolve, reject) => {
        wxLogin({
          Code: code,
          InviteCode: inviteCode
        }).then(data => {
          commit('setToken', data.token)
          commit('setUserInfo', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    handleGetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        queryUserInfo().then(data => {
          commit('setUserInfo', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出清空用户信息
    handleLogOut({ commit }) {
      commit('setToken', "")
      commit('setUserInfo', null)
    }
  }
}
