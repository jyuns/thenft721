<template>
  <div id="calendar">
      <b-form-datepicker
        id="datepicker-sm"
        class="datepicker"
        labelHelp=""
        size="sm"
        locale="ko-KR"
        :value="DATE"
        @context="onChangeDate"
        />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    methods: {
        onChangeDate(e) {
            this.$emit('onChangeDate', e.selectedDate)
        }
    },

    computed: {
        ...mapState('event', [
            'DATE'
        ])
    },
}
</script>

<style>

#calendar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
    color: white !important;
}
.datepicker > button {
    color: white !important;
}

.datepicker > label {
    color: white !important;
    display: flex !important;
    align-items: center !important;

    padding: 0!important;
    font-size:1rem!important;
}

.datepicker {
    border: none!important;
    background: transparent!important;
}

.form-control-sm > label::after {
    content: '에 참여 가능한 이벤트'
}
</style>