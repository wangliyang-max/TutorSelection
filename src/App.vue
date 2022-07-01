<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useStore } from '@/stores'
const AlertDialogVue = defineAsyncComponent(
  () => import('@/components/AlertDialog.vue')
)
const store = useStore()
</script>
<template>
  <div>
    <router-view />
  </div>
  <AlertDialogVue v-if="store.exception"></AlertDialogVue>
</template>
