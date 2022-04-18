<template>
  <div id="app">
    <sidebar/>
    <router-view class="p-5"/>
  </div>
</template>

<script>
export default {
  components: {
    sidebar: () => import('./components/organism/sidevar'),
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
