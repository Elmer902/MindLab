<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue';

const subscriptions = ref([]);
const isAddFormVisible = ref(false);
const newSubscription = ref({ name: '', price: '', duration: '', description: '' });
const editingSubscriptionId = ref(null);
const editedSubscription = ref({});

const loadSubscriptions = () => {
  const savedSubscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
  subscriptions.value = savedSubscriptions;
};

const toggleAddForm = () => {
  isAddFormVisible.value = !isAddFormVisible.value;
};

const addSubscription = () => {
  const subscription = { id: Date.now(), ...newSubscription.value };
  subscriptions.value.push(subscription);
  localStorage.setItem('subscriptions', JSON.stringify(subscriptions.value));
  newSubscription.value = { name: '', price: '', duration: '', description: '' };
  isAddFormVisible.value = false;
};

const startEditing = (subscription) => {
  editingSubscriptionId.value = subscription.id;
  editedSubscription.value = { ...subscription };
};

const saveEditedSubscription = () => {
  const index = subscriptions.value.findIndex(sub => sub.id === editingSubscriptionId.value);
  if (index !== -1) {
    subscriptions.value[index] = { ...editedSubscription.value };
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions.value));
    editingSubscriptionId.value = null;
  }
};

const deleteSubscription = (id) => {
  subscriptions.value = subscriptions.value.filter(sub => sub.id !== id);
  localStorage.setItem('subscriptions', JSON.stringify(subscriptions.value));
};

onMounted(loadSubscriptions);
</script>

<template>
  <div class="w-auto  bg-green-50  h-screen ml-52 lg:px-8">
    <div class="bg-green-900 lg:space-x-20 fixed w-full left-0 top-0 flex items-center justify-between p-5 lg:px-20 lg:pl-56 lg:ml-38  rounded-br-md">
      <h1 class="text-2xl font-semibold text-white">Manage <span class="text-green-400">Subscriptions</span></h1>
      <button @click="toggleAddForm" class="bg-indigo-700 text-white px-4 py-2 rounded-md">Add New Subscription</button>
    </div>

    <!-- Add Subscription Form -->
    <div v-if="isAddFormVisible" class="fixed inset-0 flex items-center justify-center bg-green-900 bg-opacity-60">
      <form @submit.prevent="addSubscription" class="bg-white p-4 rounded-md shadow-md w-1/2">
        <h2 class="text-lg font-semibold mb-4">Add New Subscription</h2>
        <span class=" py-2">
          <label class="text-gray-800">Subscription type</label>
          <input v-model="newSubscription.name" placeholder="" class="w-full bg-gray-300  text-gray-800 px-4 py-2 text-sm border rounded-md mb-2" required />
        </span>
        <span class=" py-2">
          <label class="text-gray-800">Description</label>
          <input v-model="newSubscription.description" placeholder="" class="w-full bg-gray-300  text-gray-800 px-4 py-2 text-sm border rounded-md mb-2" required />
        </span>
        <span class=" py-2">
          <label class="text-gray-800">Price</label>
          <input v-model="newSubscription.price" placeholder="" class="w-full bg-gray-300  text-gray-800 px-4 py-2 text-sm border rounded-md mb-2" required />
        </span>
        <span class=" py-2">
          <label class="text-gray-800">Duration</label>
          <input v-model="newSubscription.duration" placeholder="" class="w-full bg-gray-300  text-gray-800 px-4 py-2 text-sm border rounded-md mb-2" required />
        </span>
        <div class="flex justify-between">
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md">Add</button>
          <button @click="toggleAddForm" type="button" class="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
        </div>
      </form>
    </div>

    <!-- Edit Subscription Form -->
    <div v-if="editingSubscriptionId" class="fixed inset-0 flex items-center justify-center bg-green-900 bg-opacity-60 ">
      <form @submit.prevent="saveEditedSubscription" class="bg-white p-10 rounded-md shadow-md w-1/2 px-16">
        <h2 class="text-lg font-bold mb-4">Edit Subscription</h2>
        <span class=" py-2">
          <label class="text-gray-800">Subscription type</label>
          <input v-model="editedSubscription.name" placeholder="" class="w-full bg-gray-300  text-gray-800 px-4 py-2 text-sm border rounded-md mb-2" required />
        </span>
        <span class=" py-2">
          <label class="text-gray-800">Description</label>
          <input v-model="editedSubscription.description" placeholder="" class="w-full bg-gray-300  text-gray-800 px-4 py-2 text-sm border rounded-md mb-2" required />
        </span>
        <span class=" py-2">
          <label class="text-gray-800">Price</label>
          <input v-model="editedSubscription.price" placeholder="" class="w-full bg-gray-300  text-gray-800 px-4 py-2 text-sm border rounded-md mb-2" required />
        </span>
        <span class=" py-3">
          <label class="text-gray-800">Duration</label>
          <input v-model="editedSubscription.duration" placeholder="" class="w-full bg-gray-300  text-gray-800 px-4 py-2 text-sm border rounded-md mb-2" required />
        </span>
        <div class="flex justify-between">
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
          <button @click="editingSubscriptionId = null" type="button" class="bg-red-500 text-white px-4 py-2 rounded-md">Cancel</button>
        </div>
      </form>
    </div>

    <!-- Subscriptions List -->
    <div class="grid grid-cols-1  py-5 md:px-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 lg:mt-20 animate-fadeIn">
      <div v-for="subscription in subscriptions" :key="subscription.id" class="transition-transform hover:scale-110 duration-300 bg-gradient-to-br from-green-200 to-gray-300 rounded-lg shadow-2xl ">
        <span class="top-0 bg-pink-100 left-0 rounded-br-md p-2 font-semibold text-sm text-gray-700">Free for 1 month</span>
        <div class="flex space-x-1 py-3 ">
          <i class="pi pi-crown mt-1 text-xl text-yellow-400"></i>
          <h3 class="text-xl font-bold text-green-500">{{ subscription.name }}</h3>
        </div>
       <div class="p-3">
        <label class="font-semibold">Description</label>
        <li class="text-gray-700">{{ subscription.description }}</li>
       </div>
        <div class="p-3 ">
          <label class="font-bold">Price</label>
          <p class="text-blue-500 font-semibold">Price: ${{ subscription.price }}</p>
        </div>
        <div class="p-3 ">
          <p class="text-gray-700 font-semibold">Duration: {{ subscription.duration }} Days</p>
        </div>
        <div class="mt-4 flex space-x-16 text-center py-4 px-1">
          <button @click="startEditing(subscription)" class="bg-blue-500 text-white px-3 py-1 rounded-md"><i class="pi pi-pencil text-white"></i></button>
          <button @click="deleteSubscription(subscription.id)" class="bg-red-500 text-white px-3 py-1 rounded-md"><i class="pi pi-trash"></i></button>
        </div>
      </div>
    </div>
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
