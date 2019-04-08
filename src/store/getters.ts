import { MyState } from '@/interface/storeIF'
const getters = {
    //Home
    hName: (state: MyState) => state.home.hName,
    hAddress: (state: MyState) => state.home.hAddress,
    //权限相关 user
    roles: (state: MyState) => state.user.roles,
    token: (state: MyState) => state.user.token,
    name: (state: MyState) => state.user.name,
    avatar: (state: MyState) => state.user.avatar, 
    // app
    sidebar: (state: MyState) => state.app.sidebar,
    device: (state: MyState) => state.app.device,
    // permission
    addRouters: (state: MyState) => state.permission.addRouters,
    routers: (state: MyState) => state.permission.routers,
};

export default getters;