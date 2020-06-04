const _ = require("lodash");

const autometaOptions = {
  site: {
    name: "shufo.dev",
    twitter: "shufo_",
  },
  author: {
    name: "shufo",
    twitter: "shufo_",
  },
  canonical_base: "https://shufo.dev",
};

const feedOptions = {
  canonical_base: "https://shufo.dev",
  sort: (entries) => _.reverse(_.sortBy(entries, "date")),
};

const autonavOptions = {
  enable: true,
};

module.exports = {
  title: "shufo.dev",
  description: "random automation stuff",
  lang: "ja",
  plugins: [
    ["autometa", autometaOptions],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-1113986-11",
      },
    ],
    [
      "@vuepress/blog",
      {
        directories: [
          {
            // Unique ID of current classification
            id: "post",
            // Target directory
            dirname: "_posts",
            // Path of the `entry page` (or `list page`)
            path: "/blog/",
          },
          {
            // Unique ID of current classification
            id: "post",
            // Target directory
            dirname: "en/_posts",
            // Path of the `entry page` (or `list page`)
            path: "/en/blog/",
            itemLayout: "Post",
            itemPermalink: "/en/:year/:month/:day/:slug",
          },
        ],
        frontmatters: [
          {
            id: "tag",
            keys: ["tag", "tags"],
            path: "/tag/",
          },
        ],
      },
    ],
    ["feed", feedOptions],
    "@goy/svg-icons",
    "seo",
    ["vuepress-plugin-code-copy", true],
    ["autonav", autonavOptions],
  ],
  theme: "@vuepress/theme-blog", // OR shortcut: @vuepress/blog
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "ja-JP", // this will be set as the lang attribute on <html>
    },
    "/en/": {
      lang: "en-US",
    },
  },
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions;
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text: "About",
        link: "/about/",
      },
      {
        text: "Blog",
        link: "/blog/",
      },
      {
        text: "Projects",
        link: "/projects/",
      },
      {
        text: "Tags",
        link: "/tag/",
      },
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/shufo",
        },
        {
          type: "twitter",
          link: "https://twitter.com/shufo_",
        },
      ],
      copyright: [
        {
          text: "Privacy Policy",
          link: "https://policies.google.com/privacy?hl=en-US",
        },
        {
          text: "MIT Licensed | Copyright © shufo 2020",
          link: "",
        },
      ],
    },
  },
};
