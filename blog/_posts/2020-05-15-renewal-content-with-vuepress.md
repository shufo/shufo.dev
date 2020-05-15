---
title: PelicanからVuepressに移行した
date: 2020-05-15T22:21:20.942Z
tags:
  - Vue
  - Programming
slug: renewal-content-with-vuepress
---
Staticサイトジェネレーターを [Pealican](https://blog.getpelican.com/) から [VuePress](https://vuepress.vuejs.org/) に移行したのでその件について書く

## VuePress

Vue製のドキュメントジェネレータ

デフォルトのテーマはプロダクトのドキュメントを出力するのに最適化されているけど, ブログ向けのテーマなどもあり用途に合わせてComponentを書けばいいので特に用途は限定されない

## Netlify

静的コンテンツのホスティングサービス

GitHub Pagesから移行した

## Netlify CMS

静的サイト上でフローを完結出来るNetlify製のコンテンツマネジメントシステム. Netlify上に編集のためのユーザを作成し、CMSのクライアントから認証しGitHubにPull Requestが投げられる. 

サーバランタイムを必用としないのでNetlify上でも動く