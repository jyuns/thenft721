<template>
<div class="text-right">
    <b-button class="mb-2" variant="success" @click="add">추가</b-button>
    <b-table striped :items="items" show-empty>
        <template #cell(updated_at)="row">
        <span>{{row.item.updated_at}}</span>
        <b-button class="mx-2" variant="success"  @click="update(row.item._id)">수정</b-button>
        <b-button class="mx-2" variant="danger" @click="remove(row.item._id)">삭제</b-button>
        </template>
    </b-table>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: ['label'],

    data() {
        return {
            fields: [
                {key: '_id', label:'_id'},
                {key: 'name', label:'name'},
                {key: 'division', label:'division'},
                {key: 'start_date', label:'start_date'},
                {key: 'end_date', label:'end_date'},
                {key: 'created_at', label:'created_at'},
                {key: 'updated_at', label:'updated_at'},
            ],

            items: [],
        }
    },

    async mounted() {
        let label = await this.label
        this.items = await this.FETCH(label)
    },

    methods : {
        ...mapActions([
            'FETCH', 'REMOVE'
        ]),

        add() {
            this.$router.replace(`${this.label}/create`)        
        },

        update(id) {
            this.$router.replace(`${this.label}/update/${id}`)        
        },

        remove(id) {
            let result = this.REMOVE({
                id: id,
                label: this.label
            })

          if(result) window.location.href = `/${this.label}`
        }
    }

}
</script>

<style>

</style>