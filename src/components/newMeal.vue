<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const mealData = ref({
  id: null,
  name: '',
  price: '',
  image: '',
  carbohydrates: '',
  calories: '',
  protein: '',
  fats: '',
  benefits: [],
  categories: []
});

const categories = ['Athletes', 'Pregnant Women', 'Children', 'Elderly'];
const benefitsOptions = ['Fiber', 'Vitamins', 'Minerals', 'Antioxidants'];

// Handle image input
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      mealData.value.image = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

// Toggle function for benefits checkboxes
const toggleBenefit = (benefit) => {
  const index = mealData.value.benefits.indexOf(benefit);
  if (index === -1) {
    mealData.value.benefits.push(benefit);
  } else {
    mealData.value.benefits.splice(index, 1);
  }
};

// Toggle function for categories checkboxes
const toggleCategory = (category) => {
  const index = mealData.value.categories.indexOf(category);
  if (index === -1) {
    mealData.value.categories.push(category);
  } else {
    mealData.value.categories.splice(index, 1);
  }
};

// Save new meal
const saveMeal = () => {
  let storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
  mealData.value.id = storedMeals.length ? Math.max(...storedMeals.map(m => m.id)) + 1 : 1; // Assign new ID

  storedMeals.push(mealData.value);
  localStorage.setItem('meals', JSON.stringify(storedMeals));

  // Redirect to meal list after saving
  router.push('/meal');
};
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 animate-fadeIn">
    <h2 class="text-2xl font-bold text-green-700 mb-4">Create Meal</h2>

    <label class="block font-medium text-gray-700">Meal Name</label>
    <input v-model="mealData.name" type="text" class="w-full p-2 border rounded mb-4">

    <label class="block font-medium text-gray-700">Price (XAF)</label>
    <input v-model="mealData.price" type="number" class="w-full p-2 border rounded mb-4">

    <label class="block font-medium text-gray-700">Meal Image</label>
    <input type="file" accept="image/*" @change="handleImageUpload" class="w-full p-2 border rounded mb-4">

    <div v-if="mealData.image" class="mt-2">
      <img :src="mealData.image" alt="Meal Preview" class="w-full h-40 object-cover rounded-lg">
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block font-medium text-gray-700">Carbohydrates (g)</label>
        <input v-model="mealData.carbohydrates" type="number" class="w-full p-2 border rounded">
      </div>
      <div>
        <label class="block font-medium text-gray-700">Calories</label>
        <input v-model="mealData.calories" type="number" class="w-full p-2 border rounded">
      </div>
      <div>
        <label class="block font-medium text-gray-700">Protein (g)</label>
        <input v-model="mealData.protein" type="number" class="w-full p-2 border rounded">
      </div>
      <div>
        <label class="block font-medium text-gray-700">Fats (g)</label>
        <input v-model="mealData.fats" type="number" class="w-full p-2 border rounded">
      </div>
    </div>

    <label class="block font-medium text-gray-700 mt-4">Nutritional Benefits</label>
    <div class="flex flex-wrap gap-2 mt-2">
      <label v-for="benefit in benefitsOptions" :key="benefit" class="flex items-center gap-2">
        <input type="checkbox" :value="benefit" @change="toggleBenefit(benefit)" />
        {{ benefit }}
      </label>
    </div>

    <label class="block font-medium text-gray-700 mt-4">Category of Patients</label>
    <div class="flex flex-wrap gap-2 mt-2">
      <label v-for="category in categories" :key="category" class="flex items-center gap-2">
        <input type="checkbox" :value="category" @change="toggleCategory(category)" />
        {{ category }}
      </label>
    </div>

    <button @click="saveMeal" class="w-full bg-green-600 text-white py-2 px-4 rounded mt-4 hover:bg-green-500">
      Save Meal
    </button>
  </div>
</template>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
</style>
