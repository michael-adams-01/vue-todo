<template>
  <div>
    <base-card>
      <h1 class="font-bold text-center text-3xl">Sign Up</h1>
      <form @submit.prevent="handleSubmit">
        <label for="email">Email: </label>
        <input @focus="clearError" v-model.trim="enteredEmail.val" class="border" type="email">
        <h3 class="font-bold text-red-500" v-if="!enteredEmail.isValid">Please enter a valid email</h3>
        <label for="password">Password: </label>
        <input @focus="clearError" v-model.trim="enteredPassword.val" class="border" type="password">
        <h3 class="font-bold text-red-500" v-if="!enteredPassword.isValid">Password must be at least
          six characters</h3>
        <br>
        <div class="flex justify-between">
          <button class="hover:scale-95 bg-blue-500 p-1 font-bold text-white rounded-md">Signup</button>
          <router-link to="/signin"
            class="p-1 font-bold text-black rounded-md hover:scale-95 hover:rounded-md hover:bg-blue-200">Sign
            in</router-link>
        </div>
      </form>
      <base-spinner v-if="isLoading"></base-spinner>
      <!-- <h3 v-if="!!store.errorMessage" class="font-bold text-red-500">{{ store.errorMessage }}</h3> -->
      <!-- <base-modal :open="!!store.errorMessage"> -->
      <!--   <h1 class="font-bold text-red-500">{{ store.errorMessage }}</h1> -->
      <!--   <button class="border rounded-lg bg-blue-400 font-bold text-white p-1 m-1" -->
      <!--     @click="store.errorMessage = ''">Close</button> -->
      <!-- </base-modal> -->
      <base-modal :open="!!store.errorMessage">
        <h1 class="font-bold text-red-500">{{ store.errorMessage }}</h1>
        <button @click="store.errorMessage = null"
          class="border rounded-lg bg-blue-400 font-bold text-white p-1 m-1">Close</button>
      </base-modal>
    </base-card>
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
      isLoading: false,
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

      try {

        this.isLoading = true;
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
        localStorage.setItem('userId', responseData.localId);

        if (!response.ok) {
          console.log("Response is not ok")
          this.isLoading = false;
          const error = new Error(responseData.error.message || 'There was an error signing up. Please try again')
          this.store.errorMessage = error;
          return;
        }

      } catch (error) {
        console.log("There was an error", error)
        this.store.errorMessage = error;
        this.isLoading = false;
        return;
      }

      this.isLoading = false;
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
