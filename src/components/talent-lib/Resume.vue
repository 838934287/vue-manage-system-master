<template>
    <div>



    </div>
</template>

<script>
    import { getAllTalletPersonList } from '../../api/talent-lib/index';
    export default {
        name: 'resume',
        components:{},
        data(){
            return{
                query:[],
                personList:[]
            }
        },
        created() {
            this.getAllTalletPersonList();
            console.log(this.getAllTalletPersonList())
        },
        methods:{
            getAllTalletPersonList(){
                getAllTalletPersonList(this.query).then(res=>{
                    this.personList = res;
                })
            },
        //   删除操作
            deleteItem(index,row){
                this.$confirm("确定要删除么？",'提示',{
                    type:'warning'
                }).then(()=>{
                    this.$message.info("删除成功");
                    this.personList.splice(index,1)
                }).catch()
            }
        }
    };
</script>

<style scoped>
    .button-text1{
        color: red;
    }

</style>