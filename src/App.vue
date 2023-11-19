<script setup lang="ts">

import { useStateStore } from './store'
import Timer from './components/Timer.vue';
import BreakMenu from './components/BreakMenu.vue';
import TimeForm from './components/TimeForm.vue';

const store = useStateStore()

</script>

<template>
  <main class="relative min-h-[100dvh] grid place-items-center">
    <Timer v-if="store.state === 'running' || store.state === 'paused'" />
    <BreakMenu v-else-if="store.state === 'break'" />
    <TimeForm v-else />
  </main>
</template>