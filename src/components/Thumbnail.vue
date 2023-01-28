<template>
  <div>
    <img v-show="isLoaded" :src="src" @load="onImgLoad" />
    <Skeleton v-if="!isLoaded" :height="height" :width="width" />
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: false,
    },
    width: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      isLoaded: true,
    };
  },
  methods: {
    onImgLoad() {
      this.isLoaded = true;
    },
  },
};
</script>
<style>
.content-wrapper img {
  max-width: 100%;
}
</style>
