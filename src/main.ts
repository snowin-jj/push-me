import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {
    isPermissionGranted,
    requestPermission,
} from '@tauri-apps/api/notification';

import App from './App.vue';
import './global.css';

let permissionGranted = await isPermissionGranted();

if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === 'granted';
}

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');
