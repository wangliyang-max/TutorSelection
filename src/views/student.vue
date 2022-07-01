<script lang="ts" setup>
import type { Student, Teacher, StudentTeacher } from '@/datasource/Types'
import { useStore } from '@/stores'
import { computed, ref } from 'vue'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
const store = useStore()
store.getStudent()
store.getTeachers()

// 刷新页面
if (location.href.indexOf('#reloaded') == -1) {
  location.href = location.href + '#reloaded'
  location.reload()
}

// store.isSelectTeacher()
const studentTeacher = ref<StudentTeacher>({
  teacher: [],
})

// 将所有动态创建的checkbox元素装入数组
const checkboxsRef = ref<HTMLInputElement[]>([])
// 模拟总数
const amount = 1
// 每一个checkbox disabled值，由agree/当前被选数量/当前元素选中状态，决定
const checkboxDisabledC = computed(() => (c: HTMLInputElement) => {
  if (studentTeacher.value.teacher) {
    return studentTeacher.value.teacher.length >= amount && !c.checked
  }
})

function selectTeacher() {
  let result
  if (studentTeacher.value.teacher)
    result = confirm(
      '是否确认选择 ' + studentTeacher.value.teacher[0].number + ' 作为导师？'
    )
  if (result) {
    if (studentTeacher.value.teacher) store.selectTeacher(studentTeacher.value)
    studentTeacher.value.teacher = []
  }
}
</script>

<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <div class="grid-content ep-bg-purple">
          你好，{{ store.user.number }}
        </div>
      </el-col>
      <el-col :span="4" :offset="16">
        <div class="grid-content ep-bg-purple-light">
          <router-link to="/updatePasswordStudent">
            <a style="color: white">修改密码</a>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <!-- <div>student</div>
    <h1>请选择导师</h1> -->

    <div class="tableContainer">
      <h1 style="font-size: larger">请选择导师</h1>
      <table class="layui-table">
        <label>
          <thead>
            <tr>
              <label>
                <td>选择</td>
                <td>教师名称</td>
                <td>所带学生总数</td>
                <td>已选学生总数</td>
              </label>
            </tr>
          </thead>
        </label>
        <label>
          <tbody>
            <template v-for="(c, index) in store.teachers" :key="index">
              <tr>
                <label>
                  <td>
                    <input
                      ref="checkboxsRef"
                      type="checkbox"
                      v-model="studentTeacher.teacher"
                      :value="{ number: c.number }"
                      :disabled="checkboxDisabledC(checkboxsRef[index])"
                    />
                  </td>
                  <td>{{ c.name }}</td>
                  <td>{{ c.allStudent }}</td>
                  <td>{{ c.selectStudent }}</td>
                </label>
              </tr>
              <br />
            </template>
          </tbody>
        </label>
      </table>
      <button
        type="button"
        :disabled="studentTeacher.teacher!.length < amount"
        @click="selectTeacher"
        class="layui-btn layui-btn-radius layui-btn-primary"
        style="background-color: aliceblue"
      >
        提交
      </button>
      <br />
    </div>
    <!-- <template v-for="(c, index) in store.teachers" :key="index">
    <label class="rowTeacher">
      <input
        ref="checkboxsRef"
        type="checkbox"
        v-model="studentTeacher.teacher"
        :value="{ number: c.number }"
        :disabled="checkboxDisabledC(checkboxsRef[index])"
      />
      教师名称：{{ c.name }} 带学生总数：{{ c.allStudent }} 已选学生总数{{
        c.selectStudent
      }}
    </label>
    <br />
  </template> -->

    <!-- {{ studentTeacher.teacher }} -->
  </div>
</template>
<style lang="scss">
.el-row {
  margin-bottom: 20px;
  background-color: rgb(90, 90, 90);
  color: white;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: large;
  font-family: STHeiti;
}

.layui-table td {
  width: 200px;
  color: white;
  background-color: rgb(90, 90, 90);
  font-size: larger;
  border: black;
}
.tableContainer {
  text-align: center;
}
.layui-table {
  background-color: black;
}
.container {
  background-color: black;
}
html {
  background-color: black;
  color: white;
}
</style>
