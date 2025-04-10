<template>
  <div>
    <div class="flex justify-end">
      <button @click="signout" class="p-1 bg-blue-500 font-bold text-white rounded-md">Signout</button>
    </div>
    <h1 class="text-center text-5xl text-blue-400">Todo List</h1>
    <ul v-for="item in store.todos">
      <base-card class="flex justify-between">
        <li>Title: {{ item.title }}</li>
        <button class="text-white p-2 border rounded-lg bg-red-500" @click="deleteTodo">X</button>
        <!-- <li>Completed: {{ item.completed }}</li> -->
        <!-- <li>Due Date: {{ item.dueDate }}</li> -->
        <!-- <li>Priority: {{ item.priority }}</li> -->
      </base-card>
    </ul>
    <base-card class="flex justify-between">
      <div>
        <label for="">Add New Task: </label>
        <input class="border bg-gray-100 w-75" type="text">
      </div>
      <button class="text-white p-2 border rounded-lg bg-green-500" @click="deleteTodo">✔</button>
    </base-card>
  </div>
</template>

<script>
import { useTodoStore } from '../stores/todo.js';
export default {
  setup() {
    const store = useTodoStore();
    return { store }
  },
  methods: {
    signout() {
      this.$router.replace('/auth');
    },
    deleteTodo() {
      console.log('delete Todo ran')
    }
  }
}
</script>
