import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
   state: {  //用来存储数据
     isLogin: localStorage.getItem("isLogin"),   //用来显示是否登录
     currentUser: localStorage.getItem("currentUser") //用来显示用户信息
   },

   getters: {   //获取数据状态
     getIsLogin: state => state.isLogin,
     getCurrentUser: state => state.currentUser
   },

   mutations: {   //更改数据状态
     setIsLogin(state, data){
       state.isLogin = data;
       localStorage.setItem("isLogin", data);
     },
     setCurrentUser(state, data){
       state.currentUser = data;
       localStorage.setItem("currentUser", data);
     },
     logout(state){
       localStorage.clear();
       state.isLogin = false;
       state.currentUser = ''
     }
   }
});

export default store;
