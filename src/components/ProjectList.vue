<template>
  <div class="card-list">
    <a
      :href="'/projects/' + project.frontmatter.slug"
      tag="div"
      v-for="project in projects"
      :key="project.frontmatter.slug"
      class="project"
    >
      <Project
        :title="project.frontmatter.title"
        :summary="project.frontmatter.summary"
        :thumbnail="project.frontmatter.thumbnail"
        :links="project.frontmatter.links"
        :tools="project.frontmatter.tools"
      />
    </a>
  </div>
</template>

<script lang="ts">
import Project from "./Project.vue";

export default {
  components: { Project },
  props: {
    projects: {
      default: [],
    },
  },
};
</script>

<style scoped>
.card-list {
  margin-top: 3em;
  display: flex;
  flex-wrap: wrap;
  text-align: right;
  justify-content: center;
}

a {
  color: inherit;
  /* font-weight: 200; */
  text-decoration: none;
  margin-right: 5px;
}

a:hover {
  color: #8a278c;
}
</style>
