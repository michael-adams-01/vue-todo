<template>
  <div class="flex items-center justify-center min-h-screen">
    <div
      class="flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 m:p-16">
      <form @submit.prevent="handleSubmit" action="">
        <label for="email">Email:</label>
        <input class="border" type="email">
        <br>

        <label for="password">Password</label>
        <input class="border" type="text">
        <button class="bg-blue-500 p-1 font-bold text-white rounded-md">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSubmit() {
      console.log("Hi, I ran")
      this.$router.replace('/home');
    },
  },
}
</script>
