<template>
  <div id="next-btn">
  <div @click="onClick">
      <img v-show="loading" class="loading-icon me-2" src="@/assets/icons/loading.svg">
      <p>더보기</p>
      <p>({{current}}/{{total}})</p>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
        type: Boolean,
        required: true,
    },

    current: {
        type: Number,
        required: true,
    },

    total: {
        type: Number,
        required: true,
    }
  },

  methods: {
    onClick() {
      if(this.current == this.total) return
      this.$emit('click')
    }
  },


}
</script>

<style>

#next-btn {
  display: flex;
  justify-content: center;
}

#next-btn>div {
  display: flex;
  justify-content: center;
  
  width: 180px;
  padding: 8px;

  border-radius: 24px;
  background-color: #484848;

  color: white;

  cursor: pointer;
}

.loading-icon {
  animation: rotate_image 1.5s linear infinite;
  transform-origin: 50% 50%;
  margin: 0;
/*  transition-duration: 2s; */
}

@keyframes rotate_image{
  100% {
    transform: rotate(360deg);
  }
}

</style>