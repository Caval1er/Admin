import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
/*
 * 公开路由表
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/layout'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue')
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
    children: [
      {
        path: 'p1',
        component: () => import('@/views/permission'),
        meta: {
          roles: ['editor']
        }
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
