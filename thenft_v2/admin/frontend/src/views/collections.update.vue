<template>
  <div>
    <atom-input :object="name" @change="updateValue($event, name)"/>
    <atom-input :object="name_kor" @change="updateValue($event, name_kor)"/>
    <atom-input :object="description" @change="updateValue($event, description)"/>
    <atom-input :object="email" @change="updateValue($event, email)"/>
    <atom-select :select="network"/>
    <atom-select :select="status"/>

    <atom-auto-input :object="collections" @change="updateValue($event, collections)"/>
    <atom-auto-input :object="partners" @change="updateValue($event, partners)"/>
    <atom-auto-input :object="projects" :limit="true" @change="updateValue($event, projects)"/>

    <!-- 공식 사이트 -->
    <organismChannelInput :object="channels" @add="addChannel"/>

    <!-- 팀원 -->
    <organismTeamInput :object="teams" @add="addTeam"/>

    <!-- 이미지 -->
    <atom-image-upload :label="main_image.label" @set="setImage($event, main_image.label)"/>
    {{main_image.source}}
    <atom-image-upload :label="sub_image.label" @set="setImage($event, sub_image.label)"/>
    {{sub_image.source}}
    <b-button class="mt-5 w-100" variant="success" @click="submit">UPSERT</b-button>

  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
    components: {
        atomInput: () => import('../components/atom/input'),
        atomAutoInput: () => import('../components/atom/autoInput'),
        atomSelect: () => import('../components/atom/select'),
        atomImageUpload: () => import('../components/atom/imageUpload'),

        organismChannelInput: () => import('../components/organism/channelInput'),
        organismTeamInput: () => import('../components/organism/teamInput'),
    },

    async created() {  
        if(!this.$route.params.id) return

        let data = await this.FETCH_DETAIL({
            id: this.$route.params.id,
            label: 'collections',
        })

        if(!data) return

        this.id = data._id
        this.name.value = data.name
        this.name_kor.value = data.name_kor
        this.description.value = data.description
        this.email.value = data.email
        this.network.type = data.network
        this.status.type = data.status
        this.collections.array = data.collections? data.collections: []
        this.partners.array = data.partners? data.partners: []
        this.projects.array = data.projects? data.projects: []
        this.channels.array = data.channels? data.channels: []
        this.teams.array = data.teams? data.teams: []

        this.main_image.source = data.main_image
        this.sub_image.source = data.sub_image
    },

    data() {
        return {

            label: 'collections',

            id: null,

            name: {
                label: 'name',
                value: '',
            },

            name_kor: {
                label: 'name_kor',
                value: '',
            },

            description: {
                label: 'description',
                value: '',
            },

            email: {
                label: 'email',
                value: '',
            },

            network: {
                label: 'network',
                type: 'Klaytn',
                options: [
                    {value: 'Klaytn', text: 'Klaytn'},
                    {value: 'Ethereum', text: 'Ethereum'},
                ]
            },

            status: {
                label: 'status',
                type: '개발중',
                options: [
                    {value: '개발중', text: '개발중'},
                    {value: '민팅완료', text: '민팅완료'},
                ]
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

            projects: {
                label: 'projects',
                value: '',
                array: [],
            },

            channels: {
                label: 'channels',

                array: [{
                    division: '',
                    source: '',
                }],

                options: [
                    {value: 'homepage', text: 'homepage'},
                    {value: 'discord', text: 'discord'},
                    {value: 'twitter', text: 'twitter'},
                    {value: 'opensea', text: 'opensea'},
                    {value: 'marketplace', text: 'marketplace'},
                ],
            },

            teams: {
                label: 'teams',

                array: [{
                    name: '',
                    position: '',
                    verified: false
                }]
            },

            main_image: {
                label: 'main_image',
                source: '',
                file: null,
                _id: null,
            },

            sub_image: {
                label: 'sub_image',
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

        addChannel() {
            this.channels.array.push({division: '', source: ''})
        },

        addTeam() {
            this.teams.array.push({name: '', position: '', verified: false})
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

            if(this.main_image.file) {
                this.main_image._id = _id
                this.UPLOAD_IMAGE(this.main_image)
            }

            if(this.sub_image.file) {
                this.sub_image._id = _id
                this.UPLOAD_IMAGE(this.sub_image)
            }

            if(result.status == 200) this.$router.replace(`/${this.label}`)
        }

    }
}
</script>

<style>

</style>