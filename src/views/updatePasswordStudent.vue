<template>
  <div class="container">
    <el-form
      label-width="100px"
      :model="formLabelAlign"
      style="max-width: 460px"
    >
      <el-form-item label="用户名">
        <p
          style="font-size: large; padding-left: 20px; color: white"
          id="number"
        >
          {{ store.user.number }}
        </p>
      </el-form-item>
      <el-form-item label="密码">
        <input v-model="password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updatePasswordStudent">
          提交
        </el-button>
        <el-button>
          <router-link to="/student">取消</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStore } from '@/stores'
const store = useStore()
store.getStudent()
const password = ref('')
// 注在vue页面中只能读取store的公共变量，但是不能进行修改，要修在还是在store中进行修改
const updatePasswordStudent = () => {
  store.updatePasswordStudent(password.value)
  password.value = ''
}

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
</script>
<style>
.container {
  height: 600px;
  display: flex;
  align-items: center;
  /* 水平居中 */
  justify-content: center;
  flex-wrap: wrap;
}

form {
  border: 1px rgb(193, 190, 190) solid;
  border-radius: 5px;
  padding: 30px 50px;
  padding-right: 100px;
  padding-top: 50px;
}
input {
  font-size: large;
  width: 75%;
  padding: 8px 20px;
  border-radius: 5px;
  border: 1px rgb(193, 190, 190) solid;
}
.container {
  background-color: black;
}

html {
  background-color: black;
  color: white;
}
</style>
