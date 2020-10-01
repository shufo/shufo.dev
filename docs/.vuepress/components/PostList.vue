<template>
  <div>
    <ul>
      <div class="card-list">
        <router-link
          :to="post.path"
          tag="div"
          v-for="post in posts"
          :key="post.slug"
          class="post"
        >
          <li>
            <div class="info">
              <h3>
                <a>{{ post.frontmatter.title }}</a>
              </h3>
            </div>
          </li>
        </router-link>
      </div>
      <router-link
        v-if="this.$site.pages.length > this.count"
        to="/blog/"
        tag="div"
        class="post"
      >
        <div class="info">
          <h3><a>read more...</a></h3>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$site.pages
        .filter((x) => x.regularPath.includes("_post"))
        .filter((x) => x.path.startsWith(this.$localePath))
        .sort(
          (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        )
        .slice(0, this.count);
    },
  },
  props: {
    count: {
      type: Number,
      required: false,
      default: 10,
    },
  },
};
</script>

<style scoped>
.card-list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.card-list a {
  cursor: pointer;
  color: #000;
  transition: all 0.2s;
  text-decoration: none;
}
.card-list a:hover {
  text-decoration: underline;
}
a {
  color: inherit;
  font-weight: 200;
  text-decoration: none;
  margin-right: 5px;
}
a:hover {
  color: #8a278c;
}
</style>
