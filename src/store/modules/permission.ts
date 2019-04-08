import { constantRouterMap, asyncRouterMap } from '@/routes/index';
import { RouteConfig } from 'vue-router';
import { PermissionState } from '@/interface/storeIF';
import { Commit } from 'vuex';
import { AsyncRouteParams } from '@/interface/paramsIF';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteConfig) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes: RouteConfig[], roles: string[]) {
    const res: RouteConfig[] = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRouter(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}
const state: PermissionState = {
    routers: constantRouterMap,
    addRouters: []
} 
const permission = {
    state,
    mutations: {
        SET_ROUTERS: (state: PermissionState, routers: RouteConfig[]) => {
            state.addRouters = routers
            state.routers = constantRouterMap.concat(routers)
        }
    },
    actions: {
        generateRoutes({ commit }: {commit: Commit}, data: AsyncRouteParams) {
            return new Promise(resolve => {
                const { roles } = data
                let accessedRouters: RouteConfig[]
                accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                // if (roles.includes('admin')) {
                //     accessedRouters = asyncRouterMap
                // } else {
                //     accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                // }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
};

export default permission