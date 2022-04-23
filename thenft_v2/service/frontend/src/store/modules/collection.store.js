const axios = require('../../utils/axios.util')();

const label = 'collection'

const collection = {
    namespaced: true,

    state: {
        LOADING: false,

        CURRENT: 0,
        TOTAL: 0,

        ITEMS: [
            {_id: '', ranking: 1, name: '', description: '', image: '', collections: [{name:'text', collection_id:'test'},{},{},{}], total_collections:10, partners: [{name:'texzt', partner_id:'t2est'},{},{},{}], total_partners:12,
            price: {
                total_volume: '', floor_price: '', one_day_average_price: '', one_day_sales: '', one_day_volume: ''
            }, 
            media: {
                twitter_power: '', discord_power: ''
            }},

            {_id: '', ranking: 2, name: '', description: '', image: '', collections: [{name:'text', collection_id:'test'},{},{},{}], total_collections:10, partners: [{name:'text', partner_id:'t2est'},{},{},{}], total_partners:12,
            price: {
                total_volume: '', floor_price: '', one_day_average_price: '', one_day_sales: '', one_day_volume: ''
            }, 
            media: {
                twitter_power: '', discord_power: ''
            }}
        ],
                
        FIELDS: [{key: 'ranking', label: '랭킹', sortable: true},
                 {key: 'name', label: 'NFT 컬렉션', sortable: true},
                 {key: 'price.total_volume', label: '누적거래대금', sortable: true},
                 {key: 'price.floor_price', label: '최저가', sortable: true},
                 {key: 'price.one_day_average_price', label: '일평균가', sortable: true},
                 {key: 'price.one_day_volume', label: '일거래대금', sortable: true},
                 {key: 'price.one_day_sales', label: '일판매량', sortable: true},
                 {key: 'media.twitter_power', label: '트위터 팔로워', sortable: true},
                 {key: 'media.discord_power', label: '디스코드 멤버', sortable: true},
                 {key: 'collections', label: '파트너 NFT'},
                 {key: 'partners', label: '파트너사'},],

        IMAGE_STYLE: {
            width: 40,
            height: 40,
            class: '',
        },

        NETWORK: 'Klaytn',

        NETWORK_FIELDS: [
            {
                name: 'Klaytn',
                image: null,
            },
        ],
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
    },

    actions: {
        LOAD: async(context) => {
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

module.exports = collection