<script setup lang="ts">
import { onMounted } from 'vue';
import { useStateStore, useTimeStore } from '../store';

const store = useStateStore()
const timeStore = useTimeStore()

onMounted(async () => {
    await timeStore.start()
});

</script>

<template>
    <div class="flex flex-col gap-2 items-center justify-center">
        <p class="text-4xl font-black flex items-center gap-2">
            {{ timeStore.remainingMinutes }} : {{ timeStore.remainingSeconds }}
        </p>
        <div class="flex items-center gap-4">
            <button v-if="store.state === 'running'" @click="timeStore.pause">pause</button>
            <button v-if="store.state === 'paused'" @click="timeStore.start">resume</button>
            <button v-if="store.state === 'running' || store.state === 'paused'" @click="timeStore.reset">reset</button>
        </div>
    </div>
</template>