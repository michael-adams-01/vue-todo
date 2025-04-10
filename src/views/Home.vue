<template>
  <div>
    <button @click="signout" class="p-1 bg-blue-500 font-bold text-white rounded-md">Signout</button>
    <h1 class="text-center text-5xl text-blue-400">Todo List</h1>
    <ul v-for="item in store.todos">
      <base-card>
        <li>Title: {{ item.title }}</li>
        <li>Description: {{ item.description }}</li>
        <br>
        <div v-if="!FakeVariable" class="border p-2 border-sky-400"> <!-- For Development only -->
          <li>Completed: {{ item.completed }}</li>
          <!-- <li>Due Date: {{ item.dueDate }}</li> -->
          <!-- <li>Priority: {{ item.priority }}</li> -->
        </div> <!-- For Development only -->
      </base-card>
    </ul>
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
    }
  }
}
</script>
