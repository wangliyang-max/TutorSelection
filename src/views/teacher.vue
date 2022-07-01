<script lang="ts" setup>
import { useStore } from '@/stores'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

const store = useStore()
store.getTeacher()
store.getStudents()
// 刷新页面
if (location.href.indexOf('#reloaded') == -1) {
  location.href = location.href + '#reloaded'
  location.reload()
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
          <router-link to="/updatePasswordTeacher">
            <a style="color: white">修改密码</a>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <!-- <div>Teacher</div> -->
    <div style="margin-bottom: 20px; font-size: larger">学生选择情况</div>
    <div class="studentContainer">
      所带学生总数：{{ store.teacher.allStudent }}
      <br />
      已选学生数：{{ store.teacher.selectStudent }}
      <br />
      <br />
      <br />
      <template v-for="(c, index) in store.students" :key="index">
        学生姓名：{{ c.name }}
        <br />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
  background-color: rgb(90, 90, 90);
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
.container {
  background-color: black;
  color: white;
  text-align: center;
}

html {
  background-color: black;
  color: white;
}
.studentContainer {
  width: 800px;
  margin: auto;
  background-color: rgb(90, 90, 90);
  padding: 20px;
  font-size: larger;
}
</style>
