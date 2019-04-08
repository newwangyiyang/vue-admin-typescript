import Cookies from 'js-cookie'
import { appState, DeviceType } from '@/interface/storeIF';
import { Commit } from 'vuex';

const state: appState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') !== 'closed',
    withoutAnimation: false
  },
  device: DeviceType.Desktop
}

const app = {
  state,
  mutations: {
    TOGGLE_SIDEBAR(state: appState, withoutAnimation: boolean) {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 'closed')
      } else {
        Cookies.set('sidebarStatus', 'opened')
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = withoutAnimation
    },
    CLOSE_SIDEBAR(state:appState, withoutAnimation: boolean) {
      Cookies.set('sidebarStatus', 'closed')
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE(state: appState, device: DeviceType) {
      state.device = device
    }
  },
  actions: {
    ToggleSideBar({commit}: {commit: Commit}, withoutAnimation: boolean) {
      commit('TOGGLE_SIDEBAR', withoutAnimation)
    },
    CloseSideBar({commit}: {commit: Commit}, withoutAnimation: boolean) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({commit}: {commit: Commit}, device: DeviceType) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}
export default app
