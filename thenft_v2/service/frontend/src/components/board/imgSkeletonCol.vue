<template>
    <div id="img-skeleton-col">
        <div class="me-2">
            <b-skeleton variant="dark" type="avatar"></b-skeleton>
        </div>

        <div class="d-flex flex-column justify-content-center w-100">
            <text-skeleton-col class="mb-1" :percentage="50" />
            <text-skeleton-col :percentage="80"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object
        }
    },

    components: {
        textSkeletonCol: () => import('./textSkeletonCol')
    },

}
</script>

<style>
#img-skeleton-col {
    display: flex;
    flex-direction: row;
}
</style>