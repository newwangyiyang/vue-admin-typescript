import axiosJson from '@/utils/axiosJson'
import { UserLogin } from '@/interface/paramsIF';

export const login = (json: UserLogin) => axiosJson.post('demo/loginType', json)

export const getUserInfo = (token: string) => axiosJson.post('demo/getUserInfoType', JSON.stringify(token)) 

