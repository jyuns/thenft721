<template>
<div>
    <h5 class="mt-4" style="text-align:left">{{object.label}}</h5>
    <b-form-datepicker class="mt-2" v-model="changeDate"/>

    <h5 class="mt-4" style="text-align:left">{{object.label}}</h5>
    <b-time v-model="changeTime" locale="ko"></b-time>
</div>
</template>

<script>
export default {
    props: {
        object: {
            type: Object,
            require: true,
        },
    },

    computed: {
        changeDate: {
            get: function() {
                return this.object.date
            },

            set: function(value) {
                this.$emit("changeDate", value)
            }
        },

        changeTime: {
            get: function() {
                return this.object.time
            },

            set: function(value) {
                this.$emit("changeTime", value)
            }
        }
    

    }
}
</script>