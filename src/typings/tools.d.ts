declare module 'qs' // form表单POST提交，对参数序列化
declare module 'vue-clipboard2' // 复制
declare module 'vue-sticky' // 吸顶
declare module 'store' // 本地存储
// 将axios的返回值定义到全局ajax下
declare namespace Ajax {
    // axios 返回数据
    export interface AxiosResponse {
      data: AjaxResponse
    }
  
    // 请求接口数据
    export interface AjaxResponse {
      code?: number,
      data: any,
      msg: string,
      statusCode?: number
    }
}
