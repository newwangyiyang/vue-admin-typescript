import { loginByAccountAndPassword, getUserInfoByToken } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

import { UserState } from '@/interface/storeIF';
import { UserLogin } from '@/interface/paramsIF';
import { Commit } from 'vuex';

const state: UserState = {
    token: '',
    name: '',
    avatar: '',
    roles: []
}

interface userInfo {
  swBiName: string
  swBiAddress: string
  swBiLogo: string
  roles: string[]
}

const user = {
  state,
  mutations: {
      SET_TOKEN(state: UserState, token: string) {
        state.token = token
      },
      SET_NAME(state: UserState, name: string) {
        state.name = name
      },
      SET_ROLES(state: UserState, roles: string[]) {
        state.roles = roles
      },
      SET_USER(state: UserState, user: userInfo) {
        state.name = user.swBiName
        state.avatar = user.swBiLogo
        state.roles = user.roles
      },
      BLANK_USER(state: UserState) {
        state.name = ''
        state.avatar = ''
        state.roles = []
        state.token = ''
      }
  },
  actions: {
      async login({commit}: {commit: Commit}, userInfo: UserLogin) { // 1、登录login, 获取Token
        const res: Ajax.AxiosResponse = await loginByAccountAndPassword(userInfo)
        const { data } = res
        if(data.code === 0) {
          setToken(data.data)
          commit('SET_TOKEN', data.data)
          return data.data
        } else {
          throw Error(data.msg)
        }
        
      },
      async getUserInfo({commit}: {commit: Commit}) { // 2、根据Token来获取用户信息
          const token = getToken()
          if (token === undefined) {
            throw Error('GetUserInfo: token is undefined!')
          }
          const res: Ajax.AxiosResponse= await getUserInfoByToken() // 请求后台接口
          const { data } = res
          // const res: UserState = {name: '王一扬', roles: ['user'], token: '32132131', avatar: 'http://tx.haiqq.com/uploads/allimg/150411/1640504941-14.jpg'}
          if(data.code === 0) {
            commit('SET_USER', data.data)
          }
      },
      async LogOut({commit}: {commit: Commit}) { // 3、用户退出登录 token跟roles置空
        removeToken()
        commit('BLANK_USER')
      }
  }
};

export default user;
