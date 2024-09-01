import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersistedstate from 'pinia-plugin-persistedstate'
import './style.css';
import App from './App.vue';
import router from './router'; // นำเข้า Vue Router ที่ตั้งค่าไว้ในไฟล์ router

const app = createApp(App);
const pinia = createPinia()
pinia.use(piniaPersistedstate)

app.use(pinia)
app.use(router); // ใช้งาน Vue Router ในแอปพลิเคชัน

app.mount('#app');
