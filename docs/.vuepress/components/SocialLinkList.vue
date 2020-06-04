<template>
  <div class="list-link">
    <SocialLink
      v-for="link in links"
      :key="link.key"
      :name="link.title"
      :icon="link.frontmatter.icon"
      :url="link.frontmatter.url"
      size="1.5em"
      class="link"
    />
  </div>
</template>

<script>
export default {
  computed: {
    links() {
      const defaultPriority = Number.MAX_SAFE_INTEGER;

      return this.$site.pages
        .filter(
          (x) => x.path.startsWith("/links/") && !x.frontmatter.links_index
        )
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        )
        .sort((a, b) => {
          return (
            (a.frontmatter.priority ?? defaultPriority) -
            (b.frontmatter.priority ?? defaultPriority)
          );
        });
    },
  },
};
</script>
<style scoped>
.list-link {
  line-height: 2rem;
}
.link {
  margin: 5px;
}
</style>
