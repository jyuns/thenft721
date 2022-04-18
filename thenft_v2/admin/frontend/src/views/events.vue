<template>
  <div>
      <list label="events" />
  </div>
</template>

<script>
export default {
    components: {
        list: () => import('../components/organism/list'),
    },
}
</script>

<style>

</style>