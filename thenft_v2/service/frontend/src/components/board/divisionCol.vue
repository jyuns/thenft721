<template>
    <div id="source-col">

    <text-skeleton-col v-if="!division.length" :percentage="50"/>

    <b-badge v-else class="d-inherit" :href="source">
        {{division}}
        <img src="@/assets/icons/source.svg">
    </b-badge>

    </div>
</template>

<script>
export default {
    props: {
        division: {
            type: String,
        },

        source: {
            type: String,
        }
    },

    components: {
        textSkeletonCol: () => import('./textSkeletonCol')
    },

}
</script>

<style>

#source-col {
    display:flex;
    justify-content: center;
}

</style>