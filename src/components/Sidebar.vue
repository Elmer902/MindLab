<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import logo from '@/assets/logo.png'

// Sidebar State
const isOpen = ref(false);
const router = useRouter();
const showLogoutModal = ref(false);

// Toggle Sidebar
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

// Close Sidebar When Clicking a Link (Only in Mobile View)
const handleNavClick = () => {
  if (window.innerWidth < 800) {
    isOpen.value = false;
  }
};

// Active Link Styling
const route = useRoute();
const isActiveLink = (path) => route.path === path;

// Logout Confirmation
const handleLogout = () => {
  showLogoutModal.value = true;
};

const confirmLogout = () => {
  showLogoutModal.value = false;
  router.push('/');
};

const cancelLogout = () => {
  showLogoutModal.value = false;
};
</script>

<template>
  <div>
    <!-- Sidebar Toggle Button (Hidden when Sidebar is Open) -->
    <button
      v-if="!isOpen"
      @click="toggleSidebar"
      class="fixed z-10 bg-green-700 top-5 left-5 text-white px-3 py-2 rounded-md lg:hidden"
    >
      <i class="pi pi-bars"></i>
    </button>

    <!-- Sidebar -->
    <aside :class="[ isOpen ? 'translate-x-0 ' : '-translate-x-full','fixed lg:translate-x-0 top-0 left-0 w-52 bg-green-900 px-6 pt-6 h-full transition-transform duration-300 z-50']"
    >
      <!-- Close Button (X Icon) -->
      <button
        @click="toggleSidebar"
        class="absolute top-3 right-3 text-white bg-red-500 p-2 rounded-md lg:hidden"
      >
        <i class="pi pi-times"></i>
      </button>

      <!-- Sidebar Header -->
      <div class=" items-center py-1 px-2  rounded-full pb-10">
        <img :src="logo" alt="" class="">
        <!-- <h1 class="text-3xl font-bold text-green-400 font-serif ">Mind<span class="text-white">Lab</span></h1> -->
      </div>

      <!-- Navigation -->
      <nav class="text-center">
        <RouterLink to="/dashboard" @click="handleNavClick">
          <div :class="[isActiveLink('/dashboard') ? 'bg-green-600 hover:bg-green-500' : '', 'flex space-x-2 py-2 px-2 my-4 border rounded-md shadow-md hover:scale-110 transition-transform']">
            <i class="pi pi-ethereum pt-1 text-white"></i>
            <h3 class="text-gray-200">Health List</h3>
          </div>
        </RouterLink>

        <RouterLink to="/meal" @click="handleNavClick">
          <div :class="[isActiveLink('/meal') ? 'bg-green-600 hover:bg-green-500' : '', 'flex space-x-2 py-2 px-2 my-4 border rounded-md shadow-md hover:scale-110 transition-transform']">
            <i class="pi pi-slack pt-1 text-red-400"></i>
            <h3 class="text-gray-200">Meal Plans</h3>
          </div>
        </RouterLink>

        <RouterLink to="/subscriptions" @click="handleNavClick">
          <div :class="[isActiveLink('/subscriptions') ? 'bg-green-600 hover:bg-green-500' : '', 'flex space-x-2 py-2 px-2 my-4 border rounded-md shadow-md hover:scale-110 transition-transform']">
            <i class="pi pi-crown pt-1 text-yellow-500"></i>
            <h3 class="text-gray-200">Subscriptions</h3>
          </div>
        </RouterLink>

        <RouterLink to="/community" @click="handleNavClick">
          <div :class="[isActiveLink('/community') ? 'bg-green-600 hover:bg-green-500' : '', 'flex space-x-2 py-2 px-2 my-4 border rounded-md shadow-md hover:scale-110 transition-transform']">
            <i class="pi pi-user pt-1 text-white"></i>
            <h3 class="text-gray-200">Community</h3>
          </div>
        </RouterLink>

        <button @click="handleLogout" class="w-full text-left">
          <div class="flex space-x-2 py-2 px-2 my-4 border rounded-md shadow-md hover:bg-red-500 transition-transform">
            <i class="pi pi-sign-out pt-1 text-white"></i>
            <h3 class="text-gray-200">Logout</h3>
          </div>
        </button>
      </nav>
    </aside>

    <!-- Overlay (For Small Screens) -->
    <div
      v-if="isOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
    ></div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-10">
      <div class="bg-white p-6 rounded-md shadow-md w-96">
        <h3 class="text-lg font-semibold text-gray-800">Confirm Logout</h3>
        <p class="text-gray-600 mt-2">Are you sure you want to leave?</p>
        <div class="mt-4 flex justify-end space-x-2">
          <button @click="cancelLogout" class="px-4 py-2 bg-gray-300 hover:bg-gray-600 hover:text-white rounded-md">Cancel</button>
          <button @click="confirmLogout" class="px-4 py-2 bg-red-500 hover:bg-red-700 hover:text-black text-white rounded-md">Leave</button>
        </div>
      </div>
    </div>
  </div>
</template>
