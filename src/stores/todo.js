import { defineStore } from 'pinia'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    userId: '',
    todos: [
    ],
    errorMessage: null,
    isLoading: false,

  }),
  actions: {
    async getTasks() {
      this.isLoading = true;
      const querySnapshot = await getDocs(collection(db, this.userId));
      let fireBaseTodos = []
      querySnapshot.forEach((doc) => {
        const todo = doc.data().todo;
        fireBaseTodos.push(...todo)
      });
      this.todos = fireBaseTodos
      this.isLoading = false;
    },
    async updateTasks() {
      if (this.userId) {
        await setDoc(doc(db, this.userId, 'todos'), {
          todo: this.todos
        })
      } else {
        console.log("Error fetching data: User not logged in.")
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.updateTasks()
    }
  }
})
