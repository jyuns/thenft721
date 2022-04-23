<template>
    <div id="number-col">

        <div class="d-flex align-items-center justify-content-center">
            <img class="price-standard-icon me-1" src="@/assets/icons/klaytn.png"/>
            <span class="price-value me-1" v-show="price">{{price}}</span>          
            <span class="change-value" :class="onCheck(change)" v-show="change">{{change}}</span>
        </div>
        
        <div class="won-value" v-show="won">{{won}}</div>

    </div>
</template>

<script>
export default {
    props: {
        price: {
//            type: String
        },

        change: {
//            type: String
        },

        won: {
//            type: String
        }
    },

    methods: {
        onCheck(value) {
            return this.$convert.percentageCheck(value)
        }
    }
}
</script>

<style>
.price-standard-icon {
    width: 18px;
    height: 18px;
    margin-left: 0px;
}

.price-value {
    font-size: 14px;
    font-weight: bold;
}

.change-value {
    font-size: 14px;
}

.change-value.positive {
    color: #00BB4A;
}

.change-value.negative {
    color: #F86363;
}

.won-value {
    font-size: 12px;
    color: #A6A6A6;
}

.won-value::after {
    content: '원'
}

.change-value::before {
    content: '('
}

.change-value::after {
    content: '%)'
}
</style>