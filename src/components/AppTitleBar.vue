<script setup lang="ts">
import { appWindow } from '@tauri-apps/api/window'
import { Icon } from '@iconify/vue';

async function handleClose() {
    await appWindow.close()
}
async function handleMaximize() {
    await appWindow.toggleMaximize()
}
async function handleMinimize() {
    await appWindow.minimize()
}

</script>

<template>
    <div data-tauri-drag-region class="fixed inset-x-0 pt-3 pl-3 flex items-center justify-start gap-1">
        <button tabindex="-1" id="titlebar-close" class="p-0" @click="handleClose">
            <Icon icon="ph:circle-fill" color="#f95e57" width="18" />
        </button>
        <button tabindex="-1" id="titlebar-close" class="p-0" @click="handleMinimize">
            <Icon icon="ph:circle-fill" color="#FBBC2F" width="18" />
        </button>
        <button tabindex="-1" id="titlebar-close" class="p-0" @click="handleMaximize">
            <Icon icon="ph:circle-fill" color="#30C83F" width="18" />
        </button>
    </div>
</template>