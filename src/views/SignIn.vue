<template>
  <div>
    <base-card>
      <form @submit.prevent="handleSubmit" action="">
        <label for="email">Email: </label>
        <input @focus="clearError" v-model.trim="emailInput.val" class="border" type="email">
        <h3 class="text-red-500" v-if="!emailInput.isValid">Invalid Email</h3>

        <label for="password">Password: </label>
        <input @focus="clearError" v-model.trim="passwordInput.val" class="border" type="password">
        <h3 class="text-red-500" v-if="!passwordInput.isValid">Invalid Password</h3>
        <br>
        <div class="flex justify-between">
          <router-link to="/signup" class="bg-blue-500 p-1 font-bold text-white rounded-md">Signup</router-link>
          <button v-if="!isLoading" class="bg-blue-500 p-1 font-bold text-white rounded-md">Login</button>
          <button v-else class="animate-pulse bg-blue-500 p-1 font-bold text-white rounded-md">Login</button>
        </div>
      </form>
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
      emailInput: {
        val: '',
        isValid: true,
      },
      passwordInput: {
        val: '',
        isValid: true,
      },
      formIsInvalid: false,
      isLoading: false,
    }
  },
  methods: {
    validateForm() {
      if (!this.emailInput.val.includes('@')) {
        this.emailInput.isValid = false;
        this.formIsInvalid = true;
      }
      if (this.passwordInput.val.length < 6) {
        this.passwordInput.isValid = false;
        this.formIsInvalid = true;
      }
    },
    async handleSubmit() {
      this.validateForm();
      if (this.formIsInvalid) {
        console.log('Invalid form!')
        return;
      }

      this.isLoading = true
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTy5Gbh2mmANhPJfq38cNcarnHRFGfaEM',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.emailInput.val,
            password: this.passwordInput.val,
          })
        })
      const responseData = await response.json();
      this.store.userId = responseData.localId
      this.isLoading = false
      await this.store.getTasks();
      this.$router.replace('/home');

      // if (response.ok) {
      //   console.log("Response is ok")
      // }

      // console.log(this.emailInput.isValid)
      // console.log(this.passwordInput.isValid)
      //this.$router.replace('/home');
    },
    clearError() {
      this.formIsInvalid = false;
      this.emailInput.isValid = true;
      this.passwordInput.isValid = true;
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
