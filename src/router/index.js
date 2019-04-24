/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Routes
import paths from './paths'

function route (path, view, name, meta) {
  return {
    name: name || view,
    path,
    meta,
    component: (resovle) => import(
      `@/views${view}.vue`
    ).then(resovle)
  }
}

Vue.use(Router)
var getCookie = function (name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return value ? value[2] : null
}
// Create a new router
const router = new Router({
  mode: 'history',
  routes: paths.map(path => route(path.path, path.view, path.name, path.meta)).concat([
    { path: '*', redirect: '/dashboard' }
  ]),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})
router.beforeEach((to, from, next) => {
  // var userBaseInfoMap = sessionStorage.getItem('USER_BASE_INFO_MAP')

  console.log(to)
  var userId = getCookie('_S_USER_ID')
  if (to.matched.some(record => record.meta.requiresAuth) && userId === null) {
    next({ path: '/login' })
  } else {
    next()
  }
})

Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development'
    }
  })
}

export default router
