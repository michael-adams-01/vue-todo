<template>
  <div class="flex items-center justify-center min-h-screen">
    <div
      class="flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 m:p-16">
      <form @submit.prevent="handleSubmit">
        <label for="name">Name: </label>
        <input class="border" type="text">
        <label for="email">Email: </label>
        <input class="border" type="email">
        <label for="password">Password: </label>
        <input class="border" type="password">
        <button class="bg-blue-500 p-1 font-bold text-white rounded-md">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      console.log("Form submitted")
      this.$router.replace('/home');
    },
  },
}
</script>
