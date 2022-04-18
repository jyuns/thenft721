<template>
  <div>
    <atom-input :object="code" @change="updateValue($event, code)"/>
    <atom-select :select="used"/>
    
    <b-button class="mt-5 w-100" variant="success" @click="submit">UPSERT</b-button>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    components: {
        atomSelect: () => import('../components/atom/select'),
        atomInput: () => import('../components/atom/input'),
    },

    async created() {
        if(!this.$route.params.id) return

        let data = await this.FETCH_DETAIL({
            id: this.$route.params.id,
            label: 'promotions',
        })

        if(!data) return
        
        this.id = data._id

        this.code.value = data.code
        this.used.type = data.used
    },

    data() {
        return {

            label: 'promotions',

            id: null,

            code: {
                label: 'code',
                value: '',
            },

            used: {
                label: 'used',
                type: false,
                options: [
                    {value: false, text: '사용가능'},
                    {value: true, text: '사용중'},
                ]
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