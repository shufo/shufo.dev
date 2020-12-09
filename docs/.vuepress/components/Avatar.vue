<template>
  <div>
    <img
      v-show="isLoaded"
      :src="`${src}?nf_resize=fit&w=${width}`"
      @load="onImgLoad"
    />
    <Skeleton
      v-if="!isLoaded"
      circle
      :height="`${height}px`"
      :width="`${width}px`"
    />
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
