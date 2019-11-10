// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import '@/assets/css/reset.css'
import MyHttpSever from '@/plugins/http.js'
import MyBread from '@/components/cuscom/myBread.vue'
import moment from 'moment'

Vue.use(ElementUI);
Vue.use(MyHttpSever);
Vue.config.productionTip = false


Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})
// 全局组件
Vue.component(MyBread.name,MyBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
