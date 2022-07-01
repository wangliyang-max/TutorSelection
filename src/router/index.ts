import { STUDENT_ROLE, TEACHER_ROLE } from '@/datasource/Const'
import { useStore } from '@/stores'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
const routes:Array<RouteRecordRaw> = []
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name:'login',
      path: '/login',
      component: () => import("@/views/login.vue")
    },
    {
      name:'student',
      path: '/student',
      component: () => import("@/views/student.vue"),
      meta:{
        role:STUDENT_ROLE
      },
    },
    {
      name:'studentTeacher',
      path: '/studentTeacher',
      component: () => import("@/views/studentTeacher.vue"),
      meta:{
        role:STUDENT_ROLE
      },
    },
    {
      name:'teacher',
      path: '/teacher',
      component: () => import("@/views/teacher.vue"),
      meta:{
        role:TEACHER_ROLE
      }
    },
    {
      name:'updatePasswordStudent',
      path: '/updatePasswordStudent',
      component: () => import("@/views/updatePasswordStudent.vue"),
    },
    {
      name:'updatePasswordTeacher',
      path: '/updatePasswordTeacher',
      component: () => import("@/views/updatePasswordTeacher.vue"),
    },
    // 重定向,上面所有路由不匹配的时候重回定向到user
    {
      name: 'nomatch',
      path: '/:pathMatch(.*)*',
      redirect: {name:'student'}
    }
  ]
})

  // 路由守卫
router.beforeEach((to, from, next) => {
  // 没有角色直接放过去
  if (!to.meta.role) {
    next()
    return
  }

  if (!sessionStorage.getItem('role')) {
    next({ name: 'login' })
    return
  }

  // teacher跳转
  if (to.meta.role != sessionStorage.getItem('role')&&sessionStorage.getItem('role')=="Pgku") {
    next({ name: 'teacher' })
    return
  }
  // 其他
  if (to.meta.role != sessionStorage.getItem('role')) {
    // 设置exception
    const store = useStore()
    store.exception = "无权限"
    return
}
  next()
})

export default router
