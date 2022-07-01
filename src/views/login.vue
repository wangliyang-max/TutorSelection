<template>
  <div class="body">
    <div class="videoContainer">
      <video class="fullscreenVideo" id="v" playsinline autoplay muted loop>
        <!-- <video class="fullscreenVideo" id="v"> -->
        <source src="../resource/img/bg1.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="login">
      <input type="text" v-model="userForm.number" />
      <br />
      <input type="password" v-model="userForm.password" />
      <br />
      <button type="submit" @click="login">登录</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/stores'
import { ref } from 'vue'

const store = useStore()
const userForm = ref({ number: '', password: '' })

const login = () => {
  const user = {
    number: userForm.value.number,
    password: userForm.value.password,
  }
  store.login(user)
  // 置空
  userForm.value.number = ''
  userForm.value.password = ''
}
</script>
<style>
#v {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  object-fit: cover;
}
.videoContainer {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -100;
}
.videoContainer:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  top: 0;
  left: 0;
  background: rgba(25, 29, 34, 0.65);
}
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 150px;
  background-color: rgba(30, 60, 120, 0.3);
  padding: 25px 50px;
  border-radius: 7px;
  border: 1px solid rgba(50, 70, 250, 0.7);
  /*为一个元素后面区域添加图形效果*/
  backdrop-filter: blur(5px);
  animation-name: fade-down;
  animation-duration: 1s;
  padding: 50px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
}
.login input {
  font-size: large;
  width: 75%;
  padding: 8px 20px;
  border-radius: 5px;
  border: 0px;
}
.login button {
  font-size: large;
  width: 30%;
  padding: 10px 15px;
  border-radius: 5px;
  border: 0px;
}
</style>
