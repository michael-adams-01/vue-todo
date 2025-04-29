<template>
  <div>
    <div class="flex justify-end p-2">
      <button @click="signout" class="p-1 bg-blue-500 font-bold text-white rounded-md">Signout</button>
    </div>
    <h1 class="text-center text-5xl text-blue-400">Todo List</h1>

    <draggable @end="store.updateTasks" @mouseup="console.log('mouseup')" v-model="store.todos" tag="ul">
      <template #item="{ element: item }">
        <base-card class="flex justify-between">
          <li> {{ item }}</li>
          <button class="text-white p-2 border rounded-lg bg-red-500" @click="deleteTodo(item.id)">X</button>
        </base-card>
      </template>
    </draggable>

    <base-spinner v-if="store.isLoading"></base-spinner>

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
import draggable from 'vuedraggable';
import { useTodoStore } from '../stores/todo.js';
export default {
  components: {
    draggable
  },
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
        localStorage.removeItem('userId')
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
    // async addTodo() {
    //   this.validateForm();

    //   if (this.formisInvalid) {
    //     console.log('error')
    //   }

    //   await fetch(`https://vuetodo-26a3c-default-rtdb.firebaseio.com/${this.store.userId}.json`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       task: this.newTaskInput,
    //     })
    //   })

    //   this.store.getTasks();
    //   this.newTaskInput = '';
    // },
    async addTodo() {
      this.validateForm();

      if (this.formisInvalid) {
        return;
      }

      this.store.todos.push(this.newTaskInput)
      this.store.updateTasks()


    },
    async deleteTodo(id) {
      await fetch(`https://vuetodo-26a3c-default-rtdb.firebaseio.com/${this.store.userId}/${id}.json`,
        {
          method: 'DELETE'
        })
      this.store.getTasks();
    },
  },
  beforeMount() {
    this.getTasks
    if (localStorage.getItem('userId')) {
      console.log('There is a user in localStorage and their id is: ', localStorage.getItem('userId'))
      this.store.userId = localStorage.getItem('userId')
      this.store.isLoading = true;
      this.store.getTasks();
      this.store.isLoading = false;
    } else {
      console.log('There is not a user in localStorage')
    }
  },
}
</script>
