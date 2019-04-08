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