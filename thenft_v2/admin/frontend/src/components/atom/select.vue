<template>
<div>
    <h5 class="mt-4" style="text-align:left">{{select.label}}</h5>
    <b-form-select class="mt-2" v-model="select.type" :options="select.options"/>
</div>
</template>

<script>
export default {
    props: {
        select: {
            type: Object,
            require: true,
        }
    },
}
</script>