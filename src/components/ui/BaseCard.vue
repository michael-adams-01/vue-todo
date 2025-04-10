<!-- <template> -->
<!--   <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"> -->
<!--     <div class="mb-4"> -->
<!--       <slot name="header"></slot> -->
<!--     </div> -->
<!--     <div class="mb-4"> -->
<!--       <slot></slot> -->
<!--     </div> -->
<!--     <div class="mt-4"> -->
<!--       <slot name="footer"></slot> -->
<!--     </div> -->
<!--   </div> -->
<!-- </template> -->

<!-- <script> -->
<!-- </script> -->

<!-- <style scoped> -->
<!-- /* Add any scoped styles you want for the card here */ -->
<!-- </style> -->




<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
