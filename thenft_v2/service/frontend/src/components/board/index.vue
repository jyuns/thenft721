<template>
  <div id="board">
    <b-table
    striped
    borderless
    :fields="fields"
    :items="items"
    :sort-compare="sort"
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
            <number-col
            :data="data.item"/>
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

    </b-table>
  </div>
</template>

<script>

/**
 *         

        <template #cell(source)="data">
            <collection-col :data="data.item"/>
        </template>

        <!-- Number Column -->
        <template #cell(total_volume)="data">
            <number-col :data="data.item"/>
        </template>

        <template #cell(floor_price)="data">
            <number-col :data="data.item"/>
        </template>

        <template #cell(one_day_average_price)="data">
            <number-col :data="data.item"/>
        </template>

        <template #cell(one_day_sales)="data">
            <number-col :data="data.item"/>
        </template>

        <template #cell(twitter_power)="data">
            <number-col :data="data.item"/>
        </template>

        <template #cell(discord_power)="data">
            <number-col :data="data.item"/>
        </template>

        <!-- Partner Collections & Partners Column -->
        <template #cell(collections)="data">
            <partner-col :data="data.item"/>
        </template>

        <template #cell(partners)="data">
            <partner-col :data="data.item"/>
        </template>
 */

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
        
//        numberCol: () => import('./numberCol'),
//        partnerCol: () => import('./partnerCol'),
    },

    methods: {
        sort(a, b, key) {
            console.log(key)
            return this.$sort.text(a[key], b[key])
        }
    }
}
</script>

<style>

</style>