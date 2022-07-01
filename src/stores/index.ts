import axios from '@/axios'
import * as consty from '@/datasource/Const'
import type { Teacher,Student, User,StudentTeacher } from '@/datasource/Types'
import type { ResultVO } from '@/datasource/Types'
import router from '@/router'
import teacherVue from '@/views/teacher.vue'
// import { th } from 'element-plus/es/locale'
import { defineStore, storeToRefs } from 'pinia'

export const useStore = defineStore('state', {
  state: () => ({
    exception: "",
    user: {} as User,
    count: 0,
    teachers: [] as Teacher[],
    teacher: '' as Teacher,
    students: [] as Student[]
  }),
  actions: {
    // async isSelectTeacher() {
    //   let studentNumber = this.user.number
    //   const resp =await axios.post("/api/isSelectTeacher", studentNumber)
    //   let selectTeacher = resp.data.data.selectTeacher
    //   if (selectTeacher) {
    //      // 路由跳转
    //   let  path = '/studentTeacher'
    //   router.push(path)
    //   }
    // },
    async login(user: User) {   
      const resp = await axios.post("/api/login", user)

      // resp事情求带回来的数据
      const token = resp.headers.token
      const role = resp.headers.role
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('role', role)

      this.exception = resp.data.exception
      this.user = resp.data.data.user
      
      if (resp.data.data.message) {
        this.exception = resp.data.data.message
      }
      
      let path=''
      switch (role) {
        case consty.STUDENT_ROLE: {
          let studentNumber = this.user.number
          console.log(this.user.number)
          
              const resp = await axios.post("/api/isSelectTeacher", studentNumber,{ headers: { 'Content-Type': 'application/json' } })
              let selectTeacher = resp.data.data.selectTeacher
              if (selectTeacher) {
                // 路由跳转
                path = '/studentTeacher'
              } else {
                path = '/student'
              }
            }
          break;
        case consty.TEACHER_ROLE:
          path = '/teacher'
          break;
      }

      // 路由跳转
      router.push(path)
    },

    // 跳转后将用户的id传递给user
    // 刷新页面，store数据会丢失，所以直接传递token
    async getStudent() {
      // 获取登陆的token
      const token = sessionStorage.getItem('token')
      const resp = await axios.post('/api/student', token, { headers: { 'Content-Type': 'application/json' } })
      this.user = resp.data.data.student
    },
    async getStudentTeacher() {
      const token = sessionStorage.getItem('token')
      const resp0 = await axios.post('/api/student', token, { headers: { 'Content-Type': 'application/json' } })
      this.user = resp0.data.data.student

      const user = this.user
      const resp = await axios.post('/api/getStudentTeacher', user)
      let teacher:Teacher = resp.data.data.teacher
      this.teacher = teacher
    },

    async getTeacher() {
      // 获取登陆的token
      const token= sessionStorage.getItem('token')
      const resp = await axios.post('/api/teacher', token, { headers: { 'Content-Type': 'application/json' } })
      this.user = resp.data.data.teacher
      this.teacher = resp.data.data.teacher
    },

    async updatePasswordStudent(password: string) {
      // console.log(password)
      const user: User = {
        number: this.user.number,
        password: password
      }
      // console.log(user)
      const resp = await axios.post("/api/updatePasswordStudent", user)
      const result = resp.data.data.result
      if (result) {
        this.exception = result
      } else {
        this.exception = resp.data.exception
      }
      
    },
    async updatePasswordTeacher(password: string) {
      const user: User = {
        number: this.user.number,
        password: password
      }
      // console.log(user)
      const resp = await axios.post("/api/updatePasswordTeacher", user)
      const result = resp.data.data.result
      if (result) {
        this.exception = result
      } else {
        this.exception = resp.data.exception
      }
    },

    async getTeachers() {
      const resp = await axios.post('/api/getteachers')
      this.teachers = resp.data.data.teachersList
    },

    async selectTeacher(studentTeacher: StudentTeacher) {
      let teacherNumber:string =''
      if(studentTeacher.teacher)
      teacherNumber= studentTeacher.teacher[0].number ?? ''

      const student: Student = {
        number: this.user.number,
        teacherNumber: teacherNumber
      }
      const resp = await axios.post('/api/selectteacher', student)

      let result = resp.data.data.result
      if (result) {
        this.exception = result
         router.push('/studentTeacher')
      } else {
        this.exception = resp.data.exception
      }

      // var timer =setTimeout(function(){
      //   location.reload();
      //   clearTimeout(timer);
      //   },1000);

    },

    async getStudents() {
      // 获取登陆的token
      const token= sessionStorage.getItem('token')
      const resp0 = await axios.post('/api/teacher', token, { headers: { 'Content-Type': 'application/json' } })
      this.user = resp0.data.data.teacher
      const resp = await axios.post('/api/getStudents', this.user)
      this.students = resp.data.data.studentsList
      // console.log(this.students)
    }
  }
})
