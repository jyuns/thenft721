<template>
  <b-skeleton variant="dark" :width="`${percentage}%`"/>
</template>

<script>
export default {
    props: {
        percentage: {
            type: Number
        }
    }
}
</script>