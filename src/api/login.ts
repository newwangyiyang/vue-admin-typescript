import axiosJson from '@/utils/axiosJson'
import { UserLogin } from '@/interface/paramsIF';

export const login = (json: UserLogin) => axiosJson.post('promotion/phaAdminUserEntity/loginType', json)

export const getUserInfo = (token: string) => axiosJson.post('promotion/phaAdminUserEntity/getUserInfoType', JSON.stringify(token)) 

