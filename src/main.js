// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
import routes from 'assets/router/router.js'
import 'assets/stylus/index.styl'
import 'assets/fonts/fonts.css'


Vue.use(vueRouter)
Vue.use(vueResource)

const router = new vueRouter({
  mode: 'history',
	base: __dirname,
	routes: routes,
	linkActiveClass: 'active'
})

const app = new Vue({
	router,
	//render: h => h(App)
  //render 是vue里面实现渲染dom的函数，这句的目的是渲染这个app实例作用等于下面
	el: '#app',
	components: { App },
	template: "<App/>"
}).$mount('#app')
