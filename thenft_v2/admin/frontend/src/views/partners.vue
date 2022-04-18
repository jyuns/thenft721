<template>
  <div>
      <list label="partners" />
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