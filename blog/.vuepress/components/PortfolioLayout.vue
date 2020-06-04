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
    <Content />
  </div>
</template>

<script>
export default {
  computed: {
    isSingleProject() {
      const worksRoute = "/works/";
      const path = this.$route.path;
      if (path.includes("works") && path.length >= worksRoute.length + 1) {
        return true;
      }
    },
  },
  mounted() {
    // unwrap all images from paragraph tags so we can have
    // different widths inside the content.
    document.querySelectorAll("img").forEach((image) => {
      var wrapper = image.parentNode;
      let children = wrapper.children;
      let fragment = document.createDocumentFragment();
      Array.from(children).forEach((child) => {
        fragment.appendChild(child);
      });
      wrapper.parentNode.replaceChild(fragment, wrapper);
    });
  },
};
</script>
