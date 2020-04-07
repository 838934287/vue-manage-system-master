<template>
    <div>
        <el-row :span="24">
            <el-col :span="14">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content1">
                            <el-form :model="tempContactTableData" label-position="left" ref="formData">
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="姓名" prop="name" label-width="20%">
                                            <!--                                        <el-input type="text" v-model="tempContactTableData.name" style="width:60%" class="form-row-left3" ></el-input>-->
                                            <label v-text="tempContactTableData.name"></label>
                                        </el-form-item>
                                        <el-form-item label="性别" class="form-row-top" prop="sex" label-width="20%">
                                            <label v-text="tempContactTableData.sex"></label>
                                        </el-form-item>
                                        <el-form-item label="行业" class="form-row-top" prop="industry" label-width="20%">
                                            <label v-text="tempContactTableData.industry">
                                            </label>
                                        </el-form-item>
                                        <el-form-item label="职位" prop="post" label-width="20%">
                                            <label v-text="tempContactTableData.post"></label>
                                        </el-form-item>

                                        <el-form-item label="出生日期" label-width="20%" prop="birthDate" v-if="tempContactTableData.birthDate!=undefined">
                                            <label v-text="tempContactTableData.birthDate.substr(0,10)"></label>
                                        </el-form-item>

                                    </el-col>

                                    <el-col :span="12">
                                        <el-form-item label="公司名称" label-width="20%">
                                            <label v-text="tempContactTableData.company"></label>
                                        </el-form-item>
                                        <el-form-item label="手机号" label-width="20%" class="form-row-top"
                                                      prop="telephone">
                                            <label v-text="tempContactTableData.telephone"></label>
                                        </el-form-item>

                                        <el-form-item class="form-row-top" prop="mail" label="邮箱"
                                                      label-width="20%">
                                            <label v-text="tempContactTableData.mail"></label>
                                        </el-form-item>
                                        <el-form-item label="城市" label-width="20%" prop="city">
                                            <label v-text="tempContactTableData.city"></label>
                                        </el-form-item>
                                        <el-form-item label="薪资" label-width="20%" prop="salary">
                                            <label v-text="tempContactTableData.salary"></label><span
                                                class="ml10">万</span>
                                        </el-form-item>

                                    </el-col>
                                </el-row>
                                <span class="form-row-top label-format1"
                                      style="width: 20%;font-size:23px;font-weight: 900;">工作经历</span>
                                <div class="backgroud-foramt1 form-row-top1 border1"
                                     v-for="(item,index) in tempContactTableData.workExp">
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="工作时间" prop="workingDate" class="form-row-top"
                                                          label-width="20%">
                                                <br><span>起始时间:  </span><label v-if="item.workingDate[0]!=undefined"
                                                    v-text="item.workingDate[0].toString().substr(0,10)"></label>
                                                <br><span>结束时间:  </span><label v-if="item.workingDate[1]!=undefined"
                                                    v-text="item.workingDate[1].toString().substr(0,10)"></label>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12" align="left" v-show="index==0">
                                            <el-form-item class="form-row-top" prop="onJob" label="是否在职"
                                                          label-width="20%">
                                                <!--                                            <label v-text="item.onJob" ></label>-->
                                                <div v-if="item.onJob===true">是</div>
                                                <div v-else>否</div>
                                            </el-form-item>
                                        </el-col>

                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="公司名称" class="form-row-top1 form-row-left1"
                                                          prop="companyName" label-width="20%">
                                                <label v-text="item.companyName"></label>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="职位" prop="post1" class="form-row-top1 form-row-left1"
                                                          label-width="20%">
                                                <label v-text="item.post1"></label>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="部门" prop="dept" class="form-row-top1 form-row-left1"
                                                          label-width="20%">
                                                <label v-text="item.dept"></label>
                                            </el-form-item>

                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="职责描述" prop="postDesc"
                                                          class="form-row-top1 form-row-left2" label-width="20%">
                                                <label v-text="item.postDesc"></label>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>

                                <span class="form-row-top label-format1"
                                      style="width: 20%;font-size:23px;font-weight: 900;">教育经历</span>
                                <div class="backgroud-foramt1 form-row-top1 border1"
                                     v-for="(item,index) in tempContactTableData.eduExp">
                                    <el-row>
                                        <el-col :span="8">
                                            <el-form-item label="时间" prop="eduDate" class="form-row-top form-row-left2"
                                                          label-width="20%">
                                                <br><span>起始时间:</span><label v-if="item.eduDate[0]!=undefined"
                                                    v-text="item.eduDate[0].toString().substr(0,10)"></label>
                                                <br><span>结束时间:</span><label v-if="item.eduDate[1]!=undefined"
                                                    v-text="item.eduDate[1].toString().substr(0,10)"></label>
                                            </el-form-item>

                                        </el-col>
                                        <el-col :span="12" align="left">
                                            <el-form-item class="form-row-top" label-width="25%" label="是否属于211:">
                                                <!--                                        <label v-text="item.twoOneOne" ></label>-->
                                                <div v-if="item.twoOneOne==true">是</div>
                                                <div v-else>否</div>
                                            </el-form-item>
                                            <el-form-item class="form-row-top" label-width="26%" label="是否属于985:">
                                                <div v-if="item.nineEightFive==true">是</div>
                                                <div v-else>否</div>
                                            </el-form-item>

                                        </el-col>

                                    </el-row>
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="学校" label-width="20%" prop="schoolName"
                                                          class="form-row-top1 form-row-left1">
                                                <label v-text="item.schoolName"></label>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="专业" label-width="20%" prop="major"
                                                          class="form-row-top1 form-row-left1">
                                                <label v-text="item.major"></label>
                                            </el-form-item>

                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="12">
                                            <el-form-item label="学历" label-width="20%" prop="degree"
                                                          class="form-row-top1 form-row-left2">
                                                <label v-text="item.degree"></label>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="是否统招" label-width="20%" prop="tongZhao"
                                                          class="form-row-top1 form-row-left1">
                                                <label v-text="item.tongZhao"></label>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="专业描述" label-width="20%" prop="majorDesc"
                                                          class="form-row-top1 form-row-left2">
                                                <label v-text="item.majorDesc"></label>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                                <span class="form-row-top label-format1"
                                      style="width: 20%;font-size:23px;font-weight: 900;">项目经历</span>
                                <div class="backgroud-foramt1 form-row-top1 border1"
                                     v-for="(item,index) in tempContactTableData.projectExp">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="项目经历" prop="projectDesc"
                                                          class="form-row-top1 form-row-left2">
                                                <label v-text="item.projectDesc"></label>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>


                                </div>
                                <div class="backgroud-foramt1 form-row-top1 border1">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="所在项目" prop="projectList"
                                                          class="form-row-top1 form-row-left2" label-width="15%">
                                                <label  v-text="tempContactTableData.formProjectList.list.join(';')"></label>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>

                                <div class="backgroud-foramt1 form-row-top1 border1">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="所在收藏夹" class="form-row-top1 form-row-left2"
                                                          label-width="15%" prop="favList" >
                                                <label v-text="tempContactTableData.formFavList.list.join(';')"></label>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>

                                </div>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>

            </el-col>
            <el-col :span="9" class="ml1 border1">
                <h1>沟通记录:</h1>
                <el-input type="textarea" v-model="tempContent" class="input-text margin1" style="width: 98%"
                          placeholder="请输入" :rows="4">
                </el-input>
                <el-form v-for="(item,index) in tempContactTableData.contentList" style="margin-top: 15px"
                         class="box-shadow margin2">
                    <el-form-item>
                        <label v-text="item.content"></label>
                    </el-form-item>
                    <el-form-item>
                        <label v-text="item.createdate"></label>
                    </el-form-item>

                </el-form>
                <div class="row-top1 button-right row-bottom2">
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelContact">取 消</el-button>
                        <el-button type="primary"
                                   @click="addNewContact(tempContactTableData.id,tempContent)">确 定</el-button>
                    </span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // import { fetchData } from '../../api/talent-lib/index';
    import { addNewContact } from '../../api/talent-lib';

    export default {
        name: 'contacttable',
        components: {},
        data() {
            return {
                form: {},
                tempContent: ''
            };
        },
        props: ['tempContactTableData'],
        created() {
            // this.getData();
        },
        methods: {
            cancelContact() {
                this.$emit('showContactTable', false);
            },
            addNewContact(personId, tempContent) {
                // console.log("personId:   " + personId);
                // console.log("tempContent:   " + tempContent);
                // console.log('tempContent.toString().replace--:  ' + tempContent.toString().replace(/(^\s*)|(\s*$)/g, '').length)
                // debugger
                if (tempContent.toString().replace(/(^\s*)|(\s*$)/g, '').length == 0) {
                    this.$message.warning('输入内容不能为空.');
                    this.tempContent = '';
                    return false;
                } else {
                    var tempQuery = [];
                    tempQuery.push({ 'personId': personId });
                    tempQuery.push({ 'content': tempContent });
                    addNewContact(tempQuery).then(res => {
                        if (res.status == 0) {
                            this.$message.success('新增备注信息成功');
                            this.tempContent = '';
                            this.$emit('showContactTable', false);
                        } else {
                            this.$message.error('新增失败,请重新提交');
                        }

                    }).catch();
                }

            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-box-left {
        margin-bottom: 20px;
        float: left;
    }

    .handle-box-right {
        margin-bottom: 20px;
        /*margin-outside: 40px;*/
        float: right;
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

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .border1 {
        border: solid 1px;
        border-color: lightgrey;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }

    .row-top1 {
        margin-top: 10px;
    }

    .row-bottom1 {
        margin-bottom: 10px;
    }

    .row-bottom2 {
        margin-bottom: 20px;
    }

    .ml1 {
        margin-left: 10px;
    }

    .button-right {
        float: right;
    }

    .input-text {
        border-radius: 8px;
        margin-top: 10px;
        /*margin-left: 5%;*/
        /*margin-right: 5%;*/

    }

    .margin1 {
        margin: 5px;
    }

    .margin2 {
        margin: 6px;
    }

    .box-shadow {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

</style>
