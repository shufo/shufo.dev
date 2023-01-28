<template>
  <div :class="className" v-html="svg">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    svg: {
      type: String as () => string,
    },
  },
  setup(props) {
    return {
      ...props,
    };
  },
});
</script>
