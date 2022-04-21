const axios = require('../../utils/axios.util')();
const label = 'event'
const { ymd } = require('../../utils/convert.util');

const event = {
    namespaced: true,

    state: {

        LOADING: false,

        CURRENT: 0,
        TOTAL: 0,

        ITEMS: [{start_date: '', end_date: '', division:'', source:'', name: '', description: '', _id: '', image: ''},
                {start_date: '', end_date: '', division:'', source:'', name: '', description: '', _id: '', image: ''},
                {start_date: '', end_date: '', division:'', source:'', name: '', description: '', _id: '', image: ''},
                {start_date: '', end_date: '', division:'', source:'', name: '', description: '', _id: '', image: ''},
                {start_date: '', end_date: '', division:'', source:'', name: '', description: '', _id: '', image: ''},
                {start_date: '', end_date: '', division:'', source:'', name: '', description: '', _id: '', image: ''},
                {start_date: '', end_date: '', division:'', source:'', name: '', description: '', _id: '', image: ''},
                {start_date: '', end_date: '', division:'', source:'', name: '', description: '', _id: '', image: ''},
                {start_date: '', end_date: '', division:'', source:'', name: '', description: '', _id: '', image: ''},],
                
        FIELDS: [{key: 'start_date', label: '시작', sortable: true},
                 {key: 'end_date', label: '종료', sortable: true},
                 {key: 'name', label: 'NFT 컬렉션', sortable: true},
                 {key: 'division', label: '링크', sortable: true},],

        DATE: null,

        IMAGE_STYLE: {
            width: 40,
            height: 40,
            class: '',
        }
    },

    mutations: {
        INIT: (state) => {
            state.CURRENT = 0
            state.TOTAL = 0
            state.ITEMS = []
        },

        SET: (state, payload) => {
            state.ITEMS = payload;
        },

        PUSH: (state, payload) => {
            state.ITEMS.push(...payload);
        },

        LOADING: (state) => {
            state.LOADING = !state.LOADING
        },

        SET_CURRENT: (state, payload) => {
            state.CURRENT += payload
        },

        SET_TOTAL: (state, payload) => {
            state.TOTAL = payload
        },

        SET_DATE: (state, payload) => {
            if(!payload) payload = ymd(new Date())
            state.DATE = payload
        }
    },

    actions: {
        LOAD: async(context) => {
            console.log('LOADING')
            context.commit('LOADING')

            let payload = {'date': context.state.DATE}

            let result = await axios({
                method: 'POST',
                url: `/${label}`,
                data: payload,
            })

            context.commit('SET', result.data)
            context.commit('SET_CURRENT', result.data.length)

            context.commit('LOADING')
        },

        NEXT: async(context, payload) => {

            if(!payload.last_id) return
            payload.date = context.state.DATE;
            context.commit('LOADING');

            let result = await axios({
                method: 'POST',
                url: `/${label}/next`,
                data: payload,
            }).catch(err => {return err.response})

            if(result.status == 200) {
                context.commit('PUSH', result.data)
                context.commit('SET_CURRENT', result.data.length)
                context.commit('LOADING')
            } else {
                context.commit('LOADING')
            }
        },

        TOTAL_COUNT: async(context) => {

            let payload = {'date': context.state.DATE}

            let result = await axios({
                method: 'POST',
                url: `/${label}/total`,
                data: payload,
            }).catch(err => {return err.response})

            if(result.status != 200) return
            context.commit('SET_TOTAL', result.data)
        }
    }
}

module.exports = event