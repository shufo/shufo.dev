---
title: ブログをAstroに移行した
datetime: '2023-01-28T15:00:00.000Z'
slug: migrate-blog-to-astro
author: shufo
tags:
  - cms
  - blog
  - astro
draft: true
featured: false
---

ブログを [Astro](https://astro.build/ "") に移行した

## Astroとは

Astroの[公式サイトの説明](https://docs.astro.build/en/concepts/why-astro/ "")を見てもらうのが早いかもしれない

`Astro is an all-in-one web frameworkfor buildingfast, content-focusedwebsites.`

コンテンツ主体のウェブサイトを高速に作れるオールインワンウェブフレームワーク、という説明だが実際使ってみた感じ概ね合っていると思う.&#x20;

特徴的なのが Astro で採用している Island Architecture と呼ばれるアーキテクチャで、UIの各コンポーネントを Island (島）のように見立ててそれぞれ独立したマイクロフロントエンドのように扱うことが出来る構成になっていること。

完全に Static な HTML とレンダリング後に Hydration (静的なHTMLに後からイベントハンドラを設定)して JS により動的な操作が出来るコンポーネントを混ぜることで最終的な JS の読み込み量を減らしパフォーマンスの改善が計れるパラダイムとなっている。

また UI-agnostic で Astro 自体のコンポーネント記法とは別に Vue コンポーネントや React コンポーネント、Svelte コンポーネント等任意の UI フレームワークを Astro コンポーネント内に記述出来る。

移行前は [VuePress](https://vuepress.vuejs.org/ "") で一部カスタマイズしたVueコンポーネントを書いたりしていたので、そのままコピーしたのだがほぼ改変などせず新しくテンプレートとして使用した [AstroPaper](https://github.com/satnaing/astro-paper "") の React コンポーネントと混合してそのまま動かしている。

## なぜ Astro なのか&#x20;

Scrapboxにも SPA に関する[メモ](https://scrapbox.io/shufo/SPA%E3%81%AF%E9%96%93%E9%81%95%E3%81%84%E3%81%A0%E3%81%A3%E3%81%9F%E3%81%AE%E3%81%8B "")を書いていたけど 2022 年辺りから過剰な SPA への反省という文脈がある程度共通認識として開発者界隈に広がってきたように思える。

* [An SPA Alternative](https://htmx.org/essays/spa-alternative/ "")
* [Second-guessing the modern web](https://macwright.com/2020/05/10/spa-fatigue.html "")
* [State of JS 2022](https://2022.stateofjs.com/en-US/ "")
  * AlpineやSvelte等非VDOM系軽量UIフレームワークや、Remix, AstroなどMPAアプローチをするライブラリの関心度が高くなっている
* [SPA by default | Thought Works](https://www.thoughtworks.com/radar/techniques/spa-by-default "")
  * アーキテクチャ上の必要性やビジネス上の必要性など無くSPAを選択しまうことに警鐘を鳴らしている

個人的な肌感としてもこれは感じていてそれ以外のやり方を知らないという理由で SPA を利用し必要のない複雑性を受け入れて苦労しているのをここ数年で度々見かけてきていた。（特にNext.jsやNuxt.jsの利用が多くなったあたりから）

雇用市場的にはフロントエンドエンジニアとして採用を目指そうと思うと近年だと SPA 主体の UI フレームワーク以外の選択肢が少なかったので雇用のためにそれを使いたいというのは理解は出来る。しかしソリューションとしては正しくないよねという場面も多く、そういうのを見る度内心苦々しく思っていた。

そのもやもやをまさにピンポイントでソリューションとして提供する Astro は現状の SPA へのアンサーとして、とても正しいように思える。要は我々がやりたいことは完全に影響が独立したコンポーネント指向＆開発者体験の向上だったのだけど、いつのまにかコンポーネント指向をサポートする UI フレームワークでの SPA 開発がコンポーネント指向とセットのようにすり替えられて SPA が目的化してしまい、不必要な場面でパフォーマンスを犠牲にしてしまいユーザへの裏切りとなってしまったことへの。

Astro はその現状の問題によくフィットするソリューションとなっている。Astro 自体は薄いビルドとアーキテクチャを提供するメタフレームワーク程度の Wrapper 風な顔をしていて Astro コンポーネント自体は多機能すぎないのもいい。Astro コンポーネントだけでも十分 Web アプリを作ることは出来るが凝ったことをやろうと思ったら React や Vue の豊富なエコシステムを利用すればいいという割り切りも見える。JSフレームワークでありながら不必要な箇所ではHTML-centricにしZero JSを目指す方向も共感出来る。

## 移行

### Hosting&#x20;

Netlify から Vercel へホスティングサービスを乗り換えた。Netlify の [Free プランは全てのリージョンの CDN を利用出来るというわけではなく](https://answers.netlify.com/t/changing-deployment-region/25265/2 "")、静的なホスティングでも Vercel と比べるとややひっかかりを感じるくらいにはレスポンスの遅さを感じたため。

Netlifyからの移行は GitHub デプロイ連携設定と DNS の向き先変更以外に特に面倒なことはなかった。元のサイトのエントリーのパスが `/2022/10/21/~~` というような形式だったのを `/posts/~` にリダイレクトするため  [Migration ガイド](https://vercel.com/guides/migrate-to-vercel-from-netlify "") を参考に `vercel.json` にリダイレクト設定を書いていった

```json
$  cat vercel.json
{
  "redirects": [
    {
      "source": "/remote-development-with-vscode-and-softether/",
      "destination": "/posts/remote-development-with-vscode-and-softether",
      "permanent": true
    },
~中略~
    {
      "source": "/2022/11/23/vscode-blade-formatter-hits-2000-github-stars/",
      "destination": "/posts/vscode-blade-formatter-hits-2000-github-stars",
      "permanent": true
    }
  ]
}
```

数自体はそこまで多くなかったのでファイル名や slug をコマンドラインでこねこねしてJSON出力させてすぐに終わった

### 既存Vue資産

移行前のブログで Vue で作っていたコンポーネント資産があったため一部そのまま使用している（プロジェクトの一覧など）。一方ベースとなる [AstroPaper](https://github.com/satnaing/astro-paper) は React Component で実装されていたので早速 Island Architecture の目玉であるコンポーネントの混在をしている。今の所特に問題はない。&#x20;

近年はどの UI フレームワークでも基本的に出来ることはほぼ変わらないので任意の UI フレームワークでのコンポーネントを混在して使える Island Architecture は実際のビジネスニーズとしても訴求点になると思う。

どの UI フレームワークも基本的にランタイムとしては出来ることにほぼ変わりはないのにそれぞれのエコシステムや既存資産に制限されてベンダーロックのような状態になってしまうのも個人的にどうなんだ感があったのでこれもうまい落とし所という感じだ。

実際の仕事であれば Astro をとりあえず噛ましておくことで各種 UI フレームワーク間の相互運用をしやすくしたり移行時に漸進的にマイグレーションしていくことが出来るなどの用途も考えられる。入れ替わりの激しいエンジニアのアサイン面でも特定の UI フレームワークにロックされないというのはアサインを柔軟にしやすくなることも期待出来る。

### CMS

以前は Forestry.io を使用していたのだけど 2023/04 で [Discontinued してしまう](https://forestry.io/blog/forestry.io-end-of-life/)ので[TinaCMS](https://tina.io/)へ移行した。

forestry.io の開発チームと同じチームが開発しているので forestry.io を使っていた人はほぼ同じ感覚で使えると思うけど、forestry.ioと同様にGitベースのCMSとなっている。

```shell
$  npx @tinacms/cli@latest init
```



で初期化し Tina の Config を設定する. コンテンツの保存先ディレクトリや Frontmatter の入力項目等指定することでそのフォーマットで .md ファイルが作成される.

```javascript
 $  cat.tina / config.ts
import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets/img/uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        format: 'md',
        path: "src/contents",
        ui: {
          filename: {
            // if disabled, the editor can not edit the filename
            readonly: true,
            // Example of using a custom slugify function
            slugify: values => {
              // Values is an object containing all the values of the form.
              return `${(new Date(values.datetime))?.toLocaleString('en-CA').split(',')[0]}-${values?.slug}`
            },
          },
        },
        defaultItem: () => {
          return {
            // When a new post is created the title field will be set to "New post"
            author: 'shufo',
            draft: true,
            featured: false,
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "datetime",
            label: "Datetime",
            ui: {
              timeFormat: "HH:mm"
            },
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            required: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
            required: true,
          }
        ],
      },
    ],
  },
});
```



Tina の Client ID や Read Only Token などは Vercel の環境変数に設定する。



## まとめ

ブログを Astro に移行した。

移行にかかったのは実質2日程度だったと思う。Astro コンポーネントの記法というか癖もほぼ無く、既存資産をほぼそのまま使用出来たので

