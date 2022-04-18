<template>
<div>
    <h5 class="mt-4" style="text-align:left">{{object.label}}</h5>
    <b-form-input class="mt-2" v-model="inputText" :placeholder="object.label"/>

    <b-list-group v-if="array.length"
        @click="add">
        <b-list-group-item v-for="(item, index) in array"
        :key="`${item._id}-${index}`"
        :id="item._id">{{item.name}}</b-list-group-item>
    </b-list-group>

    <b-list-group class="mt-2" v-if="object.array">
        <h6 class="mt-2" style="text-align:left">{{object.label}} 선택 결과</h6>
        <b-list-group-item v-for="(item, index) in object.array"
        class="d-flex justify-content-between"
        :key="`${item._id}-${index}`"
        :id="item._id">
            <p style="margin:0;">{{item.name}}</p>
            <b-button variant="danger" @click="remove(index)">X</b-button>
        </b-list-group-item>
    </b-list-group>


</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        object: {
            type: Object,
            require: true,
        },

        limit: {
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            array: [],
        }
    },

    computed: {
        inputText: {
            get: function() {
                return this.object.value
            },

            set: function(value) {
                this.$emit("change", value)
                this.search(value)
            }
        }
    },

    methods: {
        ...mapActions([
            'SEARCH'
        ]),

        init() {
            this.object.value = ''
            this.array = []
        },

        async search(value) {
            if(!value.length) return this.init();
            this.array = await this.SEARCH(this.object);
        },

        async add(e) {
            const arr = this.object.array;
            const values = arr.map(object => object._id);

            const _id = e.target.id;
            const name = e.target.innerText;
            
            if(_id == undefined) return
            if(values.indexOf(_id) != -1) return
            if(this.limit * arr.length) return
            
            arr.push({_id, name})

            this.object.array = arr;
            this.init();
        },

        remove(index) {
            this.object.array.splice(index, 1)
        }
    },
}
</script>