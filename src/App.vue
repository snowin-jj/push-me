<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { platform } from '@tauri-apps/api/os'

import { useStateStore } from './store'
import Timer from './components/Timer.vue';
import BreakMenu from './components/BreakMenu.vue';
import TimeForm from './components/TimeForm.vue';
import AppTitleBar from './components/AppTitleBar.vue';


const bgColor = ref<"bg-transparent" | "bg-[#121212]">("bg-transparent")
const store = useStateStore()

onMounted(async () => {
  const color = await platform() === "win32" ? "bg-[#121212]" : "bg-transparent"
  bgColor.value = color
})


</script>

<template>
  <main data-tauri-drag-region class="min-h-[100dvh] grid place-items-center" :class="bgColor">
    <AppTitleBar />
    <Timer v-if="store.state === 'running' || store.state === 'paused'" />
    <BreakMenu v-else-if="store.state === 'break'" />
    <TimeForm v-else />
  </main>
</template>