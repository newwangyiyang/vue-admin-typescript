/**
 * 用户登录参数接口
 *
 * @export
 * @interface UserLogin
 */
export interface UserLogin {
    username: string
    password: string
}
/**
 * 动态路由传递参数
 *
 * @export
 * @interface AsyncRouteParams
 */
export interface AsyncRouteParams {
    roles: string[]
}

/***********************************************************************超级管理员Start */
/**
 * 账号密码登录
 *
 * @export
 * @interface addBossByAccountAndPassParamsIF
 */
export interface addBossByAccountAndPassParamsIF {
    account: string
    password: string
}
/**
 * 商家账号列表Item
 *
 * @export
 * @interface BossListItemIF
 */
export interface BossListItemIF {
    swBaId: string
    swBaAccount: string
    swBaCreatetime: number | string
    swBaPassword: string
}