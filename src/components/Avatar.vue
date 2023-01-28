<template>
  <img
    class="image avatar"
    v-show="isLoaded"
    alt="profile image"
    :src="`${src}?nf_resize=fit&w=${width}`"
    @load="onImgLoad"
    slot="after-avatar"
  />
  <Skeleton
    v-if="!isLoaded"
    circle
    :height="`${height}px`"
    :width="`${width}px`"
  />
</template>
<script>
import Skeleton from "./Skeleton.vue";

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
.image {
  max-width: 126px;
  max-height: 126px;
  border-radius: 50%;
  padding: 2px;
  border: 1px solid #f2f3f3;
}
</style>
