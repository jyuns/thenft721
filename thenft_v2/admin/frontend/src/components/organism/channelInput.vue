<template>
  <div>
    <h5 class="mt-4" style="text-align:left">{{object.label}}</h5>

    <div v-for="(channel, index) in object.array"
    class="mb-4"
    :key="`channel-${index}`">
      <b-form-select v-model="channel.division" :options="object.options"/>
      <b-form-input class="mt-2" v-model="channel.source" :placeholder="object.label"/>
    </div>

    <b-button class="mt-2 w-100" variant="primary" @click="add">추가</b-button>
  </div>
</template>

<script>
export default {
  props:{
    object: {
      type: Object,
      require: true,
    }
  },

  methods: {
    add() {
      this.$emit('add')
    },
  }
}
</script>

<style>

</style>