<template>
  <div>
    <div class="flex justify-end p-2">
      <button @click="signout" class="p-1 bg-blue-500 font-bold text-white rounded-md">Signout</button>
    </div>
    <h1 class="text-center text-5xl text-blue-400">Todo List</h1>
    <ul v-for="item in store.todos">
      <base-card class="flex justify-between">
        <li> {{ item.title }}</li>
        <button class="text-white p-2 border rounded-lg bg-red-500" @click="deleteTodo(item.id)">X</button>
        <!-- <li>Completed: {{ item.completed }}</li> -->
        <!-- <li>Due Date: {{ item.dueDate }}</li> -->
        <!-- <li>Priority: {{ item.priority }}</li> -->
      </base-card>
    </ul>
    <base-card class="flex justify-between">
      <div>
        <label for="">Add New Task: </label>
        <input @focus="clearError" v-model.trim="newTaskInput" class="border bg-gray-100 w-75" type="text">
        <h3 v-if="formisInvalid" class="font-bold text-red-500">Please add a task.</h3>
      </div>
      <button class="text-white p-2 border rounded-lg bg-green-500" @click="addTodo">✔</button>
    </base-card>
    <h3 v-if="!!store.errorMessage" class="font-bold text-red-500">{{ store.errorMessage }}</h3>
  </div>
</template>

<script>
import { useTodoStore } from '../stores/todo.js';
export default {
  setup() {
    const store = useTodoStore();
    return { store }
  },
  data() {
    return {
      newTaskInput: '',
      formisInvalid: false,
    }
  },
  methods: {
    signout() {
      this.store.userId = '',
        this.$router.replace('/signin');
    },
    validateForm() {
      if (this.newTaskInput === '') {
        this.formisInvalid = true;
      }
    },
    clearError() {
      this.formisInvalid = false;
    },
    async addTodo() {
      this.validateForm();

      if (this.formisInvalid) {
        console.log('error')
      }

      await fetch(`https://vuetodo-26a3c-default-rtdb.firebaseio.com/${this.store.userId}.json`, {
        method: 'POST',
        body: JSON.stringify({
          task: this.newTaskInput,
        })
      })

      this.store.getTasks();
      this.newTaskInput = '';
    },
    async deleteTodo(id) {
      await fetch(`https://vuetodo-26a3c-default-rtdb.firebaseio.com/${this.store.userId}/${id}.json`,
        {
          method: 'DELETE'
        })
      this.store.getTasks();
    },
  },
}
</script>
