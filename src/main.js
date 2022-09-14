// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/api/axios.js'
import qs from 'qs'
import VueCookie from 'js-cookie'
// import cloneDeep from 'lodash/cloneDeep'
import './assets/global.css'
import 'default-passive-events'
import *as echarts from 'echarts'
import gobalVariable from '@/api/gobleVariable.js'
Vue.use(ElementUI, VueCookie)
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
Vue.prototype.$cookie = VueCookie
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

// 全局变量
Vue.prototype.GOBAL = gobalVariable
// 保存整站vuex本地储存初始状态


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
router.beforeEach((to, from, next) => {
    let token = VueCookie.get("token");
    if (token != null || token != "") {
        next();
    } else {
        to.matched.some(record => record.meta.isLogin);
    }
})