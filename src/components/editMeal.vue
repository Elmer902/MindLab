<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const mealData = ref({
  id: null,
  name: '',
  price: '',
  carbohydrates: '',
  calories: '',
  protein: '',
  fats: '',
  benefits: [],
  categories: []
});

const categories = ['Athletes', 'Pregnant Women', 'Children', 'Elderly'];
const benefitsOptions = ['Fiber', 'Vitamins', 'Minerals', 'Antioxidants'];

onMounted(() => {
  const storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
  const meal = storedMeals.find(m => m.id === Number(route.params.id));
  if (meal) {
    mealData.value = { ...meal };
  }
});

const saveMeal = () => {
  let storedMeals = JSON.parse(localStorage.getItem('meals')) || [];
  const mealIndex = storedMeals.findIndex(m => m.id === mealData.value.id);

  if (mealIndex !== -1) {
    storedMeals[mealIndex] = { ...mealData.value };
  }

  localStorage.setItem('meals', JSON.stringify(storedMeals));

  // Navigate back to meal details after saving
  router.push("/meal");
};
</script>


<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 animate-fadeIn">
    <h2 class="text-2xl font-bold text-green-700 mb-4">Edit Meal</h2>

    <label class="block font-medium text-gray-700">Meal Name</label>
    <input v-model="mealData.name" type="text" class="w-full p-2 border rounded mb-4">

    <label class="block font-medium text-gray-700">Price (XAF)</label>
    <input v-model="mealData.price" type="number" class="w-full p-2 border rounded mb-4">

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
        <input type="checkbox" :value="benefit" v-model="mealData.benefits"> {{ benefit }}
      </label>
    </div>

    <label class="block font-medium text-gray-700 mt-4">Category of Patients</label>
    <div class="flex flex-wrap gap-2 mt-2">
      <label v-for="category in categories" :key="category" class="flex items-center gap-2">
        <input type="checkbox" :value="category" v-model="mealData.categories"> {{ category }}
      </label>
    </div>

    <button @click="saveMeal" class="w-full bg-green-600 text-white py-2 px-4 rounded mt-4 hover:bg-green-500">
      Save Changes
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
