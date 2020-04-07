<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i>人才库收藏夹</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div><el-button type="primary" size="mini" @click="generateCollectName()">新建收藏夹</el-button></div>
            <br>
            <hr style="color: #b3e19d;">
            <br>
            <el-tree
                    :data="this.personCollectList"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                          v-show="node.level===1"
                          style="text-decoration: underline"
                          type="text"
                          size="mini"
                          @click="() => append(data)">
                    增 加
                  </el-button>
                    &ensp;
                  <el-button
                          style="color: red;text-decoration: underline"
                          type="text"
                          size="mini"
                          @click="() => remove(node, data)">
                    删 除
                  </el-button>
                </span>
              </span>
            </el-tree>
            </div>

        <!-- 新建人才弹出框 -->
        <el-dialog fullscreen title="新建人才信息" :visible.sync="addNewPersonVisible" >
            <new-person-info @showNewPersonInfoTable="showNewPersonInfoTable"></new-person-info>
        </el-dialog>

        <!-- 新建收藏夹名称 -->
        <el-dialog title="新建收藏夹名称" :visible.sync="generateCollectNameVisible" width="70%">
            <el-form ref="form" :model="collectForm" label-width="100px">
                <el-form-item label="收藏夹名称">
                    <el-input v-model="collectForm.collectName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="generateNameVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCollectName(collectForm.collectName)">确 定</el-button>
            </span>
        </el-dialog>



    </div>
</template>

<script>
    import { getPersonCollectList,saveNewPersonCollect,deletePerson,deletePersonCollect } from '../../api/talent-lib/index';
    import newPersonInfo from './NewPersonInfo'

    let id = 1000;
    export default {
        name: 'personCollectList',
        components:{newPersonInfo},
        data() {
            return {
                personCollectList: [],
                addNewPersonVisible:false,
                selectCollectId:"",
                generateCollectNameVisible:false,
                collectForm:{
                    collectName:""
                }
            };
        },
        created() {
            this.getPersonCollectList();
            console.log(this.$route.path,10030)
            this.$router.push(this.$route.path)
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getPersonCollectList() {
                getPersonCollectList().then(res => {
                    console.log('res:  ' + res);
                    this.personCollectList = JSON.parse(JSON.stringify(res));
                });
            },
            append(data) {
                // debugger
                this.addNewPersonVisible=true;
                this.selectCollectId = data;
            },
            showNewPersonInfoTable(status){
                const newChild = { id: id++, label: 'testtest', children: [] };
                if (!this.selectCollectId.children) {
                    this.$set(this.selectCollectId, 'children', []);
                }
                this.selectCollectId.children.push(newChild);
                this.addNewPersonVisible = status;
                // this.$message.success("添加人才信息成功");
            },
            remove(node, data) {
                if(node.childNodes.length>0){
                    this.$message.error("该收藏夹下还有信息,无法删除");
                    return false;
                }
                else{
                    if(node.level==1){
                        //删除人才收藏夹
                        deletePersonCollect(data.id).then(res => {
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
                    }else{
                        //删除人才信息
                        deletePerson(data.id).then(res => {
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
                    }
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === data.id);
                    children.splice(index, 1);
                }
            },
            //新建收藏夹
            generateCollectName(){
                console.log("generateCollectName");
                this.form = {};
                this.generateCollectNameVisible = true;
            },
            //保存新建或者重命名的收藏夹名称
            saveCollectName(tempNewCollectName){
                if(tempNewCollectName==undefined || tempNewCollectName ==""){
                    this.generateCollectNameVisible = true;
                    this.$message.error(`收藏夹名称不能为空`)
                    return false;
                }
                saveNewPersonCollect(tempNewCollectName).then(res => {
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
                this.generateCollectNameVisible = false;
            }

            }
    };
</script>

<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 60vh;
    }
</style>
