<template>
<div id="date-col">
    <text-skeleton-col v-if="!data.length" :percentage="50"/>
    <span v-else>{{converted}}</span>
</div>
</template>

<script>
export default {
    props: {
        data: {
            type: String
        }
    },

    computed: {
        converted() {
            return this.$convert.date(this.data)
        }
    },
    
    components: {
        textSkeletonCol: () => import('./textSkeletonCol')
    },
}
</script>

<style>

#date-col {
    display:flex;
    justify-content: center;
}

</style>