<template>
  <div>
    <atom-auto-input :object="collections" @change="updateValue($event, collections)"/>
    <atom-input :object="source" @change="updateValue($event, source)"/>
    
    <atom-select :select="division"/>
    <atom-date :object="start_date" @changeDate="updateDate($event, start_date)" @changeTime="updateTime($event, start_date)"/> 
    <atom-date :object="end_date" @changeDate="updateDate($event, end_date)" @changeTime="updateTime($event, end_date)"/>
    
    <b-button class="mt-5 w-100" variant="success" @click="submit">UPSERT</b-button>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    components: {
        atomDate: () => import('../components/atom/date'),
        atomSelect: () => import('../components/atom/select'),
        atomInput: () => import('../components/atom/input'),
        atomAutoInput: () => import('../components/atom/autoInput'),
    },

    async created() {
        if(!this.$route.params.id) return

        let data = await this.FETCH_DETAIL({
            id: this.$route.params.id,
            label: 'events',
        })

        if(!data) return
        
        this.id = data._id
        this.collections.array = [{
            _id: data.collection_id,
            name: data.name
        }]

        this.image = data.image
        this.start_date.date = data.start_date.split('T')[0]
        this.start_date.time = data.start_date.split('T')[1].split('.')[0]

        this.end_date.date = data.end_date.split('T')[0]
        this.end_date.time = data.end_date.split('T')[1].split('.')[0]

        this.source.value = data.source
        this.division.type = data.division
    },

    data() {
        return {

            label: 'events',

            id: null,

            collections: {
                label: 'collections',
                value: '',
                array: [],
            },

            start_date: {
                label: 'start_date',
                date: '',
                time: '00:00:00',
            },

            end_date: {
                label: 'end_date',
                date: '',
                time: '00:00:00',
            },

            source: {
                label: 'source',
                value: '',
            },

            division: {
                label: 'division',
                type: '화이트리스트',
                options: [
                    {value: '화이트리스트', text: '화이트리스트'},
                    {value: '에어드랍', text: '에어드랍'},
                    {value: '프리세일', text: '프리세일'},
                    {value: '퍼블릭세일', text: '퍼블릭세일'},
                    {value: 'AMA', text: 'AMA'},
                    {value: '기타', text: '기타'},
                ]
            },

            image : ''


        }
    },

    methods: {

        ...mapActions([
            'SUBMIT', 'FETCH_DETAIL'
        ]),

        updateDate(value, object) {
            this.$data[object.label].date = value
        },

        updateTime(value, object) {
            this.$data[object.label].time = value
        },

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