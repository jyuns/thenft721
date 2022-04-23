<template>
  <div id="dropdown">
      <b-dropdown :text="network">
        <b-dropdown-item
        v-for="(item, index) in networkFields"
        :key="`dropdown-${item.name}-${index}`">{{item.name}}</b-dropdown-item>
      </b-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    network: {
      type: String
    },
    networkFields: {
      type: Array,
    }
  }
}
</script>

<style>
#dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 56px;
    color: white !important;
}

.btn.dropdown-toggle.btn-secondary {
    background: transparent!important;
    border: none!important;
    outline: none;
    box-shadow: none;
}
</style>