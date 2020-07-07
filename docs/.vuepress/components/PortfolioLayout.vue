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
    <Thumbnail :src="$page.frontmatter.thumbnail" />
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
    }
  },
  mounted() {
    // unwrap all images from paragraph tags so we can have
    // different widths inside the content.
    document.querySelectorAll("img").forEach(image => {
      const wrapper = image.parentNode;
      const { children } = wrapper;
      const fragment = document.createDocumentFragment();
      Array.from(children).forEach(child => {
        fragment.appendChild(child);
      });
      wrapper.parentNode.replaceChild(fragment, wrapper);
    });
  }
};
</script>
