<template>
  <div>
    <img
      v-show="isLoaded"
      :src="`${src}?nf_resize=fit&w=224`"
      @load="onImgLoad"
      class="card-img"
      alt=""
    />
    <Skeleton
      v-if="!isLoaded"
      :height="height"
      :width="width"
      style="line-height: unset"
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
.pu-skeleton {
  line-height: unset !important;
}
</style>
