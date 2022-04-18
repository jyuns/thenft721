<template>
  <div class="sidebar-container px-5 py-2">
    <b-button v-b-toggle.sidebar-left>메뉴 열기</b-button>
    <b-sidebar id="sidebar-left" title="DB 테이블" left shadow>
      <div class="px-3 py-2 d-flex flex-column">
        <router-link class="py-2" to="/collections">Collections</router-link>
        <router-link class="py-2" to="/news">News</router-link>
        <hr>
        <router-link class="py-2" to="/partners">Partners</router-link>
        <hr>
        <router-link class="py-2" to="/events">Events</router-link>
        <hr>
        <router-link class="py-2" to="/promotions">Promotions</router-link>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.sidebar-container {
    text-align: left;
}
</style>