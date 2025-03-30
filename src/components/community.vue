<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from 'vue';

const messages = ref([
  { id: 1, sender: 'user', text: 'How do I book an appointment?', time: '10:00 AM' },
  { id: 2, sender: 'admin', text: 'You can book an appointment through the dashboard.', time: '10:02 AM' },
  { id: 3, sender: 'user', text: 'What are your working hours?', time: '10:05 AM' }
]);

const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value.trim() === '') return;
  messages.value.push({
    id: messages.value.length + 1,
    sender: 'admin',
    text: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
  newMessage.value = '';
};
</script>

<template>
  <div class="bg-green-50 h-screen flex flex-col lg:ml-52">
    <div class="bg-green-900 text-white py-6 px-6 text-lg  font-bold flex justify-between items-center ">
      <span class="ml-auto">Community Chat</span>
    </div>
    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <div v-for="msg in messages" :key="msg.id"
           class="flex"
           :class="msg.sender === 'admin' ? 'justify-end' : 'justify-start'">
        <div class="p-3 rounded-lg shadow max-w-xs"
             :class="msg.sender === 'admin' ? 'bg-green-700 text-white' : 'bg-white text-gray-700'">
          <p>{{ msg.text }}</p>
          <span class="text-xs block text-right mt-1">{{ msg.time }}</span>
        </div>
      </div>
    </div>
    <div class="p-4 bg-white border-t flex items-center">
      <input v-model="newMessage"
             type="text"
             placeholder="Type a reply..."
             class="flex-1 p-2 border rounded-lg">
      <button @click="sendMessage" class="ml-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Send</button>
    </div>
  </div>
</template>
