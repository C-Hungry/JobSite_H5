import { wxLogin } from '@/api/user'
import { setToken, getToken, setAccess, getAccess, setUserName, getUserName, setUserInfo, getUserInfo } from '@/libs/util'

export default {
  state: {
    userName: getUserName(),
    userInfo: getUserInfo(),
    token: getToken(),
    access: getAccess()
  },
  getters: {
    isAdmin: state => {
      return state.access == 'admin'
    }
  },
  mutations: {
    setUserName (state, name) {
      state.userName = name
      setUserName(name)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setUserName(userInfo)
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setAccess (state, access) {
      state.access = access
      setAccess(access)
    }
  },
  actions: {
    // 微信授权
    handleWeChatAuth ({ commit }, { inviteCode }) {
      let appId = 'wx0e88ca5bb6a2a776';
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
          commit('setUserName', data.NickName)
          commit('setUserInfo', data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 推出清空用户信息
    handleLogOut({ commit }) {
      commit('setToken', "")
      commit('setUserName', data.NickName)
      commit('setUserInfo', data)
    }
  }
}
