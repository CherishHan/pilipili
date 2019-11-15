// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false

/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
	console.log(to.path);
	console.log(from.path);
	if(to.path == '/login'){
		next();
	}else{
		next();
	}
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
