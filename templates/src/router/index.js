import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/app/'),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
    },{
      path: '/student',
      children: [
        {
          path:'',
          name:'student-list',
          component: () => import('@/views/student/List.vue'),
          meta: {title: 'Students'}
        },{
          path:'enrollment',
          name:'student-enrollment',
          component: () => import('@/views/student/Enrollment.vue'),
          meta: {title: 'Student Enrollment'}
        }
      ]
    }
  ],
})

export default router
