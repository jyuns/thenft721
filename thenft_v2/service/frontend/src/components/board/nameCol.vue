<template>
    <div id="collection-col">

    <img-skeleton-col v-if="!name.length"/>

    <div v-else class="d-flex" @click="onPageCollection">

        <div class="me-2 d-flex align-items-center">
            <b-img
            :src="image"
            v-bind="imageStyle"
            rounded="circle"/>
        </div>

        <div class="d-flex flex-column justify-content-center w-100">
            <p class="text-left ellipsis fs-6">{{name}}</p>
            <p class="text-left ellipsis fs-8">{{description}}</p>
        </div>
    </div>

    </div>
</template>

<script>

export default {
    props: {

        id: {
            type: String,
        },

        page_str: {
            type: String,
        },

        name: {
            type: String,
        },

        description: {
            type: String,
        },

        image: {
            type: String,
        },

        imageStyle: {
            type: Object,
        }
    },

    components: {
        imgSkeletonCol: () => import('./imgSkeletonCol')
    },

    methods: {
        onPageCollection() {
            let page = this.page_str
            this.$router.push(`/collection/${page}`)
        }
    }
}
</script>

<style>
.ellipsis {
    width: 272px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>