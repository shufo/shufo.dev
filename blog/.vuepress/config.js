const autometa_options = {
  site: {
    name   : 'shufo blog',
    twitter: 'shufo_',
  },
  author: {
    name   : 'shufo',
    twitter: 'shufo_',
  },
  canonical_base: 'https://shufo.dev',
};
module.exports = {
  title: 'shufo blog',
  description: 'random automation stuff',
  lang: 'ja',
  plugins: [['autometa', autometa_options]],
  theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text: 'Blog',
        link: '/',
      },
      {
        text: 'About',
        link: '/hello-world/',
      },
      {
        text: 'Tags',
        link: '/tag/',
      },
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      contact: [
        {
          type: 'github',
          link: 'https://github.com/shufo',
        },
        {
          type: 'twitter',
          link: 'https://twitter.com/shufo_',
        },
      ],
      copyright: [
        {
          text: 'Privacy Policy',
          link: 'https://policies.google.com/privacy?hl=en-US',
        },
        {
          text: 'MIT Licensed | Copyright © shufo 2020',
          link: '',
        },
      ],
    },
  },
}
