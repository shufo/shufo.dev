const _ = require("lodash");

const autometaOptions = {
  site: {
    name: "shufo.dev",
    twitter: "shufo_"
  },
  author: {
    name: "shufo",
    twitter: "shufo_"
  },
  canonical_base: "https://shufo.dev"
};

const feedOptions = {
  canonical_base: "https://shufo.dev",
  sort: entries => _.reverse(_.sortBy(entries, "date"))
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
        ga: "UA-1113986-11"
      }
    ],
    ["feed", feedOptions]
  ],
  theme: "@vuepress/theme-blog", // OR shortcut: @vuepress/blog
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
        text: "Blog",
        link: "/"
      },
      {
        text: "About",
        link: "/hello-world/"
      },
      {
        text: "Tags",
        link: "/tag/"
      }
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/shufo"
        },
        {
          type: "twitter",
          link: "https://twitter.com/shufo_"
        }
      ],
      copyright: [
        {
          text: "Privacy Policy",
          link: "https://policies.google.com/privacy?hl=en-US"
        },
        {
          text: "MIT Licensed | Copyright © shufo 2020",
          link: ""
        }
      ]
    }
  }
};
