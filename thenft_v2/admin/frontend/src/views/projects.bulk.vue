<template>
  <div>

    <atom-auto-input :object="projects" :limit="true" @change="updateValue($event, projects)"/>
    <atom-auto-input :object="collections" @change="updateValue($event, collections)"/>
    <atom-auto-input :object="partners" @change="updateValue($event, partners)"/>

    <b-button class="mt-5 w-100" variant="success" @click="submit">UPSERT</b-button>

  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    components: {
        atomAutoInput: () => import('../components/atom/autoInput'),
    },

    data() {
        return {

            label: 'projects/bulk',

            projects: {
                label: 'projects',
                value: '',
                array: [],
            },

            collections: {
                label: 'collections',
                value: '',
                array: [],
            },

            partners: {
                label: 'partners',
                value: '',
                array: [],
            },
        }
    },

    methods: {

        ...mapActions([
            'SUBMIT'
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