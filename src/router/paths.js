/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/login',
    // Relative to /src/views
    view: '/base/Login'
  },
  {
    path: '/dashboard',
    // Relative to /src/views
    view: '/base/Dashboard',
    meta: { requiresAuth: true }
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    view: '/base/UserProfile',
    meta: { requiresAuth: true }
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: '/base/TableList'
  },
  {
    path: '/typography',
    view: '/base/Typography'
  },
  {
    path: '/icons',
    view: '/base/Icons'
  },
  {
    path: '/maps',
    view: '/base/Maps'
  },
  {
    path: '/notifications',
    view: '/base/Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: '/base/Upgrade'
  }
]
