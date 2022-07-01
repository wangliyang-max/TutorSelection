// 请求返回的数据类型
export interface ResultVO {
  code: number
  message?: string
  data?: any
}
export interface User {
  id?: number
  name?: string
  number?: string
  password?:string
  level?: number
  createTime?: string
  updateTime?: string
}

// 用户数据类型
export interface Student {
  id?: number
  name?: string
  number?: string
  password?:string
  level?: number
  teacherNumber?:string
  createTime?: string
  updateTime?: string
}
// 用户数据类型
export interface Teacher {
  id?: number
  name?: string
  number?: string
  password?: string
  allStudent?:number
  selectStudent?:number
  level?: number
  createTime?: string
  updateTime?: string
}

// 用户数据类型
export interface StudentTeacher {
  teacher?:Teacher[]
}