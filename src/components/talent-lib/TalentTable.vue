<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 人才库
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
            <div class="handle-box-left">
                <el-select v-model="query.address" placeholder="项目" class="handle-select mr10" size="small">
                    <el-option key="1" label="项目1" value="项目1"></el-option>
                    <el-option key="2" label="项目2" value="项目2"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="姓名" class="handle-input mr10" size="small"></el-input>
            </div>
                <div class="handle-box-left">
                    <el-button type="primary" icon="el-icon-search" size="small" @click="">搜索</el-button>
                    <el-button v-show="false"
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                            class="handle-del mr10"
                            @click=""
                    >批量删除</el-button>
                </div>

            </div>
            <div class="add-new-peson">
                <el-button type="primary" size="mini" @click="addNewPerson">添加人才信息</el-button>

            </div>
            <el-table class="table111" :data="personList" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="company" label="公司"></el-table-column>
                <el-table-column prop="post" label="职位"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <el-table-column prop="salary" label="薪水"></el-table-column>
                <el-table-column prop="birthDate" label="出生日期"></el-table-column>
                <el-table-column prop="telephone" label="手机号"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
                <el-table-column prop="lastContactTime" label="最新联系"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                        @click="editTalent(scope.$index,scope.row)">编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="buton-text1"
                                @click="deleteTalent(scope.$index, scope.row)">删除</el-button>
                            <el-button
                                    type="success" plain
                                    size="mini"
                                    @click="openContactWindow(scope.row)">沟通记录</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 编辑人才信息弹出框 -->

        <el-dialog title="更新人才信息" fullscreen :visible.sync="editTalentVisible" >
            <editPersonInfo :tempPersonInfo="this.tempPersonInfo" @showPersonInfoTable="showPersonInfoTable"></editPersonInfo>
        </el-dialog>

        <!-- 新建人才弹出框 -->
        <el-dialog fullscreen title="新建人才信息" :visible.sync="addNewPersonVisible" >
            <new-person-info @showNewPersonInfoTable="showNewPersonInfoTable"></new-person-info>
        </el-dialog>
        <el-dialog title="沟通历史记录" fullscreen :visible.sync="contactTableVisible" >
            <contactTable :tempContactTableData="this.tempContactTableData" @showContactTable="showContactTable"></contactTable>
        </el-dialog>

    </div>
</template>

<script>
    import { getAllTalletPersonList,getAllIndustryList,getAllFavList,getAllProjectList,editContact,
        } from '../../api/talent-lib/index';
    import ElSelectDropdown from 'element-ui/packages/select/src/select-dropdown';
    import contactTable from './ContactTable'
    import editPersonInfo from './EditPersonInfo'
    import newPersonInfo from './NewPersonInfo'

export default {
    name: 'TalentTable',
    components: { ElSelectDropdown,contactTable,editPersonInfo,newPersonInfo },
    data() {
        return {
            query:[],
            personList:[],
            industryList:[],
            editTalentVisible:false,
            addNewPersonVisible:false,
            projectList:[],
            favList:[],
            defaultProps:[],
            contactTableVisible:false,
            tempContactTableData:{},
            tempPersonInfo:{},

        };
    },
    created() {
        this.getAllTalletPersonList();
        // console.log(this.getAllTalletPersonList())
        this.getAllIndustryList();
        this.getAllProjectList();
        this.getAllFavList();
    },mounted(){
    },
    methods: {
        //获取全部人才信息
        getAllTalletPersonList(){
            getAllTalletPersonList(this.query).then(res=>{
                this.personList = res;
            })
        },
        //获取全部行业名称信息
        getAllIndustryList(){
            getAllIndustryList().then(res=>{
                this.industryList=res;
                // console.log(this.industryList);
            })

        },
        //获取全部收藏夹名称
        getAllFavList(){
            getAllFavList().then(res=>{
                this.favList=res.data;
                this.defaultProps=res.defaultProps;
            })

        },
        //获取全部项目名称
        getAllProjectList(){
            getAllProjectList().then(res=>{
                this.projectList = res.data;
                this.defaultProps=res.defaultProps;
                // console.log(this.projectList);
                // console.log("this.defaultProps.children:--------" + this.defaultProps.children)
            })

        },
        //   删除操作
        deleteTalent(index,row){
            this.$confirm("确定要删除么？",'提示',{
                type:'warning'
            }).then(()=>{
                this.$message.success("删除成功");
                this.personList.splice(index,1)
            }).catch()
        },
        //打开编辑框
        editTalent(index,row){
            console.log("this.tempPersonInfo:  11111 ");
            // debugger
            //获取候选人详细信息
            editContact(row.id).then(res=>{
                    this.tempPersonInfo=res;
                    console.log("this.tempPersonInfo:   " + this.tempPersonInfo);
                    // debugger
            }
            ).catch()
            // debugger
            this.editTalentVisible = true;
        },
    //    添加人才信息
        addNewPerson(){
            this.addNewPersonVisible=true;
        },
    //动态添加一个项目
        addProjectItem(){
            // debugger
            // var that = this;
            var projectDesc = '';
            // that.form=this.form;
            var dynamicProjectItem=this.form.dynamicProjectItem;
            dynamicProjectItem.push({
                projectDesc
            });

            // console.log("length(form.dynamicProjectItem):    " + that.form.dynamicProjectItem.length)
        },
        //动态添加工作经历
        addJobExperience(){
            var workingDate = [];
            var companyName="";
            var post1="";
            var dept="";
            var postDesc="";
            var dynamicJobItem=this.form.dynamicJobItem;
            dynamicJobItem.push({
                workingDate,companyName,post1,dept,postDesc
            });
        },
        //动态添加教育经历
        addEduExperience(){
            var eduDate = [];
            var schoolName="";
            var major="";
            var degree="";
            var majorDesc="";
            var dynamicJobItem=this.form.dynamicEduItem;
            dynamicJobItem.push({
                eduDate,schoolName,major,degree,majorDesc
            });

        },
        //删除动态新增项目项
        deleteProjectItem(item, index){
            console.log("item---:   " + item.projectDesc);
            console.log("index---:   " + index);
            this.form.dynamicProjectItem.splice(index, 1);
        },
        //删除动态新增工作经验项
        deleteJobItem(item, index){
            console.log("index---:   " + index);
            this.form.dynamicJobItem.splice(index, 1);
        },
        //删除动态新教育背景项
        deleteEduItem(item, index){
            console.log("index---:   " + index);
            this.form.dynamicEduItem.splice(index, 1);
        },
        openContactWindow(tempPerson){
            // var personContactHistory ={};

            //获取候选人详细信息
            editContact(tempPerson.id).then(res=>{
                this.tempContactTableData=res;
                }
            ).catch()
            this.contactTableVisible = true;
        },
        showContactTable(status){
            this.contactTableVisible = status;
        },
        showPersonInfoTable(status){
            this.editTalentVisible = status;
        },
        showNewPersonInfoTable(status){
            this.addNewPersonVisible = status;
            this.$message.success("添加人才信息成功");
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 40px;

}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.buton-text1 {
    color: #ff0000;
}
.handle-box-left{
    float: left;
}
.handle-box-right{
    float: right;
}
.handle-box-left{
    float: left;
}
.add-new-peson{
    float: left;
    margin-right: 50px;
    margin-bottom: 5px;
}
.grid-content1{

    boder:1px;
}
.grid-content2{
    background-color: red;
    boder:1px;
}
.mr10 {
    margin-right: 10px;
}
.ml10{
    margin-left: 10px;
}
.form-row-top{
    margin-top: 20px;
}
.form-row-top1{
    margin-top: 10px;
}

.form-row-left1{
    margin-left: 5px;
}
.form-row-left2{
    margin-left: 15px;
}
.form-row-left3{
    margin-left: 35px;
}
.form-row-bottom{
    margin-bottom: 15px;
}
.label-format1{
    font-weight:bold;
    font-size: 20px;
}

.backgroud-foramt1{

    border:1px solid darkgray;
    border-radius:4px;
}
.dialog-footer {

}
</style>
