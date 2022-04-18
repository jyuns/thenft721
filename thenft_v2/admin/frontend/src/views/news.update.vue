<template>
  <div>
    <atom-auto-input :object="collections" @change="updateValue($event, collections)"/>
    <atom-input :object="title" @change="updateValue($event, title)"/>
    <atom-input :object="source" @change="updateValue($event, source)"/>
    
    <b-button class="mt-5 w-100" variant="success" @click="submit">UPSERT</b-button>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    components: {
        atomInput: () => import('../components/atom/input'),
        atomAutoInput: () => import('../components/atom/autoInput'),
    },

    async created() {
        if(!this.$route.params.id) return

        let data = await this.FETCH_DETAIL({
            id: this.$route.params.id,
            label: 'news',
        })

        if(!data) return
        
        this.id = data._id
        this.collections.array = [{
            _id: data.collection_id,
            name: data.name
        }]

        this.title.value = data.title
        this.source.value = data.source
    },

    data() {
        return {
            label: 'news',

            id: null,

            collections: {
                label: 'collections',
                value: '',
                array: [],
            },

            title: {
                label: 'title',
                value: '',
            },

            source: {
                label: 'source',
                value: '',
            },
        }
    },

    methods: {

        ...mapActions([
            'SUBMIT', 'FETCH_DETAIL'
        ]),

        updateValue(value, object) {
            this.$data[object.label].value = value
        },

        async submit() {
            let result = await this.SUBMIT(this.$data)
            if(result.status == 200) this.$router.replace(`/${this.label}`)
        }

    }
}
</script>

<style>

</style>