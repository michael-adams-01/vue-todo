<template>
  <div>
    <div class="flex justify-end p-2">
      <button @click="signout" class="p-1 bg-blue-500 font-bold text-white rounded-md">Signout</button>
    </div>
    <h1 class="text-center text-5xl text-blue-400">Todo List</h1>
    <br>
    <h3 class="text-center font-bold text-gray-800">Tasks can be reordered with drag and dropped. Try it out!</h3>

    <draggable @end="store.updateTasks" v-model="store.todos" tag="ul">
      <template #item="{ element: item }">
        <base-card class="flex justify-between">
          <li> {{ item.task }}</li>
          <div class="flex">
            <base-modal :open="openEditModal">
              <div class="flex">
                <input @focus="editFormInvlaid = false" v-model.trim="editTaskInput" class="border rounded-md"
                  type="text">
                <button @click="submitEdit" class="text-white p-2 border rounded-lg bg-green-500 hover:bg-green-400
                  hover:scale-95">Submit</button>
              </div>
              <h3 v-if="editFormInvlaid" class="font-bold text-red-500">Please add a task.</h3>
            </base-modal>
            <button class="text-white p-2 border rounded-lg bg-blue-400" @click="editTask(item.task,
              item.id)">🖉</button>
            <button class="text-white p-2 border rounded-lg bg-red-500" @click="deleteTodo(item.id)">✘</button>
          </div>
        </base-card>
      </template>
    </draggable>

    <base-spinner v-if="store.isLoading"></base-spinner>

    <base-card class="flex justify-between">
      <div>
        <label for="">Add New Task: </label>
        <input @focus="clearError" v-model.trim="newTaskInput" class="border rounded-md bg-gray-100 w-75" type="text">
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
      openEditModal: false,
      editTaskInput: '',
      editTaskId: '',
      editFormInvlaid: false,
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
    validateEditInput() {
      if (this.editTaskInput === '') {
        this.editFormInvlaid = true;
      }
    },
    clearError() {
      this.formisInvalid = false;
    },
    async addTodo() {
      this.validateForm();

      if (this.formisInvalid) {
        return;
      }

      const taskId = Math.floor(Math.random() * 50000) + 1;
      this.store.todos.push({
        id: taskId,
        task: this.newTaskInput
      })
      this.store.updateTasks()
      this.newTaskInput = ''


    },
    async deleteTodo(id) {
      this.store.removeTodo(id)
    },
    editTask(val, id) {
      this.editTaskInput = val;
      this.editTaskId = id;
      this.openEditModal = true;
    },
    submitEdit() {
      this.validateEditInput()

      if (this.editFormInvlaid) {
        return;
      }


      console.log(this.editTaskInput)
      console.log(this.editTaskId)

      const item = this.store.todos.find(el => el.id === this.editTaskId);

      item.task = this.editTaskInput
      this.store.updateTasks();

      this.openEditModal = false;
      this.editTaskId = ''
      this.editTaskInput = ''
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
