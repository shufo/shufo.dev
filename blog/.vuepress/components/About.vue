<template>
  <div>
    <Content :pageKey="about.key" />
  </div>
</template>
<script>
export default {
  computed: {
    about() {
      return this.$site.pages.filter(
        (x) => x.frontmatter.pageClass === "introduction"
      )[0];
    },
  },
};
</script>
<style scoped></style>
