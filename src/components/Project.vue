<template>
  <div class="card-item" :class="{ 'dark-mode': darkMode }">
    <CardThumbnail v-if="thumbnail" :src="thumbnail" height="140px" />
    <div class="card-content">
      <div class="card-link">
        <i v-for="tool in tools" :key="tool" :alt="tool" :title="tool">
          <Icon :svg="toolIcons[tool]" />
        </i>
      </div>
      <h1 class="card-title" :class="{ 'dark-mode': darkMode }">{{ title }}</h1>
      <p class="card-text" :class="{ 'dark-mode': darkMode }">
        {{ summary }}
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import CardThumbnail from "@components/CardThumbnail.vue";
import Icon from "@components/Icon.vue";
import toolIcons from "@assets/toolIcons";

export default {
  components: { CardThumbnail, Icon },
  data() {
    return {
      toolIcons: toolIcons,
      darkMode: false, // set this to true or false based on user preference
    };
  },
  props: {
    title: {
      required: true,
      type: String,
    },
    summary: {
      required: true,
      type: String,
    },
    thumbnail: {
      required: false,
      type: String,
    },
    links: {
      required: false,
      type: Object,
    },
    tools: {
      required: false,
      type: Array,
    },
  },
};
</script>
<style scoped>
.card-item {
  margin: 0 15px 15px 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

@media (min-width: 0px) {
  .card-item {
    width: fit-content;
  }
}

@media (min-width: 660px) {
  .card-item {
    width: 18em;
  }
}

@media (min-width: 1000px) {
  .card-item {
    width: 14rem;
  }
}

.dark-mode {
  color: #eee;
  background-color: #333;
  border-color: #444;
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
