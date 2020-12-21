<template>
  <div class="spin"></div>
</template>

<script>
export default {};
</script>

<style>
.spin {
  display: block;
  width: 40px;
  height: 40px;
  margin: 30px auto; /* auto left and right */
  border: 3px solid transparent; /* Make border have color in ONE direction */
  border-radius: 50%; /* Make element fully circular */
  border-top-color: #ff8800;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
</style>
