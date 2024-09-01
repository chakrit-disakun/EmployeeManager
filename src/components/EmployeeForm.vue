<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
        <div class="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <img src="/icon/addEmployee.png" class="h-20" alt="Logo"/>
            <p class="text-3xl font-extrabold text-center text-gray-800">เพิ่มพนักงาน</p>
        </div>
        <form @submit.prevent="addEmployee" class="space-y-5">
            <div class="mt-5">
                <label for="employeeName" class="block text-sm font-semibold text-gray-700 mb-2">ชื่อ</label>
                <input v-model="employeeName" id="employeeName" type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="กรอกชื่อพนักงาน" />
            </div>
            <label for="employeeGender" class="block text-sm font-semibold text-gray-700 mb-2">เพศ</label>
            <div class="flex items-center ps-4 border border-gray-300 rounded-lg shadow-sm bg-white">
                <input id="bordered-radio-1" type="radio" value="ชาย" name="bordered-radio" v-model="employeeGender"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                <label for="bordered-radio-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">ชาย</label>
            </div>
            <div class="flex items-center ps-4 border border-gray-300 rounded-lg shadow-sm bg-white">
                <input id="bordered-radio-2" type="radio" value="หญิง" name="bordered-radio" v-model="employeeGender"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                <label for="bordered-radio-2" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">หญิง</label>
            </div>
            <div>
                <label for="employeeRole" class="block text-sm font-semibold text-gray-700 mb-2">ตำแหน่ง</label>
                <input v-model="employeeRole" id="employeeRole" type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="กรอกตำแหน่งงาน" />
            </div>
            <button type="submit"
                class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                เพิ่มพนักงาน
            </button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useEmployeeStore } from '../stores/employeeStore';
import Swal from 'sweetalert2';

export default {
    setup() {
        const store = useEmployeeStore();
        const employeeName = ref('');
        const employeeGender = ref('');
        const employeeRole = ref('');

        const generateUID = () => {
            // Simple UID generation using timestamp
            return `UID-${Date.now()}`;
        };

        const addEmployee = () => {
            if (employeeName.value.trim() && employeeGender.value.trim() && employeeRole.value.trim()) {
                const uid = generateUID(); // Generate UID
                store.addEmployee(uid, employeeName.value, employeeGender.value, employeeRole.value);
                employeeName.value = ''; // Clear the input field after adding
                employeeGender.value = ''; // Clear the input field after adding
                employeeRole.value = '';
                Swal.fire({
                    title: "สำเร็จ",
                    icon: "success",
                    customClass: {
                        title: 'text-green-400',
                        text: 'text-green-400',
                        confirmButton: 'bg-green-400',
                    }
                });
            } else {
                Swal.fire({
                    title: "กรุณากรอกข้อมูลให้ครบ",
                    icon: "error",
                    customClass: {
                        title: 'text-red-400',
                        confirmButton: 'bg-red-400',
                    }
                });
            }
        };

        return {
            employeeName,
            employeeGender,
            employeeRole,
            addEmployee
        };
    }
};
</script>
