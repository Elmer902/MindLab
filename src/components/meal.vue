<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';



// Meals List (Load from LocalStorage if available)
const meals = ref([]);
const cart = ref([]);
const showCreateMealForm = ref(false);
const searchQuery = ref('');
const mealPlan = ref([]);

// Load Meals and Cart from LocalStorage
onMounted(() => {
  const storedMeals = JSON.parse(localStorage.getItem('meals')) || [
    { id: 1, name: 'Grapes', price: 2500, quantity: 1, image: new URL("@/assets/R.png", import.meta.url).href },
    { id: 2, name: 'Corn', price: 1500, quantity: 1, image: new URL("@/assets/corn.jpeg", import.meta.url).href },
    { id: 3, name: 'Cauliflower', price: 1800, quantity: 1, image: new URL("@/assets/cauliflower.jpeg", import.meta.url).href },
    { id: 4, name: 'Potatoes', price: 3000, quantity: 1, image: new URL("@/assets/potatoes.jpeg", import.meta.url).href }
  ];
  meals.value = storedMeals;

  const storedCart = JSON.parse(localStorage.getItem('mealCart')) || [];
  cart.value = storedCart;
});

// Computed property for filtered meals
const filteredMeals = computed(() => {
  if (!searchQuery.value) return meals.value;
  return meals.value.filter(meal =>
    meal.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Save Meals to LocalStorage
const saveMealsToLocalStorage = () => {
  localStorage.setItem('meals', JSON.stringify(meals.value));
};

// Add to Cart
const addToCart = (meal) => {
  const existingMeal = cart.value.find(item => item.id === meal.id);
  if (existingMeal) {
    existingMeal.quantity += meal.quantity;
  } else {
    cart.value.push({ ...meal });
  }
  localStorage.setItem('mealCart', JSON.stringify(cart.value));
};

// Remove from Meals List
const removeFromMeals = (mealId) => {
  meals.value = meals.value.filter(item => item.id !== mealId);
  saveMealsToLocalStorage();
};



// Add meal to Meal Plan
const addToMealPlan = (meal) => {
  if (!mealPlan.value.find(item => item.id === meal.id)) {
    mealPlan.value.push({ ...meal, duration: 1, total: meal.price });
  }
};

// Update Meal Plan Total
const updateMealPlanTotal = (meal) => {
  meal.total = meal.duration * meal.price;
};
</script>


<template>
  <div class="bg-green-100 h-screen">
    <!-- Header -->
    <div class="bg-green-900 lg:space-x-20 fixed w-full left-0 top-0 flex items-center justify-between p-5 lg:px-20 lg:pl-56 lg:ml-38  rounded-br-md">
      <h1 class="text-xl font-bold text-green-50 lg:flex  md:text-2xl  hidden">Meal Plans</h1>

      <!-- Search Input -->
      <input
        type="search"
        v-model="searchQuery"
        placeholder="Search meal"
        class="rounded-md lg:p-2 border px-1 focus:outline-none focus:ring  ml-auto sm:flex  md:flex focus:border-green-500"
      >

      <RouterLink to="/newmeal">
        <button
        @click="showCreateMealForm = true"
        class="bg-blue-600 text-white py-1 lg:px-2 ml-2 px-1 rounded-md hover:bg-blue-700 transition lg:ml-1 "
      >
        Create Meal
      </button>
        </RouterLink>
    </div>


    <!-- Meal Cards -->
    <div class="md:flex sm:flex hidden  px-12  text-3xl font-bold">
      <h1>Meal<span class="text-green-400">Plan</span></h1>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:ml-56 mx-10 pt-28 md:mt-2 lg:mr-10 lg:mt-0">

      <div
        v-for="meal in filteredMeals"
        :key="meal.id"
        class="bg-white  rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <div class="relative p-5">
          <img :src="meal.image" alt="" class="w-full h-32 object-cover rounded-md">
          <!-- + Button -->
          <button
            @click="addToMealPlan(meal)"
            class="absolute top-2 right-2 bg-green-600 text-white rounded-full px-2 py-1 hover:bg-green-700"
          >
            +
          </button>
        </div>
        <h2 class="text-lg font-bold mt-2 px-4">{{ meal.name }}</h2>
        <p class="text-gray-600 px-5">Price: <span class="font-bold text-green-700">{{ meal.price }} XAF</span></p>
  <hr class="py-3 mt-5 ">
       <div class="md:justify-between flex  md:space-x-7 space-x-6 items-center bg-green-800 rounded-md md:p-5 p-2">
        <RouterLink :to="`/mealplan/${meal.id}`">
          <button
            @click="addToCart(meal)"
            class="mt-3 lg:px-2 px-1 py-1 bg-green-600 text-white lg:py-2 rounded-md hover:bg-green-700 transition"
          >
            View meal
          </button>
          </RouterLink>

         <div class="justify-between items-center md:space-x-3 md:pt-2">
          <RouterLink :to="`/edit-meal/${meal.id}`">
            <button>
                <i class="pi pi-pencil text-white"></i>
              </button>
            </RouterLink>
        <RouterLink>
        <button @click="removeFromMeals(meal.id)" class="text-red-400 ">
          <i class="pi pi-trash"></i>
        </button>
      </RouterLink>
         </div>
       </div>
      </div>
    </div>

    <!-- Meal Plan Table -->
    <div v-if="mealPlan.length" class=" px-64 py-20 bg-green-100">
      <h2 class="text-2xl font-bold mb-4">Your Meal Plan</h2>
      <table class="w-full table-auto border-collapse">
        <thead >
          <tr class="bg-green-600 text-white">
            <th class="px-4 py-2">Meal</th>
            <th class="px-4 py-2">Number</th>
            <th class="px-4 py-2">Total Price</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="meal in mealPlan" :key="meal.id">
            <td class="border px-6 py-2">{{ meal.name }}</td>
            <td class="border px-4 py-2 bg-green-100" >
              <input v-model.number="meal.duration" @input="updateMealPlanTotal(meal)" type="number" class="w-auto p-2 border rounded-md" />
            </td>
            <td class="border px-4 py-2 bg-green-400 font-semibold text-white">{{ meal.total }} XAF</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
