<template>
  <nav class="bg-white border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <div class="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="https://img.freepik.com/free-psd/gradient-abstract-logo_23-2150689665.jpg?w=1380&t=st=1725103723~exp=1725104323~hmac=488fc1c69d916935a3f92bf9dbb20b08833683c2c2d8c29830bfdd94fe5e8b7d"
          class="h-8" alt="Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap">ระบบจัดการพนักงาน</span>
      </div>
      <button @click="toggleMenu" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div :class="menuOpen ? 'block' : 'hidden'" class="w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
          <li>
            <router-link @click="toggleMenu" to="/" class="block py-2 px-3 rounded md:p-0"
              active-class="text-blue-700 md:text-blue-700"
              exact-active-class="text-white bg-blue-700 md:bg-transparent">
              รายชื่อพนักงาน
            </router-link>
          </li>
          <li>
            <router-link @click="toggleMenu" to="/employee-form" class="block py-2 px-3 rounded md:p-0"
              active-class="text-blue-700 md:text-blue-700"
              exact-active-class="text-white bg-blue-700 md:bg-transparent">
              เพิ่มพนักงาน
            </router-link>
          </li>
          <li>
            <router-link @click="toggleMenu" to="/update-employee" class="block py-2 px-3 rounded md:p-0"
              active-class="text-blue-700 md:text-blue-700"
              exact-active-class="text-white bg-blue-700 md:bg-transparent">
              แก้ไขพนักงาน
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>
