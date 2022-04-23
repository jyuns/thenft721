<template>
  <div id="event">
    <div class="event-inner">
    <calendar @onChangeDate="onChange"/>
    <Board
    class="text-center"
    :fields="FIELDS"
    :items="ITEMS"
    :loading="LOADING"
    :imageStyle="IMAGE_STYLE"/>
    <next-btn :loading="LOADING" :current="CURRENT" :total="TOTAL" @click="onNext"/>
    </div>
  </div>
</template>

<script>
import Board from '../../components/board';
import calendar from '../../components/event/calendar';
import nextBtn from '../../components/nextBtn';

import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Event',

  components: {
    Board,
    calendar,
    nextBtn
  },

  computed: {
    ...mapState('event', [
      'ITEMS', 'FIELDS', 'LOADING', 'CURRENT','TOTAL','IMAGE_STYLE'
    ])
  },

  methods: {

    ...mapMutations('event', [
        'INIT', 'SET_DATE'
    ]),


    ...mapActions('event', [
      'LOAD', 'NEXT', 'TOTAL_COUNT',
    ]),

    onNext() {
      let data = this.ITEMS
      let last_id = data[data.length-1]._id

      this.NEXT({last_id})
    },

    onChange(e) {
      this.INIT()
      this.SET_DATE(e)

      if(!e) return
      this.LOAD()
      this.TOTAL_COUNT()
    }

  },
}
</script>

<style>
#event {
  display: flex;
  justify-content: center;
}

.event-inner {
  max-width: 1440px;
  width:100%;
}
</style>