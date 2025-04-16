import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    userId: '',
    todos: [
    ],
    errorMessage: null,

  }),
  actions: {
    async getTasks() {
      try {
        const response = await fetch(`https://vuetodo-26a3c-default-rtdb.firebaseio.com/${this.userId}.json`)
        const responseData = await response.json();

        if (!response.ok) {
          const error = new Error(responseData.error.message || responseData.error || 'Failed to fetch data')
          this.errorMessage = 'there was an error'
          this.errorMessage = error;
          return;

        }
        const todos = [];

        for (const key in responseData) {
          const todo = {
            id: key,
            title: responseData[key].task,
          }
          todos.push(todo);
        }
        this.todos = todos
      } catch (error) {
        console.log(error)
        this.errorMessage = error;
      }

    }
  }
})
