<template>
  <div>
    <!-- Single project view -->
    <p class="my-2">
      link:
      <a class="github" :href="project.frontmatter.links.github"> GitHub </a>
    </p>
    <SingleProjectHeader
      :title="project.frontmatter.title"
      :year="project.frontmatter.year.toString()"
      :categories="project.frontmatter.categories"
      :tools="project.frontmatter.tools"
    />
    <Thumbnail
      v-if="project.frontmatter.thumbnail"
      :src="project.frontmatter.thumbnail"
      height="300px"
    />
  </div>
</template>

<script lang="ts">
import SingleProjectHeader from "@components/SingleProjectHeader.vue";
import Thumbnail from "@components/Thumbnail.vue";

export default {
  components: { SingleProjectHeader, Thumbnail },
  props: {
    project: {
      required: true,
      type: Object,
    },
  },
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
<style>
.github {
  color: rgb(189, 147, 249);
}
</style>
