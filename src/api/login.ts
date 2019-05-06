import axiosJson from '@/utils/axiosJson'
import { UserLogin } from '@/interface/paramsIF';

export const loginByAccountAndPassword = (json: UserLogin) => axiosJson.post('/sweep/bossAccountEntity/loginByAccountAndPassword', json)

export const getUserInfoByToken = () => axiosJson.post('/sweep/bossAccountEntity/getUserInfoByToken') 

