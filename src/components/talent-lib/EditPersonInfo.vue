<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content1">
                    <el-form v-model="form" label-position="left" :rules="rules" ref="formData">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="姓名" prop="name">
                                    <el-input v-model="form.name" placeholder="请输入" style="width:60%" class="form-row-left3" ></el-input>
                                </el-form-item>

                                <el-form-item label="性别" class="form-row-top" prop="sex">
                                    <el-radio v-model="form.sex" class="form-row-left3" label="男"  default>男</el-radio>
                                    <el-radio v-model="form.sex" label="女">女</el-radio>
                                </el-form-item>
                                <el-form-item  label="行业" class="form-row-top" prop="industry">
                                    <el-select v-model="form.industry" placeholder="请选择"  class="form-row-left3" style="width: 60%">
                                        <el-option v-for="item in industryList"
                                                   :key="item.id"
                                                   :label="item.industry"
                                                   :value="item.industry"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="职位" prop="post" >
                                    <el-input placeholder="请输入" class="form-row-left3" style="width: 60%" v-model="form.post"></el-input>
                                </el-form-item>

                                <el-form-item label="出生日期" label-width="30%" style="width: 60%" prop="birthDate">
                                    <el-date-picker
                                            v-model="form.birthDate"
                                            type="date"
                                            placeholder="选择日期"
                                            value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="公司名称" label-width="15%" >
                                    <el-input placeholder="请输入" style="width: 60%" v-model="form.company"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号"  label-width="15%" class="form-row-top" prop="telephone">
                                    <el-input v-model="form.telephone"  placeholder="请输入" style="width: 60%;"  ></el-input>
                                </el-form-item>

                                <el-form-item class="form-row-top" prop="mail"  label="邮箱"
                                              label-width="15%">
                                    <el-input  placeholder="请输入"   style="width: 60%;" v-model="form.mail" ></el-input>
                                </el-form-item>
                                <el-form-item label="城市" label-width="15%" prop="city">
                                    <el-input placeholder="请输入" style="width: 60%" v-model="form.city"></el-input>
                                </el-form-item>
                                <el-form-item label="薪资" label-width="15%" prop="salary">
                                    <el-input placeholder="请输入" style="width: 55%" v-model="form.salary"></el-input><span class="ml10">万</span>
                                </el-form-item>

                            </el-col>
                        </el-row>
                        <span class="form-row-top label-format1">工作经历</span>
                        <div class="backgroud-foramt1 form-row-top1">
                            <div  v-for="(item,index) in form.workExp">
                                <hr>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="工作时间" prop="workingDate" class="form-row-top form-row-left2" label-width="15%">
                                            <el-date-picker
                                                    v-model="item.workingDate"
                                                    type="daterange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                    value-format="yyyy-MM-dd">
                                            </el-date-picker>

                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="4"  align="left">
                                        <el-form-item class="form-row-top" prop="onJob">
                                                <el-checkbox v-model="item.onJob" v-show="index==0">是否在职</el-checkbox>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8"  align="center">
                                        <el-form-item class="form-row-top">
                                            <el-button type="danger" size="mini" v-show="index>0" @click="deleteOriJobItem(item,index)">删 除</el-button>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="公司名称"  class="form-row-top1 form-row-left1"
                                                      prop="companyName" label-width="8%">
                                            <el-input v-model="item.companyName" style="width: 60%"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="职位" prop="post1" class="form-row-top1 form-row-left1" label-width="16%">
                                            <el-input v-model="item.post1" style="width: 60%"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="部门" prop="dept" class="form-row-top1 form-row-left1" >
                                            <el-input v-model="item.dept" style="width: 60%"></el-input>
                                        </el-form-item>

                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="职责描述" prop="postDesc" class="form-row-top1 form-row-left2" label-width="7%">
                                            <el-input type="textarea" v-model="item.postDesc" style="width: 80%" :rows="3"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                            <!-- 动态增加工作经历 -->
                            <!-- 不止一个工作经历，用div包裹起来 -->
                            <div v-for="(item, index) in form.dynamicJobItem" :key="index">
                                <hr>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="工作时间" prop="workingDate" class="form-row-top form-row-left2" label-width="15%">
                                            <el-date-picker
                                                    v-model="item.workingDate"
                                                    type="daterange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                    value-format="yyyy-MM-dd">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8"  align="right">
                                        <el-form-item class="form-row-top">
                                            <el-button type="danger" size="mini" @click="deleteJobItem(item,index)">删 除</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="公司名称" prop="companyName"  class="form-row-top1 form-row-left1" label-width="8%">
                                            <el-input v-model="item.companyName" style="width: 60%"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="职位" prop="post1" class="form-row-top1 form-row-left1" label-width="16%">
                                            <el-input v-model="item.post1" style="width: 60%"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="部门" prop="dept" class="form-row-top1 form-row-left1" >
                                            <el-input v-model="item.dept" style="width: 60%"></el-input>
                                        </el-form-item>

                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="职责描述" prop="postDesc" class="form-row-top1 form-row-left2" label-width="7%">
                                            <el-input type="textarea" v-model="item.postDesc" style="width: 80%" :rows="3"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>

                            <el-row class="form-row-bottom form-row-left2">
                                <el-button type="primary" size="mini" @click="addJobExperience">增加新的工作经历</el-button>
                            </el-row>

                        </div>


                        <div class="form-row-top">
                            <span class="label-format1">教育经历</span>
                        </div>
                        <div class="backgroud-foramt1 form-row-top1">
                            <div v-for="(item,index) in form.eduExp">
                                <hr>
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="时间" prop="eduDate" class="form-row-top form-row-left2" label-width="15%">
                                        <el-date-picker
                                                v-model="item.eduDate"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                value-format="yyyy-MM-dd">
                                        </el-date-picker>

                                    </el-form-item>

                                </el-col>
                                <el-col :span="4"  align="center">
                                    <el-form-item class="form-row-top" v-show="index==0">
                                        <el-checkbox v-model="item.twoOneOne">211</el-checkbox>
                                        <el-checkbox v-model="item.nineEightFive">985</el-checkbox>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8"  align="right">
                                    <el-form-item class="form-row-top">
                                        <el-button type="danger" size="mini" v-show="index>0" @click="deleteOriEduItem(item,index)">删 除</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="学校" prop="schoolName" class="form-row-top1 form-row-left1" label-width="11%">
                                        <el-input v-model="item.schoolName" style="width: 60%"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="专业" prop="major" class="form-row-top1 form-row-left1" label-width="15%">
                                        <el-input v-model="item.major" style="width: 60%"></el-input>
                                    </el-form-item>

                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="学历" prop="degree" class="form-row-top1 form-row-left2" label-width="10%">
                                        <el-select  v-model="item.degree" style="width: 60%" >
                                            <el-option key="1" label="高中" value="高中"></el-option>
                                            <el-option key="2" label="大学" value="大学"></el-option>
                                            <el-option key="3" label="硕士" value="硕士"></el-option>
                                            <el-option key="4" label="博士" value="博士"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="是否统招" prop="tongZhao" class="form-row-top1 form-row-left1" label-width="15%">
                                        <el-select v-model="item.tongZhao" style="width: 50%">
                                            <el-option key="1" label="是" value="是"></el-option>
                                            <el-option key="2" label="否" value="否"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="专业描述" prop="majorDesc" class="form-row-top1 form-row-left2">
                                        <el-input type="textarea" v-model="item.majorDesc" style="width: 80%" :rows="3"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            </div>
                            <!-- 动态增加教育背景 -->
                            <!-- 不止一个教育背景，用div包裹起来 -->
                            <div v-for="(item, index) in form.dynamicEduItem" :key="index">
                                <hr>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="时间" prop="eduDate" class="form-row-top form-row-left2" label-width="15%">
                                            <el-date-picker
                                                    v-model="item.eduDate"
                                                    type="daterange"
                                                    range-separator="至"
                                                    start-placeholder="开始日期"
                                                    end-placeholder="结束日期"
                                                    value-format="yyyy-MM-dd">
                                            </el-date-picker>

                                        </el-form-item>

                                    </el-col>
                                    <el-col :span="8"  align="right">
                                        <el-form-item class="form-row-top">
                                            <el-button type="danger" size="mini" @click="deleteEduItem(item,index)">删 除</el-button>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="学校" prop="schoolName" class="form-row-top1 form-row-left1" label-width="11%">
                                            <el-input v-model="item.schoolName" style="width: 60%"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="专业" prop="major" class="form-row-top1 form-row-left1" label-width="15%">
                                            <el-input v-model="item.major" style="width: 60%"></el-input>
                                        </el-form-item>

                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="学历" prop="degree" class="form-row-top1 form-row-left2" label-width="10%">
                                            <el-select  v-model="item.degree" style="width: 60%" >
                                                <el-option key="1" label="高中" value="高中"></el-option>
                                                <el-option key="2" label="大学" value="大学"></el-option>
                                                <el-option key="3" label="硕士" value="硕士"></el-option>
                                                <el-option key="4" label="博士" value="博士"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item label="专业描述" prop="majorDesc" class="form-row-top1 form-row-left2">
                                            <el-input type="textarea" v-model="item.majorDesc" style="width: 80%" :rows="3"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>

                            <el-row class="form-row-bottom form-row-left2">
                                <el-button type="primary" size="mini" @click="addEduExperience">增加新的教育经历</el-button>
                            </el-row>

                        </div>


                        <div class="form-row-top">
                            <span class="label-format1">项目经历</span>
                        </div>
                        <div class="backgroud-foramt1 form-row-top1">
                        <div v-for="(item,index) in form.projectExp">
                            <hr>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="项目经历" prop="projectDesc" class="form-row-top1 form-row-left2">
                                        <el-input type="textarea" v-model="item.projectDesc" style="width: 80%" :rows="4"></el-input>
                                        <!--显示删除按钮-->
                                        <el-button type="danger" size="mini" @click="deleteOriProjectItem(item,index)" v-show="index > 0" class="form-row-left1">删 除</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                            <!-- 动态增加项目 -->
                            <!-- 不止一个项目，用div包裹起来 -->
                            <div v-for="(item, index) in form.dynamicProjectItem" :key="index">
                                <el-row>
                                    <el-col :span="24">
                                        <el-form-item
                                                label="项目经历"
                                                class="form-row-top1 form-row-left2"
                                                prop="projectDesc">
                                            <el-input type="textarea" v-model="item.projectDesc"  style="width: 80%" :rows="4"></el-input>
                                            <el-button type="danger" size="mini" @click="deleteProjectItem(item,index)" class="form-row-left1">删 除</el-button>
                                        </el-form-item>

                                    </el-col>
                                </el-row>
                            </div>


                            <el-row class="form-row-bottom form-row-left2">
                                <el-button type="primary" size="mini" @click="addProjectItem()">增加新的项目经历</el-button>
                            </el-row>
                        </div>

                        <div class="form-row-top">
                            <span class="label-format1">添加至项目</span>
                        </div>
                        <div class="backgroud-foramt1 form-row-top1">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="当前所有项目" prop="projectList" class="form-row-top1 form-row-left2" label-width="10%">
                                        <el-tree
                                                ref="projectTree"
                                                :data="projectList"
                                                show-checkbox
                                                node-key="id"
                                                :default-expanded-keys="form.formProjectList.expandedKeys"
                                                :default-checked-keys="form.formProjectList.checkedKeys"
                                                :props="defaultProps">
                                        </el-tree>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>

                        <div class="form-row-top">
                            <span class="label-format1">添加收藏夹</span>
                        </div>
                        <div class="backgroud-foramt1 form-row-top1">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="当前所有收藏夹" class="form-row-top1 form-row-left2"
                                                  label-width="10%" prop="favList">
                                        <el-tree
                                                ref="favTree"
                                                :data="favList"
                                                show-checkbox
                                                node-key="id"
                                                :default-expanded-keys="form.formFavList.expandedKeys"
                                                :default-checked-keys="form.formFavList.checkedKeys"
                                                :props="defaultProps">
                                        </el-tree>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </div>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer button-position" >
                <el-button @click="cancelPersonInfo">取 消</el-button>
                <el-button type="primary" @click="saveEditPersonButton(form)">确 定</el-button>
        </span>
    </div>
</template>

<script>
    import { getAllIndustryList,getAllFavList,getAllProjectList,saveEditPerson
    } from '../../api/talent-lib/index';
    export default {
        name: 'personinfo',
        components: {},
        data() {
            return {
                form: {
                    dynamicProjectItem: [],
                    dynamicJobItem:[],
                    dynamicEduItem:[]
                },
                industryList:[],
                rules:{
                    name:[{required: true, message: '请输入姓名', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    companyName:[{ required: true, message: '请输入公司名称', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    post:[{ required: true, message: '请输入职位', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    sex:[{ required: true, message: '请选择性别', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    industry:[{ required: true, message: '请选择行业', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    birthDate:[{ required: true, message: '请选择出生日期', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    telephone:[{ required: true, message: '请输入手机号', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    mail:[{ required: true, message: '请输入邮箱地址', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    city:[{ required: true, message: '请输入城市', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    salary:[{ required: true, message: '请输入薪资', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    workingDate:[{ required: true, message: '请输入工作日期', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    post1:[{ required: true, message: '请输入职位', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    dept:[{ required: true, message: '请输入部门', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    postDesc:[{ required: true, message: '工作职责描述', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    eduDate:[{ required: true, message: '请输入日期', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    major:[{ required: true, message: '请输入专业信息', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    majorDesc:[{ required: true, message: '请输入专业描述信息', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    degree:[{ required: true, message: '请输入学历信息', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    tongZhao:[{ required: true, message: '请确认是否统招', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    schoolName:[{ required: true, message: '请输入学校名称', trigger: 'change' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    projectDesc:[{ required: true, message: '请输入项目描述',trigger:'change'},
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    // projectList:[{ required: true, message: '请选择项目', trigger: 'blur' }],
                },
                projectList:[],
                favList:[],
                defaultProps:[],
            };
        },
        //传入子组件的名称设置
        props: {
            tempPersonInfo:{
            type: Object,
            require: true
            }
        },
        created() {
            console.log("created-------------")
            // this._props['tempPersonInfo'];
            // debugger;
            this.getAllIndustryList();
            this.getAllProjectList();
            this.getAllFavList();
        },mounted(){
            console.log("mounted-------------")
            let _this=this;
            console.log(_this._props,9999);
            let datas=_this._props['tempPersonInfo'];
            // this.initForm();
            //有时候会获取不到，这时候可以用一个定时器来获取--跨页面传值遇到的坑........
            setTimeout(()=>{
                console.log(this._props,1010)
                // console.log(this._props,1010)
                console.log(datas,1111)
                // this.form = this._props['tempPersonInfo'];
                var temp1 ={
                    dynamicProjectItem: [], //this._props['tempPersonInfo']['projectExp'],
                    dynamicJobItem:[],
                    dynamicEduItem:[]
                }
                // debugger
                this.form = Object.assign(temp1,this._props['tempPersonInfo'])
                // this.form = this._props['tempPersonInfo'];
                // debugger
            },1000)
            // debugger;
        },destroyed() {
            console.log("destroyed-------")
        },
        methods: {
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
            //获取全部行业名称信息
            getAllIndustryList(){
                getAllIndustryList().then(res=>{
                    this.industryList=res;
                    // console.log(this.industryList);
                })

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
            //动态添加一个项目
            addProjectItem(){
                // debugger
                var projectDesc = '';
                var dynamicProjectItem=this.form.dynamicProjectItem;
                this.form.dynamicProjectItem.push({
                    projectDesc
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
            //删除原始项目信息
            deleteOriProjectItem(item,index){
                this.form.projectExp.splice(index,1);
            },
            //删除动态新增项目项
            deleteProjectItem(item, index){
                this.form.dynamicProjectItem.splice(index, 1);
            },
            //删除原始工作经验信息
            deleteOriJobItem(item, index){
                console.log("index---:   " + index);
                this.form.workExp.splice(index, 1);
            },
            //删除动态新增工作经验项
            deleteJobItem(item, index){
                console.log("index---:   " + index);
                this.form.dynamicJobItem.splice(index, 1);
            },
            //删除原始教育背景项
            deleteOriEduItem(item, index){
                console.log("index--deleteOriEduItem-:   " + index);
                // debugger;
                this.form.eduExp.splice(index, 1);
            },
            //删除动态新教育背景项
            deleteEduItem(item, index){
                console.log("index---:   " + index);
                this.form.dynamicEduItem.splice(index, 1);
            },

            //取消修改候选人信息
            cancelPersonInfo(){
                this.form={};
                this.$emit("showPersonInfoTable",false)
            },
            //保存修改候选人信息
            saveEditPersonButton(tempForm){
                // debugger
                if(tempForm==undefined || tempForm.length == 0){
                    this.$message.error("候选人信息不能全部为空");
                    return false;
                }else{
                    // debugger
                    // console.log(typeof this.form.projectExp)
                    // console.log(typeof this.form.dynamicProjectItem)
                    // this.form.projectExp.push(this.form.dynamicProjectItem);
                    // this.form.eduExp.push(this.form.dynamicEduItem);
                    // this.form.workExp.push(this.form.dynamicJobItem);
                    // this.form.dynamicProjectItem.concat(this.form.projectExp);
                    for(var i in this.form.dynamicJobItem){
                        var o = {};
                        o[i] = this.form.dynamicJobItem[i];
                        tempForm.workExp.push(o[i]);
                    };
                    for(var i in this.form.dynamicEduItem){
                        var o = {};
                        o[i] = this.form.dynamicEduItem[i];
                        tempForm.eduExp.push(o[i]);
                    };
                    for(var i in this.form.dynamicProjectItem){
                        var o = {};
                        o[i] = this.form.dynamicProjectItem[i];
                        tempForm.projectExp.push(o[i]);
                    };
                    // console.log(tempForm);
                    // debugger
                    saveEditPerson(tempForm).then(res=>{
                        if(res.status==0){
                            this.$message.success("信息修改成功");
                            // this.form.dynamicProjectItem=[];
                            // this.form.dynamicEduItem=[];
                            // this.form.dynamicJobItem=[];
                            //需要重置form
                            this.form={};
                            this.$emit("showPersonInfoTable",false)
                        }else{
                            this.$message.error("信息保存失败,请重新确认保存.")
                        }
                    }).catch()
                }
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
.button-position{
    margin-top: 20px;
    margin-bottom: 40px;
    margin-right: 10%;
    float: right;
}


</style>
