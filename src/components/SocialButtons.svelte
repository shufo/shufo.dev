<script lang="ts">
  import {
    LinkedIn,
    Facebook,
    Twitter,
    Line,
  } from "svelte-share-buttons-component";
  import { SITE } from "@config";

  export let title: string;
  export let url: string;

  const siteTitle = SITE.title.replace(/\./, "\\.");
</script>

<Twitter class="share-button" text="{title} - {siteTitle}" {url} via="shufo_" />
<Facebook class="share-button" quote="{title} - {siteTitle}" {url} />
<Line class="share-button" {url} />
<LinkedIn class="share-button" {url} />

<style>
  .share-button {
    padding: 0.5em;
  }
</style>
