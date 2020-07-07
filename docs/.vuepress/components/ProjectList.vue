<template>
  <div class="card-list">
    <a
      :href="project.path"
      tag="div"
      v-for="project in projects"
      :key="project.slug"
      class="project"
    >
      <project
        :title="project.frontmatter.title"
        :summary="project.frontmatter.summary"
        :thumbnail="project.frontmatter.thumbnail"
        :links="project.frontmatter.links"
        :tools="project.frontmatter.tools"
      />
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    projects() {
      const defaultPriority = Number.MAX_SAFE_INTEGER;
      return this.$site.pages
        .filter(
          x => x.path.startsWith("/projects/") && !x.frontmatter.projects_index
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
    }
  }
};
</script>

<style scoped>
.card-list {
  margin-top: 3em;
  display: flex;
  flex-wrap: wrap;
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
/* .project {
  position: relative;
  width: 5rem;
  height: 3rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 5vw;
  cursor: pointer;
}
.info {
  position: absolute;
  left: 0;
  top: 2rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 1);
  max-width: 400px;
}
.info h2 {
  display: inline-block;
  width: auto;
  font-size: 0.8rem;
  font-weight: 700;
  margin: 0;
}
.info span {
  display: inline-block;
  width: auto;
  margin: 0;
  margin-left: 0.5rem;
  font-size: 0.8rem;
} */
</style>
