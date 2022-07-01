 import type { User } from '@/datasource/Types'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import type { ResultVO } from '@/datasource/Types'
// import { USER_ROLE } from '@/datasource/Const'

// const mock = new MockAdapter(axios)
// // 过滤http前缀请求
// // mock.onAny(/^http/).passThrough()
// // mock.onAny(/^\/api\//).passThrough()


// // 正则表达式，解决请求中的变量问题
// // 地址，支持JS正则表达式
// // 正则表达式中 \，由转义符，\/，替代
// // 匹配任意字符，\w+；
// // $，结束。避免匹配多个
// // 整个表达式，置于/  /之间
// // 通用的，将{}占位符的字符串路径，转为正则表达式对象
// // 例如，/users/{uid}; /users/{uid}/courses/{hid}
// function path(p: string) {
//   const reg = p.replace(/{\w+}/g, '(\\w+)').replace(/\//g, '\\/') + '$'
//   return new RegExp(reg)
// }

// // c代表请求信息,包含header,code,data;传过来的user放在data中
// mock.onPost('/api/login').reply((c) => {
//     // 是传过来的请求携带的数据
//     const data = c.data
//     const { number, password } = JSON.parse(data)
//     if (number == "1001" && password == "123456") {
//         return [
//             // 状态码
//             200,
//             // body
//             {
//                 code: 200,
//                 data: {
//                    user:{name:'yang'}
//                 }
//             },
//             // header
//             {
//                 token: "1234567890",
//                 role: USER_ROLE
//             }
//         ]
//     }
//     return [
//             // 状态码
//             200,
//             // body
//             {
//                 // 业务码
//                 code: 401,
//                 message:"用户名密码错误"
//             },
//             // header
//         ]
    
// })

// // 对应store的getHome
// // c代表请求信息,包含header,code
// mock.onGet('/api/home').reply((c) => {
//     const header = c.headers
//     const token = header?.token
//     if (token == 1234567890) {
//         return [200, {
//                 code:200,
//                 data: {
//                    user:{name:'yang'}
//                 }
//         }]
//     }
//     return [
//         200,
//         {
//             code: 401,
//             message:'用户不存在'
//         }
//     ]
// })