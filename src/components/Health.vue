<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import R from '@/assets/R.png'
import { ref } from 'vue';
import { Bar, Pie } from "vue-chartjs";
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip } from "chart.js";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip);

// Mock Data
const patientsCount = ref(22000);
const appointmentsCount = ref(200300);
const doctorsCount = ref(150200);

// Bar Chart Data
const barChartData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Patients",
      backgroundColor: "#047857",
      data: [120, 90, 150, 200, 180, 220],
    },
  ],
});

const barChartOptions = ref({
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } },
});

// Pie Chart Data
const pieChartData = ref({
  labels: ["Pediatric Care", "Cardiology", "Neurology"],
  datasets: [
    {
      backgroundColor: ["#10B981", "#34D399", "#6EE7B7"],
      data: [55, 30, 15],
    },
  ],
});
</script>

<template>
  <div class="bg-green-900 fixed w-full left-0 top-0 flex items-center justify-between p-5 lg:px-20 lg:pl-56 lg:ml-38 rounded-br-md">
    <h1 class="text-green-50 text-xl font-semibold hidden lg:flex">Dashboard</h1>
    <input type="search" placeholder="Search here..." class="rounded-md p-1 md:flex hidden ml-auto border-green-300 transform ">
    <div class="flex space-x-3 ml-auto">
      <img :src="R" alt="" class="h-10 rounded-full bg-white w-auto">
      <span class="text-white text-xs text-start"><h1>Brandon Jones</h1>
      <p>Admin</p></span>
    </div>
  </div>

  <div class="flex h-full bg-green-50 p-5 lg:ml-52 mt-16">
    <!-- Main Content -->
    <main class="flex-1 p-6">
      <h1 class="md:text-2xl text-xl font-bold text-green-900">Welcome to your Dashboard <span class="text-gray-600"> Brandon</span></h1>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div class="bg-white p-4 shadow rounded-lg">
          <h2 class="text-gray-700">Total Patients</h2>
          <p class="text-2xl font-bold text-green-700">{{ patientsCount }}</p>
        </div>
        <div class="bg-white p-4 shadow rounded-lg">
          <h2 class="text-gray-700">Appointments</h2>
          <p class="text-2xl font-bold text-green-700">{{ appointmentsCount }}</p>
        </div>
        <div class="bg-white p-4 shadow rounded-lg">
          <h2 class="text-gray-700">Doctors</h2>
          <p class="text-2xl font-bold text-green-700">{{ doctorsCount }}</p>
        </div>
      </div>

      <!-- Charts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div class="bg-white p-6 shadow rounded-lg">
          <h2 class="text-gray-700 mb-4">Patients Per Month</h2>
          <Bar :data="barChartData" :options="barChartOptions" />
        </div>
        <div class="bg-white p-6 shadow rounded-lg">
          <h2 class="text-gray-700 mb-4">Patient Type</h2>
          <Pie :data="pieChartData" />
        </div>
      </div>
    </main>
  </div>
</template>
