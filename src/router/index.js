import { createRouter, createWebHistory } from 'vue-router';
import EmployeeForm from '../components/EmployeeForm.vue';
import UpdateEmployee from '../components/UpdateEmployee.vue';
import EmployeeList from '../components/EmployeeList.vue'; // เพิ่มการนำเข้า

const routes = [
  {
    path: '/',
    name: 'EmployeeList',
    component: EmployeeList // เพิ่มเส้นทางใหม่
  },
  {
    path: '/employee-form',
    name: 'EmployeeForm',
    component: EmployeeForm
  },
  {
    path: '/update-employee',
    name: 'UpdateEmployee',
    component: UpdateEmployee
  },
  {
    path: '/update-employee/:uid',
    name: 'update-employee',
    component: UpdateEmployee,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
