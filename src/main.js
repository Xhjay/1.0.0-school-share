import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import router from './router'
// 导入全局样式
import './assets/css/global.css'

// 导入字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'

Vue.config.productionTip = false

// 挂载confirm

Vue.prototype.$http = axios
// 配置请求的根路径
axios.defaults.baseURL = `http://127.0.0.1:8888/api/private/v1/`
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
