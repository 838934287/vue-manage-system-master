import request from '../../utils/request';
import qs from 'qs'

//获取文件详细信息List
export const fetchFileListData = query => {
    return request({
        // url: '/list-lib/fileList.json',
        url:'/fileList/queryFileList',
        method: 'get',
        params: query
    });
};
//根据文件ID删除文件(id: lindID即文件id )
export const deleteFileById = query => {
    return request({
        // url: '/list-lib/deleteFileResult.json',
        // method: 'get',
        url:'/fileList/deleteFileById',
        method: 'post',
        data: query  //一定要加qs.stringify
        // params: {id:query}  //可以不用加qs.stringify
    }).catch(error => {
        // console.log('error:---   ' + JSON.stringify(error));
        // alert(typeof error)
    });
};
//根据收藏夹ID删除收藏夹
export const deleteCollectById = query => {
    return request({
        // url: '/list-lib/deleteFileResult.json',
        // method: 'get',
        url:'/collectList/deleteCollectById',
        method: 'post',
        data: query // 一定要加qs.stringify
        // data: qs.stringify({id:query})
        // params: {id:query}  //可以不用加qs.stringify
    }).catch(error => {
        // console.log('error:---   ' + JSON.stringify(error));
        // alert(typeof error)
    });
};
//filelist 页面附件上传
export const fileListUploadFiles = query => {
    return request({
        // url: '/list-lib/uploadFileResult.json',
        // method: 'get',
        url: '/fileList/fileListUploadFiles',
        method: 'post',
        data:query   // 附件上传只能用data 来传数据
        // params:query
    }).catch(error => {
        // console.log('error:---   ' + JSON.stringify(error));
        // alert(error)
    });
};

//获取收藏夹及文件夹下的文件
export const fetchCollectListData = query => {
    return request({
        // url: '/list-lib/collectList.json',
        url:'/fileList/fileListWithCollectName',
        method: 'get',
        params: query
    });
};
//获取收藏夹List
export const fetchCollectNameList = query => {
    return request({
        // url: '/list-lib/collectNameList.json',
        url:'/collectList/queryAllCollect',
        method: 'get',
        params: query
    });
};
//将附件添加到收藏夹
export const saveCollectWithFile = query =>{
    return request({
       // url:'/list-lib/uploadFileResult.json',
       // method:'get',
        url:'/fileList/saveCollectWithFile',
        method:'post',
        data: query
    });
};
//重命名收藏夹
export  const saveRenameCollectName = query =>{
  return request({
      // url:'/list-lib/uploadFileResult.json',
      // method:'get',
      // params: query
      url:'/collectList/saveRenameCollectName',
      method:'post',
      data: query
  })
};
//新建收藏夹名称
export  const saveGenerateCollectName = query =>{
    return request({
        // url:'/list-lib/uploadFileResult.json',
        // method:'get',
        url:'/collectList/saveGenerateCollectName',
        method: 'post',
        // data: query
        // data: {collectList:query}  //data 用@RequestBody来接收
        params: query  //params用@RequestParams 来接收
    }).catch(error => {
        // console.log('error:---   ' + JSON.stringify(error));
        // alert(typeof error)
    });

};
//更新文件的备注信息
export  const updateText = query =>{
    return request({
        // url:'/list-lib/uploadFileResult.json',
        // method:'get',
        // params: query
        url:'/fileList/updateText',
        method:'post',
        data: query
    })
};

//收藏夹中上传附件
export const uploadCollectFile = query => {
    return request({
        // url: '/list-lib/uploadFileResult.json',
        // method: 'get',
        url: '/collectList/uploadCollectFile',
        method: 'post',
        data:query   // 附件上传只能用data 来传数据
    }).catch(error => {
        // console.log('error:---   ' + JSON.stringify(error));
        // alert(error)
    });
};
