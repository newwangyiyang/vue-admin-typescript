import router from './routes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import { Route } from 'vue-router'
import store from './store'
import _ from 'lodash'
import Vue from 'vue'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start()

  // 动态设置title***start***
  if(to.meta.title) {
    document.title = to.meta.title
  }
  // 动态设置title***end***  

  if (Vue.prototype.$openPremission) { // 开启权限
      // store.getters.token  // 从store中获取token
      if(getToken()) { // 如果存在token， 则进行token验证 ，，，通过Login登录页面来获取token   （就分是否有Token两大类）
        // 判断是否是login ,当存在token会直接跳转到首页，调用else语句，进行信息的获取， 不要想的太复杂
        if(to.path === '/login') {
          next('/')
          NProgress.done()
        } else {
          if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
            try {
              await store.dispatch('getUserInfo')
              const roles = store.getters.roles
              store.dispatch('generateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
              })
            }catch(err) { // 请求接口异常则直接跳转到登录页面
              console.log(err)
              Message('登录异常，请重新登录')
              next({path: '/login'})
            }
          } else { // 如果已经存在roles信息，则全部放行
            next();
          }
        }
      } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
          next()
        } else {
          // 此处必须要有redirect参数，不然路由会进入死循环
          next({path: `/login?redirect=${to.path}`}) // 否则全部重定向到登录页
        }
      }
  } else {
    //用户没有开启权限，放开所有
    next();
  }


  // if (getToken()) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done() // If current page is dashboard will not trigger afterEach hook, so manually handle it
  //   } else {
  //     if (store.getters.roles.length === 0) {
  //       const res = await store.dispatch('getUserInfo')
  //       if(_.isEqual(res.code, 0)) {
  //         next()
  //       } else { //请求出错
  //         Message.error(res.msg)
  //         next({ path: '/' })
  //       }
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`) // Redirect to login page
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done()
})
