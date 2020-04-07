import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import store from './vuex'// 引入全局数据控制



Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    // debugger
    document.title = `${to.meta.title} | vue-manage-system`;
    // const role = sessionStorage.getItem('ms_username');
    var user = sessionStorage.getItem("user");
    // console.log(store)
    // if(store!=undefined){
    //     user = store.state.user;
    // };
    if(to.path==='/register'){
        next();
    }
    // if (!role && to.path !== '/login') {
    else if (!user && to.path !== '/login') {
        // this.$message.error("请输入正确的账号密码.")
        next('/login');
        // } else if (to.meta.permission) {
    } else if (user) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        // role === 'admin' ? next() : next('/403');
        // store.state.user = sessionStorage.getItem("user");
        // store.state.menuList = sessionStorage.getItem("menuList")
        console.log(store.state.menuList,10023)
        next();
        // debugger
    }
    else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }
        else {
            next();
        }
    }
});


new Vue({
    router,
    i18n,
    store,
    // created(){
    //     debugger
    //     console.log(sessionStorage.getItem("user"),1002)
    //     if(sessionStorage.getItem("user")===null){
    //         sessionStorage.setItem("user",'');
    //         this.$router.push("/login");
    //     }else {
    //         this.$store.state.user = sessionStorage.getItem("user");
    //         this.$store.state.menuList = sessionStorage.getItem("menuList")
    //         // this.$router.push("/dashboard");
    //         this.$router.push(this.$route.path)
    //         // this.$route.path;
    //         console.log(this.$route.path,10020)
    //         console.log(window.location.href)
    //         debugger
    //     }
    // }
    render: h => h(App)
}).$mount('#app');



