<template>
  <div>
    <h5 class="mt-4" style="text-align:left">{{label}}</h5>
    <b-form-file class="mt-2" accept="image/*" name='image' @input="set"/>
  </div>
</template>

<script>
export default {
  props: ['label'],
  
  methods: {
      async set(e) {
          this.$emit('set', e)
      },
  }
}
</script>

<style>

</style>