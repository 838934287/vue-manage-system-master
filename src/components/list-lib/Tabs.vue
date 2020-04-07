<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i>List库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
                <el-tabs type="card" v-model="activeTab">
                    <el-tab-pane :label="`文档List`" name="first">
                    <el-form>
                        <el-form-item label="文档名">
                            <el-input v-model="searchFileName" placeholder="请输入文档名" style="width: 50%;"></el-input>
                            <el-button type="primary" icon="el-icon-search" class="ml10" @click="fileSearch">  搜索</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" size="small" icon="el-icon-upload" @click="fileListUploadFile">上传附件</el-button>
                        </el-form-item>
                    </el-form>

                    <el-table
                            :data="searchResult.slice((fileListCurrentPage-1)*fileListPageSize,fileListCurrentPage*fileListPageSize)"
                            border
                            class="table"
                            ref="multipleTable"
                            header-cell-class-name="table-header">
                        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                        <el-table-column prop="fileName" label="附件名"></el-table-column>
                        <el-table-column prop="uploadDate" label="上传时间" min-width="30%"></el-table-column>
                        <el-table-column prop="text" label="备注" min-width="30%"></el-table-column>
                        <el-table-column prop="uploadUser" label="上传人" min-width="30%"></el-table-column>
                        <el-table-column label="操作" min-width="30%" align="center">
                            <template slot-scope="scope">
                                <el-button
                                        type="text"
                                        icon="el-icon-edit"
                                        @click="editFile(scope.$index, scope.row)"
                                >编辑</el-button>
                                <el-button
                                        type="text"
                                        icon="el-icon-circle-plus-outline"
                                        class="red"
                                        @click="handleCollect(scope.$index, scope.row)"
                                >收藏</el-button>
                                <el-button
                                        type="text"
                                        icon="el-icon-delete"
                                        class="red"
                                        style="color:red"
                                        @click="handleDeleteFile(scope.$index,scope.row.id, scope.row.fileName)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                                :page-sizes="[5, 10, 20, 30, 40]"
                                :page-size="fileListPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :current-page="fileListCurrentPage"
                                :total="searchResult.length"
                                @size-change="handleFileListSizeChange"
                                @current-change="handleFileListCurrentChange"
                        ></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`收藏夹`" name="second" @click="initPageData()">
                    <el-button type="primary" size="mini" @click="generateCollectName">新建收藏夹</el-button>
                    <el-table
                            :data="collectListData.slice((collectListCurrentPage-1)*collectListPageSize,collectListCurrentPage*collectListPageSize)"
                            row-key="headId"
                            :tree-props="{children: 'children'}">
<!--                        <el-table-column prop="id" label="ID"  align="center"></el-table-column>-->
                        <el-table-column prop="collectName" label="收藏夹名称" align="left" min-width="30%"></el-table-column>
                        <el-table-column prop="fileName" label="附件名" align="left"></el-table-column>
                        <el-table-column prop="text" label="备注信息" align="left"></el-table-column>
                        <el-table-column  label="操作"  align="center" min-width="30%">
                            <template slot-scope="scope">
                                <el-button
                                        type="text"
                                        icon="el-icon-edit"
                                        v-if="scope.row.fileName"
                                        @click="editFile(scope.$index, scope.row)"
                                >编辑</el-button>
                                <el-button
                                        type="text"
                                        icon="el-icon-edit"
                                        v-if="!scope.row.fileName"
                                        @click="renameCollect(scope.$index, scope.row)"
                                >重命名</el-button>
                                <el-button
                                        type="text"
                                        icon="el-icon-edit"
                                        style="color:green"
                                        v-if="!scope.row.fileName"
                                        @click="addCollectFile(scope.$index, scope.row)"
                                >添加文档</el-button>
                                <el-button
                                        type="text"
                                        icon="el-icon-delete"
                                        class="red"
                                        style="color:red"
                                        @click="handleDeleteCollectOrFile(scope.$index, scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                                :page-sizes="[5, 10, 20, 30, 40]"
                                :page-size="collectListPageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :current-page="collectListCurrentPage"
                                :total="collectListData.length"
                                @size-change="handleCollectListSizeChange"
                                @current-change="handleCollectListCurrentChange"
                        ></el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 收藏弹出框 -->
        <el-dialog title="收藏" :visible.sync="collectVisible" width="40%" >
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="选择:">
                    <div style="height: 10vh">
                        <el-tree :data=this.collectNameList :props="defaultProps" @node-click="handleCollectNodeClick"></el-tree>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="collectVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCollectWithFile(form.id)">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改收藏夹名称 -->
        <el-dialog title="修改收藏夹名称" :visible.sync="collectNameVisible" width="50vw">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="新收藏夹名称">
                    <el-input v-model="form.collectName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="collectNameVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCollectName(form.headId,form.collectName)">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新建收藏夹名称 -->
        <el-dialog title="新建收藏夹名称" :visible.sync="generateCollectNameVisible" width="70%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="收藏夹名称"
                              :rules="{ required: true, message: '请输入收藏夹名称'}">
                    <el-input v-model="form.collectName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="generateNameVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCollectName(null,form.collectName)">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 新增收藏夹附件 -->
        <el-dialog title="新增文档" :visible.sync="uploadCollectFileVisible">
            <el-form ref="form" :model="form" label-width="12%">
                <el-form-item label="收藏夹">
                    <label v-text="form.collectName"></label>
                </el-form-item>
                <el-form-item label="文档名称">
                    <el-upload class="upload-demo"
                               ref="upload"
                               action=""
                               :multiple="true"
                               :limit="10"
                               :on-change="collectListOnchange"
                               :on-remove="collectListOnRemove"
                               :file-list="fileList"
                               :auto-upload="false">
<!--                        <el-button size="small" type="text">点击上传</el-button>-->
                                                <label>点击上传</label>
                        <div slot="tip" class="el-upload_tip">文件不超过10M</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadCollectFileClose">取 消</el-button>
                <el-button type="primary" @click="uploadCollectFile(form.headId)">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑附件备注信息 -->
        <el-dialog title="编辑备注信息" :visible.sync="editFileVisible">
            <el-form ref="form" :model="form" label-width="12%" label-position="left">
                <el-form-item label="备注信息:">
                    <template slot-scope="scope">
    <!--                        <el-input v-model="form.name"></el-input>-->
                            <el-input type="textarea" v-model="form.text" style="width: 95%" :rows="6" ></el-input>
                    </template>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editFileVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateText(form.lineId)">确 定</el-button>
            </span>
        </el-dialog>

        <!-- fileList 新附件上传 -->
        <el-dialog title="文档上传" :visible.sync="fileListUploadVisible" width="50%">
            <el-form ref="form" :model="form" label-width="20%" label-position="left">
                <el-form-item label="请选择附件:">
                    <el-upload class="upload-demo"
                               ref="upload"
                               action=""
                               :multiple="true"
                               :limit="1"
                               :on-change="fileListOnchange"
                               :on-remove="fileListOnRemove"
                               :before-upload="fileListBeforeUpload"
                               :file-list="fileList"
                               :auto-upload="false">
                        <el-button size="small" type="text">点击上传</el-button>
                        <!--                        <div slot="tip" class="el-upload_tip">只能上传.xls文件,且不超过1M</div>-->
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="fileListUploadClose">取 消</el-button>
                <el-button type="primary" @click="fileListUploadFiles()">确 定</el-button>
            </span>
        </el-dialog>



    </div>
</template>

<script>
    import { fetchFileListData,fetchCollectListData,deleteFileById,fetchCollectNameList,saveCollectWithFile,
        saveRenameCollectName,saveGenerateCollectName,deleteCollectById,updateText,
        fileListUploadFiles,uploadCollectFile    }
        from '../../api/list-lib/index';
    import {dateFormat} from '../../assets/js/common-util'
    import qs from 'qs'

    export default {
        name: 'tabs',
        data() {
            return {
                fileListPageSize: 5,
                fileListCurrentPage:1,
                collectListPageSize: 5,
                collectListCurrentPage:1,
                saveCollectWithFileCons:{
                    fileId:'',
                    collectNameListId:'',
                    collectNameListName:''
                },saveCollectNameCons:{
                    newCollectName:'',
                    newCollectNameId:'',
                    newCollectNameDate:''
                },saveFileWithCollectCons:{
                    file:undefined,
                    uploadFileId:'',
                    uploadCollectId:'',
                    uploadFileName:''
                },

                activeTab:'first',
                fileListData: [],
                collectListData:[],
                multipleSelection: [],
                delList: [],
                collectVisible:false,
                collectNameVisible:false,
                editFileVisible:false,
                generateCollectNameVisible:false,
                uploadCollectFileVisible:false,
                form: {},
                id: -1,
                status: 0,
                message:"",
                fileList:[],
                defaultProps: {
                    label: 'collectName'
                },
                collectNameList:[],
                fileListUploadVisible:false,
                searchFileName:"",
                searchResult:[],


            }
        },
        created(){
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {

                fetchFileListData().then(res => {
                    // console.log('res:---' + res);
                    this.fileListData = res.fileListData;
                    this.searchResult = this.fileListData;
                });
            },
            getCollectListData() {
                fetchCollectListData().then(res => {
                    // console.log('res:collectListData---' + res);
                    // console.log('res:collectListData.collectName---' + res.collectListData.collectName)
                    this.collectListData = res.collectListData;
                });
            },
            fetchCollectNameList() {
                fetchCollectNameList(this.query).then(res => {
                    this.collectNameList = res;
                    // console.log("this.collectNameList---:    " + this.collectNameList);
                });
            },
            // 触发搜索按钮
            fileSearch() {
                this.searchResult = [];
                if(this.searchFileName==""){
                    this.searchResult = this.fileListData;
                    this.$message.warning("查询条件为空!");
                    return;
                }
                this.fileListData.forEach((value,index)=>{
                    if(value.fileName.indexOf(this.searchFileName)>=0){
                        this.searchResult.push(value);
                    }
                })
                // return this.searchResult;
            },
            // 初始页fileListCurrentPage、初始每页数据数fileListPageSize和数据data
            handleFileListSizeChange: function (size) {
                this.fileListPageSize = size;
                // console.log(this.fileListPageSize)  //每页下拉显示数据
            },
            handleFileListCurrentChange: function(fileListCurrentPage){
                this.fileListCurrentPage = fileListCurrentPage;
                // console.log(this.fileListCurrentPage)  //点击第几页
            },
            // 初始页collectListCurrentPage、初始每页数据数collectListPageSize和数据data
            handleCollectListSizeChange: function (size) {
                this.collectListPageSize = size;
                // console.log(this.fileListPageSize)  //每页下拉显示数据
            },
            handleCollectListCurrentChange: function(collectListCurrentPage){
                this.collectListCurrentPage = collectListCurrentPage;
                // console.log(this.collectListCurrentPage)  //点击第几页
            },

            // 删除收藏夹或者文件
            handleDeleteCollectOrFile(index, row) {
                // 二次确认删除
                // console.log("index:--  " + index);
                // console.log("row.collect_name:--" + row.collectName);
                // console.log("row.lineId:--" + row.lineId);
                // console.log("row.children:--  " + row.children);
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        if(row.fileName!=undefined && row.fileName!=null) {
                            //删除某个文件
                            deleteFileById({id:row.lineId}).then(res=>{
                                    if(res.status==0){
                                        // console.log(index)
                                        // console.log(row.lineId)
                                        // this.collectListData[index]["children"].splice(row.lineId,1);
                                        // console.log(this.collectListData[index]["children"]);
                                        this.getCollectListData();
                                        this.$message.success('成功删除文件');
                                    }else{
                                        this.$message.error('删除失败,失败原因为:' + res.message);
                                    }
                                }).catch(err=>{
                                    if(err.toString().indexOf('cancel') == -1){
                                        this.$message.error(`删除失败,失败原因为:${err}`)
                                        return false;
                                    }
                                });
                        }else {
                            //删除整个文件夹
                            // console.log('删除整个收藏夹---------------');
                            // console.log("row.children.length--  " + row.children.length);
                            if(row.children.length > 0){
                                this.$message.warning('请先删除该收藏夹下文件,再删除该收藏夹');
                                return false;
                            }else{
                                //删除某个收藏夹
                                deleteCollectById({id:row.headId}).then(res=>{
                                    if(res.status==0){
                                        // console.log(index)
                                        // this.collectListData.splice(index,1)
                                        this.getCollectListData();
                                        this.$message.success('成功删除收藏夹');
                                    }else{
                                        this.$message.error('删除失败,失败原因为:' + res.message);
                                    }
                                }).catch(err=>{
                                    if(err.toString().indexOf('cancel') == -1){
                                        this.$message.error(`删除失败,失败原因为:${err}`)
                                        return false;
                                    }
                                });

                            }
                        }
                    }).catch((err) => {
                        console.log('err---:   ' + err);
                        if(err.toString().indexOf('cancel') == -1){
                            this.$message.error(`删除失败,失败原因为:${err}`)
                            return false;
                        }
                    });
            },
            //收藏
            handleCollect(index,row){
                this.form = row;
                this.collectVisible = true;
            },
            // 将附件保存收藏
            saveCollectWithFile(tempFileId) {
                // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                // this.$set(this.fileListData, this.idx, this.form);
                this.saveCollectWithFileCons.fileId = tempFileId;

                if(this.saveCollectWithFileCons.collectNameListId == undefined || this.saveCollectWithFileCons.collectNameListId == ''){
                    this.$message.error('请选择收藏夹....')
                    return
                }else{
                    saveCollectWithFile(this.saveCollectWithFileCons).then(res => {
                        console.log('res.status:  ' + res.status)
                        this.status = res.status
                        this.message = res.message
                        if(this.status == 0){
                            this.$message.success(`成功`)
                        }else {
                            this.$message.info(`失败`)
                        }
                    }).catch(err => {
                        console.log('saveCollectWithFile-this.message:  ' + this.message)
                        if(err.toString().indexOf('cancel') == -1){
                            this.$message.error(`服务器问题,删除失败,失败原因为:${err}`)
                            return false;
                        }
                    });
                }
                this.saveCollectWithFileCons.collectNameListId = ''
                this.saveCollectWithFileCons.collectNameListName=''
                this.collectVisible = false;
            },
            //新建收藏夹
            generateCollectName(){
                console.log("generateCollectName");
                this.form = {};
                this.generateCollectNameVisible = true;
            },
            //保存新建或者重命名的收藏夹名称
            saveCollectName(tempNewCollectId,tempNewCollectName){
                // console.log("newCollectId--:  "  + tempNewCollectId);
                // console.log("newCollectName--:  " + tempNewCollectName);
                // debugger;
                if(tempNewCollectName==undefined || tempNewCollectName ==""){
                    this.generateCollectNameVisible = true;
                    this.$message.error(`收藏夹名称不能为空`)
                    return false;
                }

                this.saveCollectNameCons.newCollectNameId = tempNewCollectId;
                this.saveCollectNameCons.newCollectName = tempNewCollectName;
                this.saveCollectNameCons.newCollectNameDate = dateFormat(new Date());
                console.log(this.saveCollectNameCons);
                // debugger
                if(tempNewCollectId!=null){
                    //保存重命名的收藏夹名
                    // console.log('重命名收藏夹----------')
                    // console.log(this.saveCollectNameCons.newCollectName);
                    saveRenameCollectName(this.saveCollectNameCons).then(res => {
                        console.log('res.status:  ' + res.status)
                        this.status = res.status
                        this.message = res.message
                        if(this.status == 0){
                            this.$message.success(`成功`)
                        }else {
                            this.$message.info(`失败`)
                        }
                    }).catch(err => {
                        console.log('saveRenameCollectName-this.message:  ' + this.message)
                        if(err.toString().indexOf('cancel') == -1){
                            this.$message.error(`服务器问题,删除失败,失败原因为:${err}`)
                            return false;
                        }
                    });
                    this.fetchCollectNameList();
                    this.collectNameVisible = false;
                }else{
                    //新建收藏夹名
                    console.log('新建收藏夹---------')
                    // debugger
                    // {collectList:this.saveCollectNameCons}
                    saveGenerateCollectName({collectList:this.saveCollectNameCons}).then(res => {
                        console.log('res.status:  ' + res.status)
                        this.status = res.status
                        this.message = res.message
                        if(this.status == 0){
                            this.$message.success(`成功`)
                        }else {
                            this.$message.info(`失败`)
                        }
                    }).catch(err => {
                        console.log('saveGenerateCollectName-this.message:  ' + this.message)
                        if(err.toString().indexOf('cancel') == -1){
                            this.$message.error(`服务器问题,删除失败,失败原因为:${err}`)
                            return false;
                        }
                    });
                    this.fetchCollectNameList();
                    this.generateCollectNameVisible = false;
                }
                console.log('this.newCollectNameId:    ' + this.newCollectNameId);
                console.log('this.newCollectName:   ' + this.newCollectName);
                this.newCollectNameId = '';
                this.newCollectName = '';
            },
            //重命名收藏夹
            renameCollect(index,row){
                this.form = row;
                this.collectNameVisible = true;
                // this.$message.success(`修改第 ${this.idx + 1} 行成功`)
            },
            //收藏夹上传附件
            addCollectFile(index,row){
                this.form=row;
                this.uploadCollectFileVisible = true;
            },
            //修改附件
            editFile(index,row){
                this.form = row;
                this.editFileVisible=true;
            },
            //删除附件
            handleDeleteFile(index,id,name){
                // debugger
                deleteFileById(id).then(res => {
                    console.log('res.status:  ' + res.status)
                    // debugger
                    this.status = res.status
                    this.message = res.message
                    // debugger
                        this.$confirm('确定要删除吗？', '提示', {
                            type: 'warning'
                        }).then(() => {
                            if(this.status == 0){
                                    this.fileListData.splice(index,1);
                                    this.$message.success(`成功删除文档: ${name} `)
                            }else {
                                    this.$message.info(`删除附件: ${name} 失败,失败原因${this.message}`)
                            }}).catch(err => {
                                // console.log('deleteFileById-this.message:  ' + this.message)
                                if(err.toString().indexOf('cancel') == -1){
                                    this.$message.error(`服务器问题,删除失败,失败原因为:${err}`)
                                    return false;
                                }
                            });
                })
            },
            //添加到收藏夹
            handleCollectNodeClick(data) {
                // this.$set(this.collectNameList.id,this.collectNameList.collectName)
                // console.log(data);
                // console.log(data.collectName);
                this.saveCollectWithFileCons.collectNameListId = data.id;
                this.saveCollectWithFileCons.collectNameListName = data.collectName;
            },
            fileListUploadFile(){
                this.fileListUploadVisible = true;
            },
            updateText(tempFileId){
                updateText({id:tempFileId}).then(res=>{
                    if(res.status==0){
                        this.$message.success('文件备注信息修改成功');
                    }else{
                        this.$message.error('修改备注信息失败,失败原因为:' + res.message);
                    }
                }).catch(err=>{
                    if(err.toString().indexOf('cancel') == -1){
                        this.$message.error(`修改备注信息失败,失败原因为:${err}`)
                        return false;
                    }
                });
                this.editFileVisible = false;
            },
            fileListUploadFiles(){
                let formData = new FormData();  //此处有坑,附件上传必须用formData
                if(this.fileList.length==0){
                    this.$message.warning("请选择附件")
                    return false
                }
                formData.append("file", this.fileList[0].raw);  //后端是根据"file" 来进行取值
                formData.append("test","test123")
                // console.log(formData.get("file").filename,1112)
                fileListUploadFiles(formData).then(res => {
                    this.status = res.status
                    this.message = res.message
                    if (this.status == 0) {
                        this.$message.success(`附件上传成功`)
                    } else {
                        this.$message.info(`附件上传失败,失败原因${this.message}`)
                    }
                }).catch(err => {
                    // debugger
                    if(err.toString().indexOf('cancel') == -1){
                        this.$message.error(`删除失败,失败原因为:${err}`)
                        return false;
                    }
                });
                this.fileList = [];
                this.fileListUploadVisible = false;
            },
            fileListBeforeUpload(file){
                //读取文件大小判断
                var fileSize = file.size;
                console.log(fileSize);
                // debugger
                if (fileSize > 10485760) {
                    that.$message({
                        type: 'error',
                        showClose: true,
                        duration: 3000,
                        message: '文件大于10M!'
                    });
                    return false;
                }
            },fileListUploadClose(){
               this.fileListUploadVisible = false;
                this.fileList=[];
            },
            uploadCollectFileClose(){
                this.uploadCollectFileVisible = false;
                this.fileList = []
            },
            //多个附件上传时需要collectListOnchange&collectListOnRemove
            fileListOnchange(file,fileList){
                this.fileList = fileList;
            },
            fileListOnRemove(file,fileList){
                this.fileList = fileList;
            },
            //多个附件上传时需要collectListOnchange&collectListOnRemove
            collectListOnchange(file,fileList){
                // console.log(file.raw.name);
                // debugger
                if(fileList.length>1){
                    var countFlag = 0;
                    for(var i=0;i<= fileList.length;i++){
                        // console.log('fileList.name--:  '+ fileList[i].raw.name.toString());
                        // console.log('file.name--:   ' + file.raw.name.toString());
                        // debugger
                        if(fileList[i].raw.name.toString() == file.raw.name.toString()){
                            countFlag = countFlag + 1;
                            if(countFlag>1){
                                this.$message.warning("重复上传附件")
                                fileList.splice(i,1)
                                break;

                            }
                        }
                    }
                }
                this.fileList = fileList;
            },
            collectListOnRemove(file,fileList){
                this.fileList = fileList;
            },
            uploadCollectFile(collectId){
                let formData = new FormData();  //此处有坑,附件上传必须用formData
                // formData.set("file", file.file);  //后端是根据"file" 来进行取值
                formData.set("collectId",collectId);
                // formData.append("fileList",this.fileList)
                for(var i=0;i<this.fileList.length;i++){
                    formData.append("fileList",this.fileList[i].raw);
                }
                // debugger
                uploadCollectFile(formData).then(res => {
                    this.status = res.status
                    this.message = res.message
                    // console.log('this.status:  ' + this.status)
                    // console.log('refs.length2:  ' + that.$refs.upload.$children[0].fileList.length)
                    // debugger
                    if (this.status == 0) {
                        // debugger
                        this.$message.success(`附件上传成功`)
                    } else {
                        this.$message.info(`附件上传失败,失败原因${this.message}`)
                    }
                }).catch(err => {
                    // debugger
                    if(err.toString().indexOf('cancel') == -1){
                        this.$message.error(`删除失败,失败原因为:${err}`)
                        return false;
                    }
                });
                this.uploadCollectFileVisible = false;
                this.fileList = []
            }

        },
        computed:{
        },
        mounted() {
            //get fileList
            this.getData();
            //获取收藏夹及文件夹下的文件
            this.getCollectListData();
            //获取收藏夹List
            this.fetchCollectNameList();
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
.mr10 {
    margin-right: 10px;
}
.ml10 {
    margin-left: 10px;
}
.handle-box {
    margin-bottom: 20px;
}
.el-dialog__body{height: auto;overflow: auto;}

</style>

