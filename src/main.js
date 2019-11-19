// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import axios from 'axios'
import store from '../static/store';

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */

// router.beforeEach((to, from, next) => {
// 	console.log(to.path);
// 	console.log(from.path);
// 	if(to.path == '/login'){
// 		next();
// 	}else if(to.path == '/register'){
// 		console.log('register');
//         next();
// 	}else{
// 		next();
// 	}
// });

new Vue({
  el: '#app',
  router,
  store: store,
  render: h => h(App)
})
