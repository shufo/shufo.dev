<template>
  <div class="card-item">
    <card-thumbnail v-if="thumbnail" :src="thumbnail" height="140px" />
    <div class="card-content">
      <div class="card-link">
        <i v-for="tool in tools" :key="tool" :alt="tool" :title="tool">
          <vp-icon :name="tool" size="2em" :alt="tool" />
        </i>
      </div>
      <!-- <ul class="card-link" v-if="links">
        <li v-if="links.github">
          <vp-icon name="github" size="2em" />
        </li>
        <li v-if="tools">
          <vp-icon v-for="tool in tools" :key="tool" :name="tool" size="2em" />
        </li>
      </ul> -->
      <h1 class="card-title">{{ title }}</h1>
      <p class="card-text">
        {{ summary }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    summary: {
      required: true,
      type: String
    },
    thumbnail: {
      required: false,
      type: String
    },
    links: {
      required: false,
      type: Object
    },
    tools: {
      required: false,
      type: Array
    }
  }
};
</script>
<style scoped>
.card-item {
  margin: 0 15px 15px 0;
  width: 14rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}
.card-img {
  border-radius: 5px 5px 0 0;
  max-width: 100%;
}
.card-content {
  padding: 20px;
}
.card-title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}
.card-text {
  color: #777;
  font-size: 14px;
  line-height: 1.5;
}

.card-content > .card-link {
  padding: 0;
}
.card-content > .vp-icon {
  flex: auto;
}
.card-link {
  /* list-style: none;
  text-align: center; */
  display: flex;
  justify-content: center;
}

.card-link > i {
  flex-wrap: wrap;
  margin: 3px;
}

.card-link > li {
  display: inline;
}

.card-link > li {
  display: inline;
}
.card-link a {
  text-decoration: none;
  color: #0bd;
  margin: 0 auto;
}
.card-link a:hover {
  color: #0090aa;
}
</style>
