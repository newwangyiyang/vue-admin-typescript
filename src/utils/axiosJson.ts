import axios from 'axios';

/**
 * process.env.VUE_APP_BASE_URL
 * Vue/cli3.0中配置全局环境变量
 * 根目录创建.env.development和.env.production文件 (区分开发和生产环境)
 * 里面的键值对必须以VUE_APP开头 VUE_APP_NAME=万一一样
 * 通过process.env.VUE_APP_NAME进行访问
 */

//以application/json进行提交
const axiosJson = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 30000,
    headers: {'Content-Type': 'application/json;charset=UTF-8'}
});

// request interceptor
axiosJson.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})


axiosJson.interceptors.response.use((res) => {
    if (res.status !== 200) {
      throw new Error('请求错误');
    }
    return res.data;
  }, (error) => {
    return Promise.reject(error);
});

export default axiosJson;