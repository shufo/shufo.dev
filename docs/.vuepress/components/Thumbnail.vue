<template>
  <div>
    <img v-show="isLoaded" :src="src" @load="onImgLoad" />
    <Skeleton v-if="!isLoaded" height="300px" />
  </div>
</template>
<script>
import { Skeleton } from "vue-loading-skeleton";

export default {
  components: { Skeleton },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoaded: false,
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
