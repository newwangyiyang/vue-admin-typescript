import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Layout from '@/views/layout/Layout.vue'
Vue.use(Router)




// 固定展示的路由， 如果非开启权限分配功能，将全部路由添加到此处 ↓

// meta:  hidden: true 表不显示SliderBar侧边栏  title: '' 侧边栏名称  icon: '' 侧边栏图标 roles : [] 根据当前登录者的权限来渲染路由
// redirect: '' 表示点击面包屑跳转的链接

export const constantRouterMap: RouteConfig[] = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true } // 不显示layout
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { hidden: true },
    children: [{
      path: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue')
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example', roles: ['user'] },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    meta: {roles: ['admin']},
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import(/* webpackChunkName: "form" */ '@/views/form/index.vue'),
        meta: { title: '表单', icon: 'form' }
      }
    ]
  },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: { title: 'Nested', icon: 'nested' },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
  //       name: 'Menu2',
  //       meta: { title: 'Menu2' }
  //     }
  //   ]
  // },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/Armour/vue-typescript-admin-template',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },
]

//根据权限分配的路由
export const asyncRouterMap: RouteConfig[] = [
  {
    path: '/Admin',
    component: Layout,
    meta: { title: '管理员', icon: 'nested', roles: ['admin'] },
    children: [
      {
        path: 'index',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/index.vue'),
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
];




export default new Router({
  routes: constantRouterMap,
  scrollBehavior(to, from, savedPosition) {
    //设置所有跳转后的路由都滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
