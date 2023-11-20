<script setup lang="ts">
import { useStateStore, useTimeStore } from '../store'

const store = useStateStore()
const timeStore = useTimeStore()

function handleSubmit(_e: Event) {
    if (timeStore.minutes && timeStore.minutes !== 0) {
        store.changeState("running")
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col items-center gap-2 w-full max-w-xs">
        <label for="minutes"></label>
        <input type="number" name="minutes" id="minutes" v-model="timeStore.minutes"
            class="w-full max-w-[8rem] text-4xl md:text-6xl md:max-w-[16rem] lg:text-8xl font-black py-1 px-2 appearance-none text-center bg-transparent rounded-none"
            autofocus required>
        <button type="submit" class="">start</button>
    </form>
</template>