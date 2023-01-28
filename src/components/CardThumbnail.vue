<template>
  <div>
    <img
      v-show="isLoaded"
      :src="`${src}?nf_resize=fit&w=630`"
      class="card-img"
      alt=""
    />
  </div>
</template>
<script lang="ts">

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
.pu-skeleton {
  line-height: unset !important;
}
</style>
