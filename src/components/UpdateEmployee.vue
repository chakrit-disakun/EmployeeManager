<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg mb-5">
        <div class="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <img src="/icon/edit.png" class="h-20" alt="Logo" />
            <p class="text-3xl font-extrabold text-center text-gray-800">แก้ไขพนักงาน</p>
        </div>
        <form @submit.prevent="updateEmployee" class="space-y-5">
            <div class="mt-5">
                <label for="employeeUID" class="block text-sm font-semibold text-gray-700 mb-2">เลือกพนักงาน</label>
                <select v-model="selectedUID" id="employeeUID"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option v-for="employee in employees" :key="employee.uid" :value="employee.uid">
                        {{ employee.name }}
                    </option>
                </select>
            </div>
            <div class="space-y-5" v-if="selectedUID !== null">
                <hr>
                <div>
                    <label for="newEmployeeName"
                        class="block text-sm font-semibold text-gray-700 mb-2">ชื่อพนักงานใหม่</label>
                    <input v-model="newEmployeeName" id="newEmployeeName" type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="กรอกชื่อพนักงานใหม่" />
                </div>
                <label for="newEmployeeGender" class="block text-sm font-semibold text-gray-700 mb-2">เพศ</label>
                <div class="flex items-center ps-4 border border-gray-300 rounded-lg shadow-sm bg-white">
                    <input id="bordered-radio-1" type="radio" value="ชาย" name="gender" v-model="newEmployeeGender"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                    <label for="bordered-radio-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">ชาย</label>
                </div>
                <div class="flex items-center ps-4 border border-gray-300 rounded-lg shadow-sm bg-white">
                    <input id="bordered-radio-2" type="radio" value="หญิง" name="gender" v-model="newEmployeeGender"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
                    <label for="bordered-radio-2"
                        class="w-full py-4 ms-2 text-sm font-medium text-gray-900">หญิง</label>
                </div>
                <div>
                    <label for="newEmployeeRole" class="block text-sm font-semibold text-gray-700 mb-2">ตำแหน่ง</label>
                    <input v-model="newEmployeeRole" id="newEmployeeRole" type="text"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="กรอกตำแหน่งงาน" />
                </div>
                <button type="submit"
                    class="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg shadow-md hover:from-green-600 hover:to-teal-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    อัปเดต
                </button>
                <button type="button" @click="deleteEmployee"
                    class="w-full py-3 px-4 mt-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                    ลบพนักงาน
                </button>
            </div>
        </form>
    </div>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { useEmployeeStore } from '../stores/employeeStore';
import Swal from 'sweetalert2';

export default {
    props: ['uid'],
    setup(props) {
        const store = useEmployeeStore();
        const selectedUID = ref(null);
        const newEmployeeName = ref('');
        const newEmployeeGender = ref('');
        const newEmployeeRole = ref('');

        const updateEmployee = () => {
            if (selectedUID.value && newEmployeeName.value.trim() && newEmployeeGender.value && newEmployeeRole.value.trim()) {
                store.updateEmployee(selectedUID.value, newEmployeeName.value, newEmployeeGender.value, newEmployeeRole.value);
                newEmployeeName.value = '';
                newEmployeeGender.value = '';
                newEmployeeRole.value = '';
                selectedUID.value = null;
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

        const deleteEmployee = () => {
            if (selectedUID.value) {
                const selectedEmployee = store.employees.find(emp => emp.uid === selectedUID.value);
                if (selectedEmployee) {
                    Swal.fire({
                        title: "แน่ใจใช่ไหม",
                        text: `คุณต้องการลบ ${selectedEmployee.name}`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "ใช่, ลบเลย",
                        cancelButtonText: "รอก่อน"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            store.deleteEmployee(selectedUID.value);
                            newEmployeeName.value = '';
                            newEmployeeGender.value = '';
                            newEmployeeRole.value = '';
                            selectedUID.value = null;
                            Swal.fire({
                                title: "ลบสำเร็จ!",
                                text: `ลบ ${selectedEmployee.name} เรียบร้อย`,
                                icon: "success",
                                confirmButton: 'bg-blue-400'
                            });
                        }
                    });
                }
            } else {
                Swal.fire({
                    title: "กรุณาเลือกพนักงานที่ต้องการลบ",
                    icon: "error",
                    customClass: {
                        title: 'text-red-400',
                        confirmButton: 'bg-red-400',
                    }
                });
            }
        };

        watchEffect(() => {
            if (props.uid) {
                // Find employee by UID
                const selectedEmployee = store.employees.find(emp => emp.uid === props.uid);
                if (selectedEmployee) {
                    newEmployeeName.value = selectedEmployee.name;
                    newEmployeeGender.value = selectedEmployee.gender;
                    newEmployeeRole.value = selectedEmployee.role;
                    selectedUID.value = selectedEmployee.uid;
                }
            }
        });

        watchEffect(() => {
            if (props.uid == undefined) {
                // Find employee by UID
                const selectedEmployee = store.employees.find(emp => emp.uid === selectedUID.value);
                if (selectedEmployee) {
                    newEmployeeName.value = selectedEmployee.name;
                    newEmployeeGender.value = selectedEmployee.gender;
                    newEmployeeRole.value = selectedEmployee.role;
                    selectedUID.value = selectedEmployee.uid;
                }
            }
        });


        return {
            employees: store.employees,
            selectedUID,
            newEmployeeName,
            newEmployeeGender,
            newEmployeeRole,
            updateEmployee,
            deleteEmployee,
        };
    }
};
</script>