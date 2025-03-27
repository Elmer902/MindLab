<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';


// Sample Meals
const meals = ref([
  { id: 1, name: 'Grapes', price: 2500, quantity: 1, image: new URL("@/assets/R.png", import.meta.url).href, totalPrice: 2500 },
  { id: 2, name: 'Corn', price: 1500, quantity: 1, image: new URL("@/assets/corn.jpeg", import.meta.url).href, totalPrice: 1500 },
  { id: 3, name: 'Cauliflower', price: 1800, quantity: 1, image: new URL("@/assets/cauliflower.jpeg", import.meta.url).href, totalPrice: 1800 },
  { id: 4, name: 'Potatoes', price: 3000, quantity: 1, image: new URL("@/assets/potatoes.jpeg", import.meta.url).href, totalPrice: 3000 }
]);

const cart = ref([]);
const showCreateMealForm = ref(false);
const newMeal = ref({ name: '', price: 0, image: '' });
const searchQuery = ref(''); // Search input

// Load Cart from LocalStorage
onMounted(() => {
  const storedCart = localStorage.getItem('mealCart');
  if (storedCart) {
    cart.value = JSON.parse(storedCart);
  }
});

// Computed property for filtered meals
const filteredMeals = computed(() => {
  if (!searchQuery.value) return meals.value;
  return meals.value.filter(meal =>
    meal.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Add to Cart
const addToCart = (meal) => {
  const existingMeal = cart.value.find(item => item.id === meal.id);
  if (existingMeal) {
    existingMeal.quantity += meal.quantity;
    existingMeal.totalPrice = existingMeal.quantity * existingMeal.price;
  } else {
    cart.value.push({ ...meal });
  }
  saveCart();
};

// Remove from Meals List
const removeFromMeals = (mealId) => {
  meals.value = meals.value.filter(item => item.id !== mealId);
};

// Save Cart to LocalStorage
const saveCart = () => {
  localStorage.setItem('mealCart', JSON.stringify(cart.value));
};

// Create New Meal
const createMeal = () => {
  if (!newMeal.value.name || newMeal.value.price <= 0 || !newMeal.value.image) {
    alert('Please fill out all fields');
    return;
  }
  const newId = meals.value.length + 1;
  meals.value.push({
    id: newId,
    name: newMeal.value.name,
    price: newMeal.value.price,
    quantity: 1,
    image: newMeal.value.image,
    totalPrice: newMeal.value.price
  });
  newMeal.value = { name: '', price: 0, image: '' };
  showCreateMealForm.value = false;
};
</script>

<template>
  <div>
    <!-- Header -->
    <div class="bg-green-900 justify-between text-center items-center relative w-auto left-0 top-0 flex p-5 px-10 md:ml-52 rounded-b-md">
      <h1 class="text-2xl font-bold text-green-50">Meal Plans</h1>

      <!-- Search Input -->
      <input
        type="search"
        v-model="searchQuery"
        placeholder="Search meal here..."
        class="rounded-md p-2 border focus:outline-none focus:ring focus:border-green-500"
      >

      <button
        @click="showCreateMealForm = true"
        class="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition"
      >
        Create Meal
      </button>
    </div>

    <!-- Create Meal Form -->
    <div v-if="showCreateMealForm" class="p-4 bg-white shadow-md rounded-md mt-4 md:ml-56 mr-10">
      <h2 class="text-lg font-bold py-4">Create a new Meal plan</h2>
      <span>
        <h2 class="text-green-500 text-xl font-semibold">Meal name</h2>
        <input v-model="newMeal.name" type="text" class="w-full p-2 border rounded-md border-green-300 transform hover:scale-110">
      </span>
      <input v-model.number="newMeal.price" type="number" class="w-full p-2 border rounded-md my-2">
      <input v-model="newMeal.image" type="text" class="w-full p-2 border rounded-md my-2">
      <button @click="createMeal" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Add Meal</button>
      <button @click="showCreateMealForm = false" class="ml-2 text-white bg-red-500 px-4 rounded-md mx-2 py-2">Cancel</button>
    </div>

    <!-- Meal Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:ml-56 my-10 mr-10">
      <div
        v-for="meal in filteredMeals"
        :key="meal.id"
        class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
      >
        <img :src="meal.image" alt="" class="w-full h-32 object-cover rounded-md">
        <h2 class="text-lg font-bold mt-2">{{ meal.name }}</h2>
        <p class="text-gray-600">Price: <span class="font-bold text-green-700">{{ meal.price }} XAF</span></p>

        <!-- Add to Cart Button -->
        <div class="flex justify-between text-center">
          <RouterLink to="/mealplan">
            <button
            @click="addToCart(meal)"
            class="mt-3 px-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            View meal
          </button>
            </RouterLink>
          <button @click="removeFromMeals(meal.id)" class="text-red-500"> <i class="pi pi-trash"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
