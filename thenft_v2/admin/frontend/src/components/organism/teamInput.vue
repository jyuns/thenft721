<template>
  <div>
    <h5 class="mt-4" style="text-align:left">{{object.label}}</h5>

    <div v-for="(team, index) in object.array"
    class="mb-4"
    :key="`team-${index}`">
      <b-form-input class="mt-2" v-model="team.name" placeholder="이름"/>
    <b-form-input class="mt-2" v-model="team.position" placeholder="포지션"/>
      <div class="d-flex">
        <p class="mt-2 mb-0 mr-3">Verified</p>
        <b-form-checkbox class="mt-2" v-model="team.verified" :value="true" :unchecked-value="false"/>
      </div>
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