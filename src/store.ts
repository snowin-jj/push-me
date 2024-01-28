import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
} from '@tauri-apps/api/notification';
import { appWindow } from '@tauri-apps/api/window';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

type State = 'running' | 'paused' | 'break' | 'stopped';

export const useStateStore = defineStore('state', () => {
    const state = ref<State>('running');

    function changeState(newState: State) {
        state.value = newState;
    }

    return { state, changeState };
});

export const useTimeStore = defineStore('time', () => {
    const minutes = ref<number>(20);
    const timeElapsed = ref<number>(0);
    const intervalId = ref<number | undefined>(undefined);

    const store = useStateStore();

    async function restart() {
        await appWindow.setAlwaysOnTop(false);
        timeElapsed.value = 0;
        if (intervalId.value !== undefined) {
            clearInterval(intervalId.value);
            intervalId.value = undefined;
        }
        store.changeState('running');
    }

    async function start() {
        if (store.state !== 'paused') {
            timeElapsed.value = minutes.value * 60;
        } else {
            store.changeState('running');
        }
        intervalId.value = setInterval(async () => {
            if (timeElapsed.value > 0) {
                timeElapsed.value--;
            } else {
                clearInterval(intervalId.value);
                store.changeState('break');
                await notify();
                await appWindow.setFocus();
                await appWindow.setAlwaysOnTop(true);
            }
        }, 1000);
    }

    function pause() {
        store.changeState('paused');
        clearInterval(intervalId.value);
        intervalId.value = undefined;
    }

    async function reset() {
        await appWindow.setAlwaysOnTop(false);
        timeElapsed.value = 0;
        minutes.value = 0;
        if (intervalId.value !== undefined) {
            clearInterval(intervalId.value);
            intervalId.value = undefined;
        }

        store.changeState('stopped');
    }

    async function notify() {
        let permissionGranted = await isPermissionGranted();

        if (!permissionGranted) {
            const permission = await requestPermission();
            permissionGranted = permission === 'granted';
        }
        sendNotification({
            icon: '/icons/32x32.png',
            title: 'Break Time',
            body: 'Take some time! , Go for a walk.',
            sound: 'default',
        });
    }

    // compute formatted time
    const remainingMinutes = computed(() => {
        return String(Math.floor(timeElapsed.value / 60)).padStart(2, '0');
    });
    const remainingSeconds = computed(() => {
        return String(timeElapsed.value % 60).padStart(2, '0');
    });

    return {
        minutes,
        remainingMinutes,
        remainingSeconds,
        start,
        pause,
        reset,
        restart,
    };
});
