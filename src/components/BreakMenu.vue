<script setup lang="ts">

import { useTimeStore } from '../store';

const timeStore = useTimeStore()

</script>

<template>
    <div class="flex flex-col items-center gap-2 text-center">
        <h1 class="text-xl font-bold text-primary">Break Time</h1>
        <p class="text-base px-2">Take some time, Go for a walk.</p>
        <div class="flex items-center">
            <button @click="timeStore.reset">reset</button>
            <button @click="timeStore.restart">restart</button>
        </div>
    </div>
</template>