<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { platform } from '@tauri-apps/api/os';

import { useStateStore } from './store';
import Timer from './components/Timer.vue';
import BreakMenu from './components/BreakMenu.vue';
import TimeForm from './components/TimeForm.vue';
import AppTitleBar from './components/AppTitleBar.vue';

const isBlur = ref(true);

onMounted(async () => {
    try {
        const platformName = await platform();
        isBlur.value = platformName === 'linux' ? false : true;
    } catch (error) {
        console.error('Error retrieving platform:', error);
    }
});

const store = useStateStore();
</script>

<template>
    <main
        data-tauri-drag-region
        class="grid min-h-[100dvh] place-items-center"
        :class="{ 'rounded-xl bg-zinc-800': !isBlur }"
    >
        <AppTitleBar />
        <Timer v-if="store.state === 'running' || store.state === 'paused'" />
        <BreakMenu v-else-if="store.state === 'break'" />
        <TimeForm v-else />
    </main>
</template>
