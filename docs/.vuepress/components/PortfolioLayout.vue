<template>
  <div>
    <!-- Single project view -->
    <a :href="$page.frontmatter.links.github">
      <vp-icon v-if="$page.frontmatter.links.github" name="github" size="2em" />
    </a>
    <SingleProjectHeader
      :title="$page.frontmatter.title"
      :year="$page.frontmatter.year.toString()"
      :categories="$page.frontmatter.categories"
    />
    <Thumbnail :src="$page.frontmatter.thumbnail" height="300px" />
    <Content />
  </div>
</template>

<script>
export default {
  computed: {
    isSingleProject() {
      const projectRoutes = "/projects/";
      const { path } = this.$route;
      if (
        path.includes("projects") &&
        path.length >= projectRoutes.length + 1
      ) {
        return true;
      }
    },
  },
};
</script>
