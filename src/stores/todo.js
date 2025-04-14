import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    userId: '',
    todos: [
    ],

  }),
  actions: {
    async getTasks() {
      const response = await fetch(`https://vuetodo-26a3c-default-rtdb.firebaseio.com/${this.userId}.json`)
      const responseData = await response.json();

      const todos = [];

      for (const key in responseData) {
        const todo = {
          id: key,
          title: responseData[key].task,
        }
        todos.push(todo);
      }
      this.todos = todos

    }
  }
})
