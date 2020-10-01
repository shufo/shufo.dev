---
title: HPをVuepressに移行した
date: 2020-05-15T22:21:20.942Z
tags:
  - Vue
  - Programming
slug: renewal-content-with-vuepress
---
Static siteジェネレータを [Pelican](https://blog.getpelican.com/) から [VuePres](https://vuepress.vuejs.org/) に移行した

## Why

- プロジェクトでVueベースのStatic Siteジェネレータを素振りしたい場面が出てきたので
- Pelicanの環境がPCの買い換えなどで再現しづらくなってきたので

## VuePressとは

Vue製のドキュメントジェネレータ

デフォルトのテーマはプロダクトのドキュメントを出力するのに最適化されているけど, ブログ向けのテーマなどもあり用途に合わせてComponentを書けばいいので特に用途は限定されない

元はVueのドキュメントを表示するためEvan yu wroted

## Netlify

静的コンテンツのホスティングサービス

GitHub Pagesから移行した

## Netlify CMS

静的サイト上でフローを完結出来るNetlify製のコンテンツマネジメントシステム. Netlify上に編集のためのユーザを作成し、CMSのクライアントから認証しGitHubにPull Requestが投げられる. 

サーバランタイムを必用としないのでNetlify上でも動く