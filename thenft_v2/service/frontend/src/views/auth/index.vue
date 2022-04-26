<template>
  <div id="sign">
    <router-view
    class="sign-container"/>
  </div>
</template>

<script>
export default {
  name: 'Sign',
}
</script>

<style>
.sign-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 32px;
  margin-bottom: 64px;
}

</style>
