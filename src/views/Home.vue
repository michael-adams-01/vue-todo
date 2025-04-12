<template>
  <div>
    <div class="flex justify-end p-2">
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
        <input @focus="clearError" v-model.trim="newTaskInput" class="border bg-gray-100 w-75" type="text">
        <h3 v-if="formisInvalid" class="font-bold text-red-500">Please add a task.</h3>
      </div>
      <button class="text-white p-2 border rounded-lg bg-green-500" @click="addTodo">✔</button>
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
  data() {
    return {
      newTaskInput: '',
      formisInvalid: false,
    }
  },
  methods: {
    signout() {
      this.store.userId = '',
        this.$router.replace('/auth');
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


      console.log(this.newTaskInput)
      //fetch, post request.

      //if succsessful push to local pinia*
    },
    deleteTodo() {
      console.log('delete Todo ran')
    },
  }
}
</script>
