<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        created(){
            //在页面刷新时将vuex里的信息保存到sessionStorage里
            window.addEventListener("beforeunload",()=>{
                sessionStorage.setItem("loginData",JSON.stringify(this.$store.state))
                console.log(sessionStorage.getItem("loginData"),20001)

            })
            //在页面加载时读取sessionStorage里的状态信息
            // sessionStorage.getItem("login") &&
            this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(sessionStorage.getItem("loginData"))));
            console.log(sessionStorage.getItem("loginData"),20002);
            console.log(this.$store.state,20003);
        },

        // created() {
        //     //在页面加载时读取sessionStorage里的状态信息
        //     if (sessionStorage.getItem("login")) {
        //         console.log(sessionStorage.getItem("login"),1110)
        //         console.log(typeof sessionStorage.getItem("login"),1111);
        //         this.$store.replaceState(Object.assign({}, this.$store.state.login, JSON.parse(sessionStorage.getItem("login"))))
        //         debugger
        //     }
        //     //在页面刷新时将vuex里的信息保存到sessionStorage里
        //     window.addEventListener("beforeunload",()=>{
        //         sessionStorage.setItem("login",JSON.stringify(this.$store.state.login))
        //
        //     })
        // }
    }

</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>