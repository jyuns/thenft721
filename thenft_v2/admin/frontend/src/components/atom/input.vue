<template>
<div>
    <h5 class="mt-4" style="text-align:left">{{object.label}}</h5>
    <b-form-input class="mt-2" v-model="inputText" :placeholder="object.label"/>
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
        inputText: {
            get: function() {
                return this.object.value
            },

            set: function(value) {
                this.$emit("change", value)
            }
        }
    }
}
</script>