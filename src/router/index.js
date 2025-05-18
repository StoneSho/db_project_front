import Vue from 'vue'
import Router from 'vue-router'
import Student from '@/components/Student.vue'
import Grade from '@/components/Grade.vue'
import Course from '@/components/Course.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/student'
    },
    {
      path: '/student',
      component: Student
    },
    {
      path: '/grade',
      component: Grade
    },
    {
      path: '/course',
      component: Course
    }
  ]
})