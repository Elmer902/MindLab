<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import heu from '@/assets/heu.png';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);

const handleLogin = () => {
  console.log("Email:", email.value);
  console.log("Password:", password.value);
  console.log("Remember Me:", rememberMe.value);
};
</script>

<style>
@media (max-width: 768px) {
  .bg-gray-800 {
    display: none;
  }
}
</style>
<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-300 px-4">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
      <!-- Left Side - Illustration -->
      <div class="hidden md:flex md:w-1/2 bg-gray-900 p-8 flex-col justify-center items-center">
        <span class="flex text-white text-5xl font-bold"><h1 class="text-green-800">Mind</h1>Lab</span>
        <img :src="heu" alt="Illustration" class="w-full max-w-sm">
      </div>

      <!-- Right Side - Login Form -->
      <div class="w-full md:w-1/2 p-8">
        <span class="flex md:hidden  text-gray-400 text-center justify-center pb-4 text-5xl font-bold"><h1 class="text-green-800">Mind</h1>Lab</span>
        <h2 class="text-2xl font-semibold text-gray-700 text-center">Log in</h2>

        <form @submit.prevent="handleLogin" class="mt-6">
          <div>
            <label class="block text-gray-700">Email</label>
            <input type="email" v-model="email" required class="w-full mt-2 p-2 border rounded-md">
          </div>

          <div class="mt-4 relative">
            <label class="block text-gray-700">Password</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="password" required class="w-full mt-2 p-2 border rounded-md">
            <span @click="showPassword = !showPassword" class="absolute right-3 top-10 cursor-pointer">
              {{ showPassword ? '🙈' : '👁' }}
            </span>
          </div>

          <div class="flex justify-between items-center mt-2">
            <label class="flex items-center">
              <input type="checkbox" v-model="rememberMe" class="mr-2"> Remember me
            </label>
            <a href="#" class="text-blue-500 text-sm hover:underline">Forgot Password?</a>
          </div>

          <RouterLink to="/dashboard"><button type="submit" class="w-full bg-green-500 text-white py-2 mt-4 rounded-md hover:bg-green-600">Login</button></RouterLink>
        </form>

        <p class="mt-4 text-center">New user? <RouterLink to="/signin" class="text-blue-500 hover:underline">Sign up</RouterLink></p>

        <div class="mt-6 text-center">
          <p class="text-gray-600">Or Login with</p>
          <div class="flex justify-center text-center space-x-3 mt-2">
            <button class="bg-red-500 text-white px-4 py-2 rounded-md"><i class="pi pi-google px-2 py-1"></i>Google</button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-md"><i class="pi pi-facebook px-2 py-1"></i>Facebook</button>
            <button class="bg-gray-900 text-white px-4 py-2 rounded-md"> <i class="pi pi-github px-2 py-1"></i>Github</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


