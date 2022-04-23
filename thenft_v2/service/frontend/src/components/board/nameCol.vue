<template>
    <div id="name-col">

    <img-skeleton-col v-if="!name.length"/>

    <div v-else class="d-flex pointer" @click="onPageCollection">

        <div class="me-2 d-flex align-items-center">
            <b-img
            :src="image || defaultImage"
            v-bind="imageStyle"
            rounded="circle"/>
        </div>
        
        <div class="d-flex flex-column justify-content-center w-100">
            <p class="text-left name-col-ellipsis fs-6 name-text">{{name}}</p>
            <p class="text-left name-col-ellipsis fs-8 description-text">{{description}}</p>
        </div>
    </div>

    </div>
</template>

<script>

import defaultImage from '@/assets/images/default.jpg'

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
    },

    data() {
        return {
            defaultImage
        }
    }
}
</script>

<style>
.name-col-ellipsis {
    width: 272px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.description-text {
    color: #A6A6A6;
}
</style>