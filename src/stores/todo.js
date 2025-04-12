import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    userId: '',
    todos: [
      {
        id: 1,
        title: "Morning workout",
        description: "Stretch, light cardio, and strength training",
        completed: false,
        dueDate: "2025-04-11",
        priority: "High"
      },
      {
        id: 2,
        title: "Read programming article",
        description: "Focus on new techniques in Vue.js",
        completed: false,
        dueDate: "2025-04-11",
        priority: "Medium"
      },
      {
        id: 3,
        title: "Complete project task",
        description: "Finish implementing Firebase authentication",
        completed: false,
        dueDate: "2025-04-11",
        priority: "High"
      },
      {
        id: 4,
        title: "Grocery shopping",
        description: "Buy essentials for the week",
        completed: false,
        dueDate: "2025-04-12",
        priority: "Medium"
      },
      {
        id: 5,
        title: "Clean workspace",
        description: "Organize desk and tidy up development area",
        completed: true,
        dueDate: "2025-04-10",
        priority: "Low"
      },
      {
        id: 6,
        title: "Prepare dinner",
        description: "Cook a healthy meal for the evening",
        completed: false,
        dueDate: "2025-04-10",
        priority: "Low"
      }
    ],

  }),
  actions: {
    testAction() {
      console.log("testAction ran!")
    }
  }
})
