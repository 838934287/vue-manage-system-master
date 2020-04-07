<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content1">
                    <el-form :model="form" label-position="left" :rules="rules" ref="formData">
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
                                            placeholder="选择日期">
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
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="工作时间" prop="workingDate" class="form-row-top form-row-left2" label-width="15%">
                                        <el-date-picker
                                                v-model="form.workingDate"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                        </el-date-picker>

                                    </el-form-item>
                                </el-col>
                                <el-col :span="4"  align="center">
                                    <el-form-item class="form-row-top" prop="onJob">
                                        <el-checkbox v-model="form.onJob">是否在职</el-checkbox>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="公司名称"  class="form-row-top1 form-row-left1"
                                                  prop="companyName" label-width="8%">
                                        <el-input v-model="form.companyName" style="width: 60%"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="职位" prop="post1" class="form-row-top1 form-row-left1" label-width="16%">
                                        <el-input v-model="form.post1" style="width: 60%"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="部门" prop="dept" class="form-row-top1 form-row-left1" >
                                        <el-input v-model="form.dept" style="width: 60%"></el-input>
                                    </el-form-item>

                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="职责描述" prop="postDesc" class="form-row-top1 form-row-left2" label-width="7%">
                                        <el-input type="textarea" v-model="form.postDesc" style="width: 80%" :rows="3"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

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
                                                    end-placeholder="结束日期">
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
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="时间" prop="eduDate" class="form-row-top form-row-left2" label-width="15%">
                                        <el-date-picker
                                                v-model="form.eduDate"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期">
                                        </el-date-picker>

                                    </el-form-item>

                                </el-col>
                                <el-col :span="4"  align="center">
                                    <el-form-item class="form-row-top">
                                        <el-checkbox v-model="form.twoOneOne">211</el-checkbox>
                                        <el-checkbox v-model="form.nineEightFive">985</el-checkbox>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="学校" prop="schoolName" class="form-row-top1 form-row-left1" label-width="11%">
                                        <el-input v-model="form.schoolName" style="width: 60%"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="专业" prop="major" class="form-row-top1 form-row-left1" label-width="15%">
                                        <el-input v-model="form.major" style="width: 60%"></el-input>
                                    </el-form-item>

                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="学历" prop="degree" class="form-row-top1 form-row-left2" label-width="10%">
                                        <el-select  v-model="form.degree" style="width: 60%" >
                                            <el-option key="1" label="高中" value="高中"></el-option>
                                            <el-option key="2" label="大学" value="大学"></el-option>
                                            <el-option key="3" label="硕士" value="硕士"></el-option>
                                            <el-option key="4" label="博士" value="博士"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="是否统招" prop="tongZhao" class="form-row-top1 form-row-left1" label-width="15%">
                                        <el-select v-model="form.tongZhao" style="width: 50%">
                                            <el-option key="1" label="是" value="是"></el-option>
                                            <el-option key="2" label="否" value="否"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="专业描述" prop="majorDesc" class="form-row-top1 form-row-left2">
                                        <el-input type="textarea" v-model="form.majorDesc" style="width: 80%" :rows="3"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

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
                                                    end-placeholder="结束日期">
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
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="项目经历" prop="projectDesc" class="form-row-top1 form-row-left2">
                                        <el-input type="textarea" v-model="form.projectDesc" style="width: 80%" :rows="4"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

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
                                                :data="this.projectList"
                                                show-checkbox
                                                node-key="id"
                                                :props="this.defaultProps">
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
                                                :data="this.favList"
                                                show-checkbox
                                                node-key="id"
                                                :props="this.defaultProps">
                                        </el-tree>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </div>
                    </el-form>
                </div>
            </el-col>
        </el-row>
        <div  class="dialog-footer">
            <span slot="footer" >
                    <el-button @click="cancelNewPersonInfo()">取 消</el-button>
                    <el-button type="primary" @click="saveNewPersonButton('formData')">确 定</el-button>
            </span>
        </div>
    </div>
</template>

<script>
    import { getAllIndustryList,getAllFavList,getAllProjectList,saveNewPerson
    } from '../../api/talent-lib/index';
    export default {
        name: 'newPersonInfo',
        components: {},
        data() {
            return {
                form:{
                    dynamicProjectItem: [],
                    dynamicJobItem: [],
                    dynamicEduItem: [],
                    name:"",
                    sex:"",
                    industry:"",
                    company:"",
                    birthDate:"",
                    mail:"",
                    telephone:"",
                    post:"",
                    salary:"",
                    workExp:{
                        workingDate:[],
                        onJob:[],
                        postDesc:[],
                        dept:"",
                        post1:"",
                        companyName:"",

                    },
                    eduExp:{
                        eduDate:[],
                        schoolName:"",
                        major:"",
                        degree:"",
                        tongZhao:[],
                        majorDesc:"",
                        twoOneOne:[],
                        nineEightFive:[],
                    },
                    projectExp:{
                        projectDesc:"",
                    },
                    formProjectList:"",
                    formFavList:"",
                },
                industryList:[],
                rules:{
                    name:[{required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    companyName:[{ required: true, message: '请输入公司名称', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    post:[{ required: true, message: '请输入职位', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    sex:[{ required: true, message: '请选择性别', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    industry:[{ required: true, message: '请选择行业', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    birthDate:[{ required: true, message: '请选择出生日期', trigger: 'blur' }],
                    telephone:[{ required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    mail:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    city:[{ required: true, message: '请输入城市', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    salary:[{ required: true, message: '请输入薪资', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    workingDate:[{ required: true, message: '请输入工作日期', trigger: 'blur' }],
                    post1:[{ required: true, message: '请输入职位', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    dept:[{ required: true, message: '请输入部门', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    postDesc:[{ required: true, message: '工作职责描述', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    eduDate:[{ required: true, message: '请输入日期', trigger: 'blur' }],
                    major:[{ required: true, message: '请输入专业信息', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    majorDesc:[{ required: true, message: '请输入专业描述信息', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    degree:[{ required: true, message: '请输入学历信息', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    tongZhao:[{ required: true, message: '请确认是否统招', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    schoolName:[{ required: true, message: '请输入学校名称', trigger: 'blur' },
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    projectDesc:[{ required: true, message: '请输入项目描述',trigger:'blur'},
                        { min: 1, max: 80, message: "长度在1到200个字符" }],
                    // projectList:[{ required: true, message: '请选择项目', trigger: 'blur' }],
                },
                projectList:[],
                favList:[],
                defaultProps:[],
            };
        },

        created() {
            console.log("created-------------")
            // this._props['tempPersonInfo'];
            // debugger;
            var temp = {};
            this.getAllIndustryList();
            this.getAllProjectList();
            this.getAllFavList();
        },mounted(){
            // this.form.eduExp=[],
            // this.form.workExp=[],
            // this.form.projectExp=[]
            this.initFormdata();
        },
        methods: {
            //初始化Form数据
            initFormdata(){

                this.form.dynamicProjectItem= [],
                this.form.dynamicJobItem= [],
                this.form.dynamicEduItem= [],
                this.form.name="",
                this.form.sex="",
                this.form.industry="",
                this.form.company="",
                this.form.birthDate="",
                this.form.mail="",
                this.form.telephone="",
                this.form.post="",
                this.form.salary="",
                this.form.workExp=[],
                this.form.workExp.workingDate=[],
                this.form.workExp.onJob=[],
                this.form.workExp.postDesc=[],
                this.form.workExp.dept="",
                this.form.workExp.post1="",
                this.form.workExp.companyName="",

                this.form.eduExp=[],
                this.form.eduExp.eduDate=[],
                this.form.eduExp.schoolName="",
                this.form.eduExp.major="",
                this.form.eduExp.degree="",
                this.form.eduExp.tongZhao=[],
                this.form.eduExp.majorDesc="",
                this.form.eduExp.twoOneOne=[],
                this.form.eduExp.nineEightFive=[],

                this.form.projectExp=[],
                this.form.projectExp.projectDesc="",

                this.form.formProjectList="",
                this.form.formFavList=""




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
            cancelNewPersonInfo(){
                this.form={};
                this.$emit("showNewPersonInfoTable",false)
            },
            //保存新建人才信息
            saveNewPersonButton(formName){
                console.log(formName)
                //获取Project 信息
                var tempProjectDesc = {"projectDesc":this.form.projectDesc};
                this.form.projectExp.push(tempProjectDesc);
                for(var i in this.form.dynamicProjectItem){
                    var o ={};
                    o[i]=this.form.dynamicProjectItem[i];
                    this.form.projectExp.push(this.form.dynamicProjectItem[i]);
                }
                //获取工作经验信息
                var tempWorkingDate={"workingDate":this.form.workingDate};
                var tempOnJob={"onJob":this.form.onJob};
                var tempPostDesc= {postDesc:this.form.postDesc};
                var tempDept = {"dept": this.form.dept};
                var tempPost1 = {"psot1":this.form.post1};
                var tempCompanyName={   "companyName":this.form.companyName};
                var workExp=Object.assign(tempWorkingDate,tempOnJob,tempPostDesc,tempDept,tempPost1,tempCompanyName);
                this.form.workExp.push(workExp);
                for(var i in this.form.dynamicJobItem){
                    var o={};
                    o[i] = this.form.dynamicJobItem[i];
                    this.form.workExp.push(o[i]);
                }

                //获取教育背景信息
                var tempEduDate={"eduDate":this.form.eduDate};
                var tempSchoolName = {"schoolName":this.form.schoolName};
                var tempMajor= {"major":this.form.major};
                var tempDegree={"degree":this.form.degree} ;
                var tempTongZhao={"tongZhao":this.form.tongZhao};
                var tempMajorDesc={"majorDesc":this.form.majorDesc};
                var tempTwoOneOne={"twoOneOne":this.form.twoOneOne};
                var tempNineEightFive={"nineEightFive":this.form.nineEightFive};
                var eduExp=Object.assign(tempEduDate,tempSchoolName,tempMajor,tempDegree,tempTongZhao,
                    tempMajorDesc,tempTwoOneOne,tempNineEightFive);
                this.form.eduExp.push(eduExp);
                for(var i in this.form.dynamicEduItem){
                    var o={};
                    o[i] = this.form.dynamicEduItem[i];
                    this.form.eduExp.push(o[i]);
                }
                // debugger
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        //如果通过验证 to do...
                        let _this = this;

                        let projectList = _this.$refs.projectTree.getCheckedKeys();
                        // console.log(this.$refs.projectTree.getHalfCheckedKeys());
                        // console.log(this.$refs.projectTree.getCheckedKeys());
                        // console.log(this.$refs.projectTree.getHalfCheckedNodes());
                        // console.log(this.$refs.projectTree.getCheckedNodes());
                        let favList = _this.$refs.favTree.getCheckedKeys();
                        this.form.formProjectList = _this.projectList;
                        this.form.formFavList = _this.favList;
                        var tempForm = _this.form;
                        // debugger;
                        saveNewPerson(tempForm).then(res=>{
                            console.log(res,101010 );
                            var status = res.status;
                            console.log(res.status,101011)
                        //     debugger
                        //     // res.status;
                            if(status=='0'){
                                this.$emit("showNewPersonInfoTable",false);
                                this.$message.success("新建成功")
                                location.reload();
                            }else{
                                this.$message.warning(res.message);
                            }
                        }).catch()

                    } else {
                        this.$message.error("请输入必填信息");
                        var tempForm = this.form;
                        console.log(tempForm)
                        // debugger
                        return false
                    }
                })
            }
        }
    };
</script>

<style scoped>
.handle-box {
    margin-bottom: 40px;

}

.table {
    width: 100%;
    font-size: 14px;
}

.handle-box-left{
    float: left;
}
.handle-box-right{
    float: right;
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
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 20px;
    float: right;
}


</style>
