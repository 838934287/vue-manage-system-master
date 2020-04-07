import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
    // 全局变量
    state: {
        user: undefined,
        menuList: [],
        login:{},
    },
    // 修改全局变量必须通过mutations中的方法
    // mutations只能采用同步方法
    mutations: {
        login (state, payload) {//全局login函数
            state.user = payload.user//这里有缓存，在下一个页面可以继续调用user对象
            state.menuList = payload.items;
            state.login = payload;
            sessionStorage.setItem("user",JSON.stringify(payload.user));
            sessionStorage.setItem("menuList",JSON.stringify(payload.items));
            sessionStorage.setItem("login",JSON.stringify(payload));
            //debugger
        },
        logout (state) {
            state.user = undefined//清楚缓存
            sessionStorage.clear();
        },
    },
    // 异步方法用actions
    // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
    actions: {
        login (context, payload) {
            context.commit('login', payload)
        },
        logout (context) {
            console.log("logout--:  " & context)
            context.commit('logout')
        }
    }
})

export default store//对外告诉全局，以上内容缓存到store中

