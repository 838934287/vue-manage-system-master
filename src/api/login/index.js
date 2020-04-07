import request from '../../utils/request';
import qs from 'qs'

//获取文件详细信息List
export const checkLogin = query => {
    return request({
        // url:'/login/login.json',
        // method: 'get',
        url:'/person/login',
        method: 'post',
        params: query
    });
};
//获取角色菜单清单
export const getMenu = query => {
    return request({
        url:'/login/getMenu.json',
        method: 'get',
        params: query
    });
};