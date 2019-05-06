import axiosJson from '@/utils/axiosJson'
import { BossListItemIF, addBossByAccountAndPassParamsIF } from '@/interface/paramsIF';

/**
 * 新增商家
 */
export const addBossByAccountAndPass = (json: addBossByAccountAndPassParamsIF) => axiosJson.post('/sweep/bossAccountEntity/addBossByAccountAndPass', json)

/** 获取现有商家列表 */
export const bossList = () => axiosJson.get('/sweep/bossAccountEntity//list')

/** 更新商家账号 */
export const updateBossById = (json: BossListItemIF) => axiosJson.post('/sweep/bossAccountEntity/updateBossById', json)
/** 删除商家账号 */
export const delBossById = (id: string) => axiosJson.post('/sweep/bossAccountEntity/delBossById', JSON.stringify(id))