<template>
  <div id="board">
    <b-table
    striped
    borderless
    :fields="fields"
    :items="items"
    :sort-compare="sort"
    label-sort-clear=""
    label-sort-asc=""
    label-sort-desc="">

        <template #cell(start_date)="data">
            <date-col
            :data="data.item.start_date"/>
        </template>

        <template #cell(end_date)="data">
            <date-col
            :data="data.item.end_date"/>
        </template>

        <template #cell(ranking)="data">
            <ranking-col
            :ranking="data.item.ranking"/>
        </template>

        <template #cell(division)="data">
            <division-col
            :division="data.item.division"
            :source="data.item.source"/>
        </template>

        <template #cell(name)="data">
            <name-col
            :id="data.item._id"
            :page_str="data.item.page_str"
            :name="data.item.name"
            :description="data.item.description"
            :image="data.item.image"
            :imageStyle="imageStyle"
            />
        </template>

        <!-- Number Column -->
        <template #cell(price.total_volume)>
            <number-col :price="1" :change="1" :won="1"/>
        </template>

        <template #cell(price.floor_price)>
            <number-col :price="1" :change="1" :won="1"/>
        </template>

        <template #cell(price.one_day_average_price)>
            <number-col :price="1" :change="1" :won="1"/>
        </template>

        <template #cell(price.one_day_volume)>
            <number-col :price="1" :change="1" :won="1"/>
        </template>

        <template #cell(price.one_day_sales)>
            <number-col :price="1" :change="1"/>
        </template>

        <template #cell(media.twitter_power)>
            <number-col :price="1" :change="`+23.5`"/>
        </template>

        <template #cell(media.discord_power)>
            <number-col :price="1" :change="`-10.2`"/>
        </template>

        <!-- Partner Collections & Partners Column -->
        <template #cell(collections)="data">
            <partner-col
            :partners="data.item.collections"
            :totalPartners="data.item.total_collections"
            :imageStyle="imageStyle"
            :rowIndex="data.index"/>
        </template>

        <template #cell(partners)="data">
            <partner-col
            :partners="data.item.partners"
            :totalPartners="data.item.total_partners"
            :imageStyle="imageStyle"
            :rowIndex="data.index"/>
        </template>


    </b-table>
  </div>
</template>

<script>
export default {
    name: 'Board',

    props: {
        fields: {
            type: Array,
            required: true
        },

        items: {
            type: Array,
            required: true
        },
        
        imageStyle: {
            type: Object,
        },
    },

    components: {
        dateCol: () => import('./dateCol'),
        divisionCol: () => import('./divisionCol'),
        nameCol: () => import('./nameCol'),
        
        rankingCol: () => import('./rankingCol'),
        numberCol: () => import('./numberCol'),
        partnerCol: () => import('./partnerCol'),
    },

    methods: {
        sort(a, b, key) {
            return this.$sort.text(a[key], b[key])
        }
    }
}
</script>

<style>

</style>