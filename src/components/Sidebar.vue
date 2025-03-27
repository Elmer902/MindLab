<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// Sidebar State
const isOpen = ref(false);

// Toggle Sidebar
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

// Close Sidebar When Clicking a Link (Only in Mobile View)
const handleNavClick = () => {
  if (window.innerWidth < 1024) {
    isOpen.value = false;
  }
};

// Active Link Styling
const route = useRoute();
const isActiveLink = (path) => route.path === path;
</script>

<template>
  <div>
    <!-- Sidebar Toggle Button (Hidden when Sidebar is Open) -->
    <button
      v-if="!isOpen"
      @click="toggleSidebar"
      class="fixed  z-10 bg-green-700 top-6 left-5 text-white px-4 py-3 rounded-md lg:hidden"
    >
      <i class="pi pi-bars text-xl"></i>
    </button>

    <!-- Sidebar -->
    <aside :class="[ isOpen ? 'translate-x-0' : '-translate-x-full','fixed lg:translate-x-0 top-0 left-0 w-52 bg-green-900 px-6 pt-6 h-full  transition-transform duration-300 z-50']"
    >
      <!-- Close Button (X Icon) -->
      <button
        @click="toggleSidebar"
        class="absolute top-3 right-3 text-white bg-red-500 p-2 rounded-full lg:hidden"
      >
        <i class="pi pi-times"></i>
      </button>

      <!-- Sidebar Header -->
      <div class="justify-center items-center pb-10">
        <h1 class="text-3xl font-bold text-green-400 font-serif">Mind<span class="text-white">Lab</span></h1>
      </div>

      <!-- Navigation -->
      <nav class="text-center">
        <RouterLink to="/dashboard" @click="handleNavClick">
          <div :class="[isActiveLink('/dashboard') ? 'bg-green-600 hover:bg-green-500' : '', 'flex space-x-2 py-2 px-2 my-4 border rounded-md shadow-md hover:scale-110 transition-transform']">
            <i class="pi pi-ethereum text-white"></i>
            <h3 class="text-gray-200">Health List</h3>
          </div>
        </RouterLink>

        <RouterLink to="/meal" @click="handleNavClick">
          <div :class="[isActiveLink('/meal') ? 'bg-green-600 hover:bg-green-500' : '', 'flex space-x-2 py-2 px-2 my-4 border rounded-md shadow-md hover:scale-110 transition-transform']">
            <i class="pi pi-slack text-red-400"></i>
            <h3 class="text-gray-200">Meal Plans</h3>
          </div>
        </RouterLink>

        <RouterLink to="/subscriptions" @click="handleNavClick">
          <div :class="[isActiveLink('/subscriptions') ? 'bg-green-600 hover:bg-green-500' : '', 'flex space-x-2 py-2 px-2 my-4 border rounded-md shadow-md hover:scale-110 transition-transform']">
            <i class="pi pi-crown text-yellow-500"></i>
            <h3 class="text-gray-200">Subscriptions</h3>
          </div>
        </RouterLink>

        <RouterLink to="/community" @click="handleNavClick">
          <div :class="[isActiveLink('/community') ? 'bg-green-600 hover:bg-green-500' : '', 'flex space-x-2 py-2 px-2 my-4 border rounded-md shadow-md hover:scale-110 transition-transform']">
            <i class="pi pi-user text-white"></i>
            <h3 class="text-gray-200">Community</h3>
          </div>
        </RouterLink>

        <RouterLink to="/" @click="handleNavClick">
          <div class="flex space-x-2 py-2 px-2 my-4 border rounded-md shadow-md hover:bg-red-500 transition-transform">
            <i class="pi pi-sign-out text-white"></i>
            <h3 class="text-gray-200">Logout</h3>
          </div>
        </RouterLink>
      </nav>
    </aside>

    <!-- Overlay (For Small Screens) -->
    <div
      v-if="isOpen"
      @click="toggleSidebar"
      class="fixed inset-0 bg-black bg-opacity-50  lg:hidden"
    ></div>
  </div>
</template>

