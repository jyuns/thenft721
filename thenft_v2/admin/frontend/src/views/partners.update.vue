<template>
  <div>
    <atom-input :object="name" @change="updateValue($event, name)"/>
    <atom-input :object="source" @change="updateValue($event, source)"/>

    <atom-select :select="division"/>

    <!-- 이미지 -->
    <atom-image-upload :label="image.label" @set="setImage($event, image.label)"/>
    {{image.source}}

    <b-button class="mt-5 w-100" variant="success" @click="submit">UPSERT</b-button>

  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    components: {
        atomInput: () => import('../components/atom/input'),
        atomSelect: () => import('../components/atom/select'),
        atomImageUpload: () => import('../components/atom/imageUpload'),
    },

    async created() {  
        if(!this.$route.params.id) return

        let data = await this.FETCH_DETAIL({
            id: this.$route.params.id,
            label: 'partners',
        })

        if(!data) return
        
        this.id = data._id
        this.name.value = data.name
        this.source.value = data.source
        this.division.type = data.division
        this.image.source = data.image
    },

    data() {
        return {

            label: 'partners',

            id: null,

            name: {
                label: 'name',
                value: '',
            },

            source: {
                label: 'source',
                value: '',
            },

            division: {
                label: 'division',
                type: '회사',
                options: [
                    {value: '회사', text: '회사'},
                    {value: '인플루언서', text: '인플루언서'},
                    {value: '작가', text: '작가'},
                    {value: '기타', text: '기타'},
                ]
            },

            image: {
                label: 'image',
                source: '',
                file: null,
                _id: null,
            },

        }
    },

    methods: {

        ...mapActions([
            'SUBMIT', 'UPLOAD_IMAGE',
            'FETCH_DETAIL'
        ]),

        updateValue(value, object) {
            this.$data[object.label].value = value
        },
        
        setImage(value, name) {
            this.$data[name].file = value
        },

        async submit() {
            let result = await this.SUBMIT(this.$data)
            
            let _id
            if(!this.id) {
                _id = result.data._id
            } else {
                _id = this.id
            }

            if(this.image.file) {
                this.image._id = _id
                this.UPLOAD_IMAGE(this.image)
            }

            if(result.status == 200) this.$router.replace(`/${this.label}`)
        }

    }
}
</script>

<style>

</style>