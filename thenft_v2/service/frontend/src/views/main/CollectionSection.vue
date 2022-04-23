<template>
  <div id="collection">
    <dropdown
    :network="NETWORK"
    :networkFields="NETWORK_FIELDS"/>
    
    <Board
    class="text-center"
    :fields="FIELDS"
    :items="ITEMS"
    :loading="LOADING"
    :imageStyle="IMAGE_STYLE"/>
    <next-btn :loading="LOADING" :current="CURRENT" :total="TOTAL" @click="onNext"/>
  </div>
</template>

<script>
import Board from '../../components/board';
import nextBtn from '../../components/nextBtn';
import dropdown from '../../components/collection/dropdown';

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Collection',

  components: {
    Board,
    nextBtn,
    dropdown,
  },

  computed: {
    ...mapState('collection', [
      'ITEMS', 'FIELDS', 'LOADING', 'CURRENT','TOTAL','IMAGE_STYLE', 'NETWORK', 'NETWORK_FIELDS'
    ])
  },

  methods: {

    ...mapMutations('collection', [
        'INIT', 'SET_DATE'
    ]),


    ...mapActions('collection', [
      'LOAD', 'NEXT', 'TOTAL_COUNT',
    ]),

    onNext() {
      let data = this.ITEMS
      let last_id = data[data.length-1]._id

      this.NEXT({last_id})
    },
  },

  mounted() {
    this.LOAD()
    this.TOTAL_COUNT()
  }
}
</script>

<style>

</style>