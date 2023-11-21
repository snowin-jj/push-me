<script setup lang="ts">

import { useStateStore } from './store'
import Timer from './components/Timer.vue';
import BreakMenu from './components/BreakMenu.vue';
import TimeForm from './components/TimeForm.vue';
import AppTitleBar from './components/AppTitleBar.vue';


const store = useStateStore()

</script>

<template>
  <main data-tauri-drag-region class="min-h-[100dvh] grid place-items-center">
    <AppTitleBar />
    <Timer v-if="store.state === 'running' || store.state === 'paused'" />
    <BreakMenu v-else-if="store.state === 'break'" />
    <TimeForm v-else />
  </main>
</template>