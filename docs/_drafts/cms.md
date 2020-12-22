---
author: shufo
feed:
  enable: true
title: CMSを移行した話
date: 2020-12-22 09:00:00 +0900
tags: []
slug: switched-cms-from-netlify-to-forestry

---
以前PelicanからVuepressに[切り替えた際]()にCMSを[Netlify CMS](https://www.netlifycms.org/)に切り替えていたのだけどいまいち使いづらい

具体的に何が使いづらいかというとNetlify CMSはファイルのdran-and-dropアップロードに対応していない（公式サイトでは対応していると記載されているがこれは**間違い**で実は対応していない。公式がコンテンツマネジメント出来ていない）

また日本語入力がちょいちょいバギーで変換確定前の文字列が消えることがある

これが結構致命的でいちいち編集のたびに画像を手動でリポジトリにアップロードしたり、消えた文字列をCtrl-Zで復活させたりといったことをしていたため地味にストレスになっていた

商用のCMSでは当たり前のような振る舞いでもやはり出来ないとストレスになるんだなぁと実感した

でさすがにきついということで新しいCMSをちょいちょい探していた

要件としては

* VuepressをSSGとして使っているため基本的に静的ページの編集が出来ること
* ブラウザ上で編集が完結すること
  * ファイルアップロードがブラウザ上から行えること

あたりで出来ればPersonalな用途なのでFreeプランの範囲で収まる物ぐらいの範囲で調べていた

軽く探して思ったけど最近はCMSにも色々あり、Wordpressだけの時代とは大分異なるCMS大航海時代となっていたので一旦整理したい

まず2020年現状のCMSの分類を整理すると大きく分けて以下のようになる

### Server Based CMS

* Wordpress
* drupal, etc...

### Git Based CMS

* Netlify CMS
* Forestry

### API Based CMS

* Contentful

まず何かしらのサーバにCMSを直接ホスティングするServerベースなCMS、皆さんご存知世界一使われているCMSのWordpressはこれに該当する.

次にGitリポジトリベースのCMS. Netlify CMSやForestry等GitHubのリポジトリを読み込み、直接コンテンツをリポジトリ内にcommitすることで記事を管理するCMS.

そして最後にAPIベースなCMSでContentfulを代表とするSaaS側にコンテンツをホスティングするCMSがある. こちらは完全にコンテンツマネジメントとアプリケーションとしての動作を分業する形になる. 

それぞれ見てみてもメリデメあるので一概にどれがいいというのはないがそれぞれ適しているユースケースはある