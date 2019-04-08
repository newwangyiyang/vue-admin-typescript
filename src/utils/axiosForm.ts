import axios from 'axios'
// 该qs模块需额外在 tools.d.ts进行引入
import qs from 'qs'

//已form表单进行提交
const axiosForm = axios.create({
  baseURL: 'process.env.VUE_APP_BASE_URL',
  timeout: 20000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
});
//POST传参序列化
axiosForm.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // }
  return config;
}, (error) => {
  return Promise.reject(error);
});
//code状态码200判断
axiosForm.interceptors.response.use((res) => {
  if (res.status !== 200) {
    return Promise.reject(res);
  }
  return res.data;
}, (error) => {
  return Promise.reject(error);
});

export default axiosForm;
