import request from '../../utils/request';
import qs from 'qs'

//获取人才库全部人才信息
export  const getAllTalletPersonList = query =>{
    return request({
        url:'/talent-lib/person.json',
        method:'get',
        params: query
    })
};
//获取全部行业信息
export  const getAllIndustryList = query =>{
    return request({
        url:'/talent-lib/vocation.json',
        method:'get',
        params: query
    })
};
//获取全部项目信息
export  const getAllProjectList = query =>{
    return request({
        url:'/talent-lib/projectList.json',
        method:'get',
        params: query
    })
};

//获取全部收藏夹信息
export  const getAllFavList = query =>{
    return request({
        url:'/talent-lib/favList.json',
        method:'get',
        params: query
    })
};

//保存新建人才信息
export  const saveNewPerson = query =>{
    return request({
        url:'/talent-lib/saveNewPerson.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};

//编辑候选人沟通记录--> 获取候选人信息
export  const editContact = query =>{
    return request({
        url:'/talent-lib/editContact.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};
//新增候选人沟通记录
export  const addNewContact = query =>{
    return request({
        url:'/talent-lib/addNewContact.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};
//修改候选人信息
export  const saveEditPerson = query =>{
    return request({
        url:'/talent-lib/saveEditPerson.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};
//获取候选人收藏夹信息
export  const getPersonCollectList = query =>{
    return request({
        url:'/talent-lib/personCollectList.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};
//保存收藏夹
export  const saveNewPersonCollect = query =>{
    return request({
        url:'/talent-lib/saveNewPerson.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};
//删除收藏夹
export  const deletePersonCollect = query =>{
    return request({
        url:'/talent-lib/saveNewPerson.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};
//删除收藏夹下的人才信息
export  const deletePerson = query =>{
    return request({
        url:'/talent-lib/saveNewPerson.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};

//项目信息
//获取候选人收藏夹信息
export  const getPersonProjectList = query =>{
    return request({
        url:'/talent-lib/personCollectList.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};
//保存收藏夹
export  const saveNewPersonProject = query =>{
    return request({
        url:'/talent-lib/saveNewPerson.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};
//删除收藏夹
export  const deletePersonProject = query =>{
    return request({
        url:'/talent-lib/saveNewPerson.json',
        method:'get',
        params: query
        // method:'post',
        // data: query
    })
};


