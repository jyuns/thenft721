<template>
  <div>
      <list label="collections" />
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