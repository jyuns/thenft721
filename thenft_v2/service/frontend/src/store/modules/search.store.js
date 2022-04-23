const axios = require('../../utils/axios.util')();
const label = 'search'

const search = {
    namespaced: true,

    state: {
        ITEMS: [],

        IMAGE_STYLE: {
            width: 40,
            height: 40,
            class: 'me-2',
        }
    },

    mutations: {
        INIT: (state) => {
            return state.ITEMS = []
        },

        SET: (state, payload) => {
            return state.ITEMS = payload
        }
    },

    actions: {
        LOAD: async(context, payload) => {
            if(!payload) return

            let result = await axios({
                method: 'GET',
                url: `/${label}?keyword=${payload}`
            })
            
            context.commit('SET', result.data)
        }
    }
}

module.exports = search