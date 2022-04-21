<template>
  <div id="app">
    <Navigator/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>

export default {
  name: 'App',

  components: {
    Navigator: () => import('./components/Navigator'),
    Footer: () => import('./components/Footer'),
  },
}
</script>

<style>
  #app {
    background: #212121;
  }
</style>
