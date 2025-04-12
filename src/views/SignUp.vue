<template>
  <div>
    <div
      class="flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 m:p-16">
      <form @submit.prevent="handleSubmit">
        <label for="email">Email: </label>
        <input @focus="clearError" v-model.trim="enteredEmail.val" class="border" type="email">
        <h3 class="font-bold text-red-500" v-if="!enteredEmail.isValid">Email is invalid</h3>
        <label for="password">Password: </label>
        <input @focus="clearError" v-model.trim="enteredPassword.val" class="border" type="password">
        <h3 class="font-bold text-red-500" v-if="!enteredPassword.isValid">Password is invalid</h3>
        <br>
        <div class="flex justify-between">
          <router-link to="/signin" class="bg-blue-500 p-1 font-bold text-white rounded-md">Sign in</router-link>
          <button class="bg-blue-500 p-1 font-bold text-white rounded-md">Signup</button>
        </div>
      </form>
    </div>
    <h1>{{ enteredEmail }}</h1>
    <h1>{{ enteredPassword }}</h1>
    <h1>{{ formisInvalid }}</h1>
  </div>
</template>

<script>
import { useTodoStore } from '../stores/todo.js';
export default {
  setup() {
    const store = useTodoStore();
    return { store };
  },
  data() {
    return {
      enteredEmail: {
        val: '',
        isValid: true,
      },
      enteredPassword: {
        val: '',
        isValid: true,
      },
      formisInvalid: false,
    }
  },
  methods: {
    validateForm() {
      if (!this.enteredEmail.val.includes('@')) {
        this.enteredEmail.isValid = false,
          this.formisInvalid = true;
      }
      if (this.enteredPassword.val.length < 6) {
        this.enteredPassword.isValid = false,
          this.formisInvalid = true;
      }
    },
    clearError() {
      this.formisInvalid = false;
      this.enteredEmail.isValid = true;
      this.enteredPassword.isValid = true;
    },
    async handleSubmit() {
      this.validateForm();
      if (this.formisInvalid) {
        console.log('form is invalid')
        return;
      }

      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTy5Gbh2mmANhPJfq38cNcarnHRFGfaEM',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.enteredEmail.val,
            password: this.enteredPassword.val,
          })
        })

      const responseData = await response.json();
      this.store.userId = responseData.localId

      console.log(responseData)

      this.$router.replace('/home');
    },
  },
}
</script>



<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
