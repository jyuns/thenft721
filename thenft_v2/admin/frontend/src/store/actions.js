const axios = require('../utils/axios.util');

export default {

    async FETCH(context, payload) {
        
        let result = await axios({
            method: 'GET',
            url: `/${payload}/`
        })
        return result.data
    },

    async FETCH_DETAIL(context, payload) {
        let result = await axios({
            method: 'POST',
            url: `/${payload.label}/${payload.id}`,
        })
        return result.data
    },

    async SEARCH(context, payload) {
        let result = await axios({
            method: 'GET',
            url: `/${payload.label}/search?value=${payload.value}`
        })  

        return result.data
    },

    async SUBMIT(context, payload) {
        let result = await axios({
            method: 'POST',
            url: `/${payload.label}`,
            data: payload
        })

        return result
    },

    async REMOVE(context, payload) {
        let result = await axios({
            method: 'DELETE',
            url: `/${payload.label}/${payload.id}`,
        })

        return result
    },

    async UPLOAD_IMAGE(contenxt, payload) {
        const formData = new FormData();
        formData.append('image', payload.file);

        let result = await axios({
            method: 'POST',
            url: `/image`,
            headers: {
                'Content-Type': 'multipart/form-data'
              },
            params: {
                label: payload.label,
                _id: payload._id,
            },
            data: formData,
        })

        return result
    }
}