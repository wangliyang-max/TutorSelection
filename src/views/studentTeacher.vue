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
store.getStudentTeacher()
</script>

<template>
  <div class="container">
    <el-row>
      <el-col :span="4">
        <div class="grid-content ep-bg-purple">
          你好，{{ store.user.number }}
        </div>
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="4" :offset="12">
        <div class="grid-content ep-bg-purple-light">
          <router-link to="/updatePasswordStudent">
            <a style="color: white">修改密码</a>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <!-- <div>studentTeacher</div> -->
    <div class="teacherContainer">
      <div>已选导师</div>
      <br />
      导师名称：{{ store.teacher.name }}
      <br />
      带学生总数：{{ store.teacher.allStudent }}
      <br />
      已选学生总数：{{ store.teacher.selectStudent }}
    </div>
    <br />
    <br />
    <div class="grid-content ep-bg-purple-light">
      <router-link to="/student">
        <a
          class="layui-btn layui-btn-radius layui-btn-primary"
          style="background-color: aliceblue"
        >
          重新选择导师
        </a>
      </router-link>
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
.teacherContainer {
  width: 800px;
  margin: auto;
  background-color: rgb(90, 90, 90);
  padding: 20px;
  font-size: larger;
}
.container {
  background-color: black;
}

html {
  background-color: black;
  color: white;
}
</style>
