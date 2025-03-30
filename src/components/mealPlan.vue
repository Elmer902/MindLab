<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const meal = ref(null);
const showStats = ref(false);
const animatedStats = ref({ carbs: 0, calories: 0, protein: 0, fat: 0 });

const startCounting = (finalStats) => {
  const duration = 1000;
  const steps = 50;
  let count = 0;

  const interval = setInterval(() => {
    count++;
    for (let key in finalStats) {
      animatedStats.value[key] = Math.round((finalStats[key] * count) / steps);
    }
    if (count >= steps) clearInterval(interval);
  }, duration / steps);
};

// Fetch meal data from localStorage
onMounted(() => {
  const mealId = Number(route.params.id);
  const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
  const foundMeal = storedMeals.find((m) => m.id === mealId);

  if (foundMeal) {
    meal.value = foundMeal;

    setTimeout(() => {
      showStats.value = true;
      startCounting({
        carbs: foundMeal.carbohydrates || 0,
        calories: foundMeal.calories || 0,
        protein: foundMeal.protein || 0,
        fat: foundMeal.fats || 0
      });
    }, 200);
  }
});

// Watch for updates and restart animation
watch(meal, (newMeal) => {
  if (newMeal) {
    animatedStats.value = { carbs: 0, calories: 0, protein: 0, fat: 0 };
    startCounting({
      carbs: newMeal.carbohydrates || 0,
      calories: newMeal.calories || 0,
      protein: newMeal.protein || 0,
      fat: newMeal.fats || 0
    });
  }
});
</script>

<template>
  <div v-if="meal" class="p-6 w-auto lg:ml-44 bg-green-800 h-full">
    <!-- Header -->
    <div
      class="bg-green-900 space-x-20 fixed w-full left-0 top-0 flex items-center justify-between p-5 lg:px-20 lg:pl-56 lg:ml-38 rounded-br-md"
    >
      <h1 class="text-4xl font-bold lg:ml-1 ml-auto text-white">{{ meal.name }}</h1>
      <div class="hidden md:flex text-white font-semibold text-xl bg-indigo-800 p-2 rounded-md">
        <button @click="router.push('/meal')">Back to <span class="text-green-500">meals</span></button>
      </div>
    </div>

    <!-- Meal Image -->
    <div class="bg-gradient-to-tr from-white to-green-900 rounded-md w-auto flex justify-between">
      <div>
        <img
          :src="meal.image"
          :alt="meal.name"
          class="w-full md:w-auto h-64 object-cover rounded-full pt-16 px-16 mt-10"
        />
        <p class="text-lg text-gray-700 mt-2 px-6 py-4">
          Price: <span class="font-bold text-green-700">{{ meal.price }} XAF</span>
        </p>
      </div>

      <!-- Stats Cards with Fade-In Effect -->
      <div
        class="md:grid grid-cols-2 md:grid-cols-2 ml-auto gap-5 mb-16 mt-20 mx-10 lg:ml-10 hidden transition-opacity duration-1000"
        :class="{ 'opacity-100 animate-fadeIn': showStats, 'opacity-0': !showStats }"
      >
        <div class="bg-blue-500 p-4 rounded-lg text-center shadow-md">
          <h3 class="text-sm sm:text-base font-semibold text-blue-200">Carbohydrates</h3>
          <p class="text-2xl font-bold">{{ animatedStats.carbs }}g</p>
        </div>
        <div class="bg-red-500 p-4 rounded-lg text-center shadow-md">
          <h3 class="text-lg font-semibold text-red-200">Calories</h3>
          <p class="text-2xl font-bold">{{ animatedStats.calories }}</p>
        </div>
        <div class="bg-green-500 p-4 rounded-lg text-center shadow-md">
          <h3 class="text-lg font-semibold text-green-200">Protein</h3>
          <p class="text-2xl font-bold">{{ animatedStats.protein }}g</p>
        </div>
        <div class="bg-yellow-500 p-4 rounded-lg text-center shadow-md">
          <h3 class="text-lg font-semibold text-yellow-200">Fats</h3>
          <p class="text-2xl font-bold">{{ animatedStats.fat }}g</p>
        </div>
      </div>
    </div>

    <!-- Stats Cards with Fade-In Effect for Small Screens -->
    <div
      class="grid grid-cols-2 md:grid-cols-4 md:hidden gap-5 mt-8 lg:ml-10 transition-opacity duration-1000"
      :class="{ 'opacity-100 animate-fadeIn': showStats, 'opacity-0': !showStats }"
    >
      <div class="bg-blue-200 p-4 rounded-lg text-center shadow-md">
        <h3 class="text-sm sm:text-base font-semibold text-blue-700">Carbohydrates</h3>
        <p class="text-2xl font-bold">{{ animatedStats.carbs }}g</p>
      </div>
      <div class="bg-red-200 p-4 rounded-lg text-center shadow-md">
        <h3 class="text-lg font-semibold text-red-700">Calories</h3>
        <p class="text-2xl font-bold">{{ animatedStats.calories }}</p>
      </div>
      <div class="bg-green-200 p-4 rounded-lg text-center shadow-md">
        <h3 class="text-lg font-semibold text-green-700">Protein</h3>
        <p class="text-2xl font-bold">{{ animatedStats.protein }}g</p>
      </div>
      <div class="bg-yellow-200 p-4 rounded-lg text-center shadow-md">
        <h3 class="text-lg font-semibold text-yellow-700">Fats</h3>
        <p class="text-2xl font-bold">{{ animatedStats.fat }}g</p>
      </div>
    </div>

    <!-- Nutritional Benefits -->
    <div class="mt-6 lg:ml-10">
      <h2 class="text-xl font-semibold text-white">Nutritional Benefits</h2>
      <ul class="list-disc list-inside text-gray-300">
        <li v-for="benefit in meal.benefits" :key="benefit">{{ benefit }}</li>
      </ul>
    </div>

    <!-- Recommended Patients -->
    <div class="mt-4 lg:ml-10">
      <h2 class="text-xl font-semibold text-indigo-300">Category of Patients</h2>
      <ul class="list-disc list-inside text-gray-300">
        <li v-for="category in meal.categories" :key="category">{{ category }}</li>
      </ul>
    </div>
    <div class="md:hidden w-auto my-5 flex text-white font-semibold text-xl bg-indigo-800 px-24 py-2 rounded-md text-center">
        <button @click="router.push('/meal')">Back to <span class="text-green-500">meals</span></button>
      </div>
  </div>

  <div v-else class="text-center text-gray-500 text-lg p-6">Loading meal details...</div>
</template>

<style scoped>
/* Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-in-out;
}
</style>
