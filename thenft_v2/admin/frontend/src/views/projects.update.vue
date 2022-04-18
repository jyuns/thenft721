<template>
  <div>
    <atom-input :object="name" @change="updateValue($event, name)"/>
    
    <b-button class="mt-5 w-100" variant="success" @click="submit">UPSERT</b-button>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    components: {
        atomInput: () => import('../components/atom/input'),
    },

    async created() {
        if(!this.$route.params.id) return

        let data = await this.FETCH_DETAIL({
            id: this.$route.params.id,
            label: 'projects',
        })

        if(!data) return
        
        this.id = data._id

        this.name.value = data.name
    },

    data() {
        return {

            label: 'projects',

            id: null,

            name: {
                label: 'name',
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