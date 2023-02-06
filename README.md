# shufo.dev

My blog built with

- [Astro](https://astro.build/) (SSG)
- [AstroPaper](https://github.com/satnaing/astro-paper) (Blog Theme)
- [Cloudflare Pages](https://pages.cloudflare.com/) (Hosting)
- [TinaCMS](https://tina.io/) (CMS)

## Installation

```
$ yarn install
```

then get client id and read only token from app.tina.io and setting environment variable as `TINA_CLIENT_ID`, `TINA_TOKEN`.

## Development

Run local environment

```bash
$ yarn run dev
```

Check if assets can properly build for production

```bash
$ yarn run build
$ yarn run preview
```

## Admin

### TinaCMS

```bash
$ yarn run dev
```

then open https://localhost:3000/admin/

## Contributing

1.  Fork it
2.  Create your feature branch (`git checkout -b my-new-feature`)
3.  Commit your changes (`git commit -am 'Add some feature'`)
4.  Push to the branch (`git push origin my-new-feature`)
5.  Create new Pull Request

For more details, please head VuePress's [documentation](https://v1.vuepress.vuejs.org/).
