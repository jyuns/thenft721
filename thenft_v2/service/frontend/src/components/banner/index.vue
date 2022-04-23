<template>
  <div id="banner">
        <div class="banner-inner scroll">
            <img class="banner-image mx-2" src="@/assets/banners/banner_1.png"/>
            <img class="banner-image mx-2" src="@/assets/banners/banner_1.png"/>
            <img class="banner-image mx-2" src="@/assets/banners/banner_1.png"/>
            <img class="banner-image mx-2" src="@/assets/banners/banner_1.png"/>
            <img class="banner-image mx-2" src="@/assets/banners/banner_1.png"/>
            <img class="banner-image mx-2" src="@/assets/banners/banner_1.png"/>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#banner {
    margin-top: 32px;
    height: 256px;
    display: flex;
    justify-content: center;
}

.banner-inner {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
}

.banner-image {
    position: relative;
    height: 14rem;
    width: 14rem;
    border-radius: 8px;
}
</style>