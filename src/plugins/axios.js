import Vue from 'vue'

// Lib imports
import axios from 'axios'
// axios.defaults.withCredentials = true

// eslint-disable-next-line
var setCookie = function (name, value, day) {
  var date = new Date()
  date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000)
  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/'
}
// eslint-disable-next-line
var getCookie = function (name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return value ? value[2] : null
}
// eslint-disable-next-line
var deleteCookie = function (name) {
  var date = new Date()
  document.cookie = name + '= ' + '; expires=' + date.toUTCString() + '; path=/'
}

axios.defaults.baseURL = process.env.SERVER_URL || 'http://localhost:8080'
axios.interceptors.request.use((config) => {
  var session = sessionStorage.getItem('USER_BASE_INFO_MAP')
  session = JSON.parse(session)
  config.data = Object.assign(config.data, session)
  return config
})

Vue.prototype.$http = axios
