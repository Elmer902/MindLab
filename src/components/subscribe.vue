<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { ref, onMounted } from 'vue';

// State
const subscriptions = ref([]);
const isAddFormVisible = ref(false);
const newSubscription = ref({
  name: '',
  price: '',
  duration: '',
  description: '',
});

// Load subscriptions from localStorage
const loadSubscriptions = () => {
  const savedSubscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
  subscriptions.value = savedSubscriptions;
};

// Toggle the visibility of the Add Form
const toggleAddForm = () => {
  isAddFormVisible.value = !isAddFormVisible.value;
};

// Add a new subscription
const addSubscription = () => {
  const subscription = {
    id: Date.now(),
    name: newSubscription.value.name,
    price: newSubscription.value.price,
    duration: newSubscription.value.duration,
    description: newSubscription.value.description
  };

  subscriptions.value.push(subscription);
  localStorage.setItem('subscriptions', JSON.stringify(subscriptions.value));
  newSubscription.value = { name: '', price: '', duration: '', description:'' };
  isAddFormVisible.value = false;
};

// Edit an existing subscription
const editSubscription = (subscription) => {
  const updatedName = prompt('Edit Subscription Name:', subscription.name);
  const updatedPrice = prompt('Edit Price:', subscription.price);
  const updatedDuration = prompt('Edit Duration:', subscription.duration);
  const updatedDescription = prompt('Edit Description:', subscription.description);

  if (updatedName && updatedPrice && updatedDuration && updatedDescription) {
    subscription.name = updatedName;
    subscription.price = updatedPrice;
    subscription.duration = updatedDuration;
    subscription.description = updatedDescription;

    localStorage.setItem('subscriptions', JSON.stringify(subscriptions.value));
  }
};

// Delete a subscription
const deleteSubscription = (id) => {
  subscriptions.value = subscriptions.value.filter(sub => sub.id !== id);
  localStorage.setItem('subscriptions', JSON.stringify(subscriptions.value));
};

// Load subscriptions when the component is mounted
onMounted(loadSubscriptions);
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>

<template>
  <div class="container md:ml-52 p-6 ">
    <h1 class="text-2xl font-semibold mb-4">Manage Subscriptions</h1>

    <!-- Add New Subscription -->
    <div class="mb-4">

      <div v-if="isAddFormVisible" class=" fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 ">
        <form @submit.prevent="addSubscription" class="space-y-2 w-1/2 justify-center items-center text-center">
          <input v-model="newSubscription.name" type="text" placeholder="Subscription Name" class="w-full p-2 border rounded-md" required />
          <input v-model="newSubscription.description" type="text" placeholder="description" class="w-full p-2 border rounded-md" required />
          <input v-model="newSubscription.price" type="number" placeholder="Price" class="w-full p-2 border rounded-md" required />
          <input v-model="newSubscription.duration" type="text" placeholder="Duration" class="w-full p-2 border rounded-md" required />
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md ">Add Subscription</button>
        </form>
      </div>
    </div>

    <!-- Subscriptions Table -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(subscription) in subscriptions" :key="subscription.id" class="bg-white rounded-lg shadow-lg">
        <span class="top-0 bg-pink-50 left-0 rounded-br-md p-2">Free for 1 month</span>
       <div class="px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-800 space-x-3 py-3"><i class="pi pi-crown text-yellow-500 pr-2"></i>{{ subscription.name }}</h2>
        <span>
          <h1 class="py-2 text-green-700 font-semibold">
             Description
          </h1>
          <li class="text-gray-600 mt-2">{{ subscription.description }}</li>
        </span>
        <div class="flex space-x-20 items-center mt-4">
          <span class="text-lg font-bold text-blue-500">
            <h1>Price</h1>
            <p>${{ subscription.price }}</p></span>
          <span class="text-sm text-gray-900 font-semibold">
            <h1>Duration</h1>
            <p>{{ subscription.duration }} Day(s)</p></span>
        </div>
        <div class="mt-4 flex space-x-10 py-4">
          <button @click="editSubscription(subscription)" class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
            Edit
          </button>
          <button @click="deleteSubscription(subscription.id)" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Delete
          </button>
       </div>
        </div>
      </div>
    </div>
    </div>
    <div class="p-5 justify-center  text-center">
      <button @click="toggleAddForm" class="bg-blue-500 text-white px-4 py-2 rounded-md">Add New Subscription</button>

    </div>
  </div>
</template>
