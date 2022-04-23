<template>
  <div id="partner-col">
    <div v-for="(item, index) in partners"
    :key="`partner-${rowIndex}-${index}-${item.collection_id||item.partner_id}`">
    
        <b-tooltip v-b-tooltip.hover
        :target="`partner-${rowIndex}-${index}-${item.collection_id||item.partner_id}`">
            {{item.name}}
        </b-tooltip>

        <b-img
        :src="item.image || defaultImage"
        :id="`partner-${rowIndex}-${index}-${item.collection_id||item.partner_id}`"
        v-bind="imageStyle"
        rounded="circle"
        v-if="index!=4"/>

    </div>

    <div class="more-partners ms-1" v-if="totalPartners">
        {{totalPartners}}
    </div>
    
  </div>
</template>

<script>
import defaultImage from '@/assets/images/default.jpg'

export default {
    data() {
        return {
            defaultImage
        }
    },

    props: {
        rowIndex: {
            type: Number,
        },

        partners: {
            type: Array,
        },

        totalPartners: {
            type: Number,
        },

        imageStyle: {
            type: Object,
        }
    }
}
</script>

<style>

#partner-col {
    display: flex;
    justify-content: center;
}

.more-partners {
  width: 40px;
  height: 40px;
  background: #212121;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.more-partners::before {
    content: '+'
}
</style>