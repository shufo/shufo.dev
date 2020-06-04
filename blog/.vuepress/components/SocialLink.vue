<template>
  <a :href="url" target="_blank" :title="name" :alt="name">
    <vp-icon :name="icon ? icon : name" :size="size" color="#211F1F" />
  </a>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String,
      default: "",
    },
    url: {
      required: true,
      type: String,
      default: "",
    },
    icon: {
      required: false,
      type: String,
      default: "",
    },
    size: {
      required: false,
      type: String,
      default: "2em",
    },
  },
};
</script>
