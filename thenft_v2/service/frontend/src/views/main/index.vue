<template>
  <div id="main">
    <banner/>
    <router-view class="section scroll"/>
  </div>
</template>

<script>
export default {
  name: 'Main',

  components: {
    banner: () => import('../../components/banner')
  }
}
</script>

<style scoped>
.section {
  overflow-x: auto;
  min-height: 420px;
}
</style>
