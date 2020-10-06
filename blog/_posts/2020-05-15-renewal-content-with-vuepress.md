---
title: HPをVuePress + Netlify + Netlify CMSに移行した
date: 2020-05-15T22:21:20.942Z
tags:
  - Vue
  - Programming
slug: renewal-content-with-vuepress
---
Static siteジェネレータを [Pelican](https://blog.getpelican.com/) から [VuePres](https://vuepress.vuejs.org/) に[移行](https://github.com/shufo/shufo.dev)し、ついでにホスティングサービスをGitHub Pagesから[Netlify](https://www.netlify.com/), CMSとして[Netlify CMS](https://www.netlifycms.org/)を使うように環境を整えた

## Why

- 仕事のプロジェクトでVueベースのStatic Siteジェネレータを素振りしたい場面が出てきたので
- Pelicanの環境がPCの買い換えなどで再現しづらくなってきたので

## [VuePress](https://vuepress.vuejs.org/)とは

Vue製のStatic Site Generator

元はVueのドキュメントを表示するために開発されたが、汎用的なStatic Siteジェネレータとしての機能を備えている

デフォルトのテーマはプロダクトのドキュメントを出力するのに最適化されているけど, [ブログ向けのプラグイン](https://vuepress.vuejs.org/plugin/official/plugin-blog.html)などもあり用途に合わせてプラグインを追加したりComponentを書くことで機能を拡張出来る

## [Netlify](https://www.netlify.com/)

静的コンテンツのホスティングサービス

ビルドなども出来て軽いCIからデプロイまでワンストップで出来るためGitHub Pagesから移行した

また以下に書くNetlify CMSも提供され静的CMSとして統合出来てワークフローを作るのが楽だったため

## [Netlify CMS](https://www.netlifycms.org/)

静的サイト上でフローを完結出来るNetlify製のコンテンツマネジメントシステム. Netlify上に編集のためのユーザを作成もしくは外部Identity ProviderとしてGitHubを使える（Organizationも可). 

サーバランタイムを必用としないSPAとして動作し、ビジュアルエディタとPRを通じてGitHubへコミットをすることでサーバレスでコンテンツのデプロイをすることが出来る

## 所感

- VuePress楽
  - [Gridsome](https://gridsome.org/)と迷ったけどブログ程度の軽い内容なら十分ワークする
- 実際のプロジェクトでも軽く使ってみたけど、サーバランタイムが必用ないことによる心理的負担の少なさ
  - Wordpressは最初だけ楽だけど一度使い始めると世界一利用者数の大きいCMSとしてリスク低減のためにアプデするのが徐々に辛くなる
- Static Site Generatorじゃ出来ないこともあるけど割り切って使う分にはメリット大
  - セキュリティ面
  - コスト面（ホスティングコスト、CDNを使用した効率的なディストリビューション等）
  - パフォーマンス面
    - 静的サイトなので通常使う上でパフォーマンスが問題になることはほぼない
    - パフォーマンスの恩恵から来るSEOのチューニングのしやすさ
  - カスタマイズ（普段使いなれてるReactやVueベースであればコンポーネントを自作して再利用出来る
- 動的コンテンツに関してはAmplifyなどmBaaSをバックエンドにする方法もあるけどCMSでそれやるくらいなら最初からランタイムの存在するバックエンド選ぶかもしれない
  - 何が出来て何が出来ないかという限界をちゃんと整理した上でSSGを選ぶ
- Netlify CMSの認証プロバイダをGitHubにしてしまえば認証面に関しては入り口のGitHubにアイデンティティをIntegration出来るのでOrganizationで使う場合にも導入しやすい

GitHub repo: [https://github.com/shufo/shufo.dev](https://github.com/shufo/shufo.dev)