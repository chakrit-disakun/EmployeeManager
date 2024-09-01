<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
    <div class="flex items-center justify-center space-x-3 rtl:space-x-reverse">
      <img src="/icon/book.png" class="h-20" alt="Logo" />
      <p class="text-3xl font-extrabold text-center text-gray-800">รายชื่อพนักงาน</p>
    </div>

    <!-- Search Bar -->
    <div class="mt-5">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="ค้นหาชื่อพนักงาน..." 
        class="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
      />
    </div>

    <ul class="mt-5">
      <li v-for="(employee, index) in filteredEmployees" :key="employee.id" class="mb-4">
        <router-link :to="{ name: 'update-employee', params: { uid: employee.uid } }">
          <div class="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm cursor-pointer">
            <img
              v-if="employee.gender === 'หญิง'"
              src="/icon/female.png"
              alt="Icon"
              class="h-6 mr-4"
            />
            <img
              v-if="employee.gender === 'ชาย'"
              src="/icon/male.png"
              alt="Icon"
              class="h-6 mr-4"
            />
            <div class="text-lg font-semibold text-gray-800">
              <p>ชื่อ: {{ employee.name }}</p>
              <p>ตำแหน่ง: {{ employee.role }}</p>
            </div>
          </div>
        </router-link>
      </li>
      <li v-if="filteredEmployees.length === 0" class="mt-5 text-center text-gray-500">
        ไม่พบข้อมูลพนักงาน
      </li>
    </ul>
  </div>
</template>

<script>
import { useEmployeeStore } from '../stores/employeeStore';
import { ref, computed } from 'vue';

export default {
  setup() {
    const store = useEmployeeStore();
    const searchQuery = ref('');

    const filteredEmployees = computed(() => {
      return store.employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return {
      searchQuery,
      filteredEmployees,
    };
  },
};
</script>
