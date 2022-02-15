import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
/*
 * 公开路由表
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard-Father',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'el-icon-Share',
          affix: true
        }
      }
    ]
  }
]

/*
 *  权限路由表
 */

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/p1',
    meta: {
      title: 'permission',
      icon: 'el-icon-Share'
    },
    children: [
      {
        path: 'p1',
        component: () => import('@/views/permission'),
        name: 'perssion-1',
        meta: {
          roles: ['editor'],
          title: 'permission',
          icon: 'permission'
        }
      },
      {
        path: 'p2',
        component: () => import('@/views/permission'),
        name: 'perssion-2',
        meta: {
          roles: ['editor'],
          title: 'permission',
          icon: 'permission'
        }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: 'Nested Routes',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu 1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            // hidden: true,
            meta: { title: 'Menu 1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            // hidden: true,
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'Menu 1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu 1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu 1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu 1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'Menu 2' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
  // scrollBehavior: () => ({ top: 0 })
})
export default router
