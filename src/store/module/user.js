import { wxLogin } from '@/api/user'
import router from '@/router'
import { Dialog } from 'vant'
import config from '@/config'
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
      commit('setUserName', "")
      commit('setUserInfo', null)
    },
    // 验证是否绑定手机号码
    handleAuthPhone({state, commit}) {
      if (state.userInfo && !state.userInfo.Phone) {
        router.push({
          name: 'bindPhone'
        })
        // Dialog.alert({
        //   title: '温馨提示',
        //   message: '请先绑定手机号码',
        //   confirmButtonText: '立即绑定',
        //   closeOnPopstate: false
        // }).then(() => {
        //   router.push({
        //     name: 'bindPhone'
        //   })
        // });
      }
    },
  }
}
