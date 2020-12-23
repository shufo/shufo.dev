---
author: shufo
feed:
  enable: true
title: CMSを移行した話
date: 2020-12-22 09:00:00 +0900
tags:
- cms
slug: switched-cms-from-netlify-to-forestry

---
以前PelicanからVuepressに[切り替えた際]()にCMSを[Netlify CMS](https://www.netlifycms.org/)に切り替えていたのだけどいまいち使いづらい

具体的に何が使いづらいかというとNetlify CMSはファイルのdran-and-dropアップロードに対応していない（公式サイトでは対応していると記載されているがこれは**間違い**で実は対応していない。公式がコンテンツマネジメント出来ていない）

また日本語入力がちょいちょいバギーで変換確定前の文字列が消えることがある

これが結構致命的でいちいち編集のたびに画像を手動でリポジトリにアップロードしたり、消えた文字列をCtrl-Zで復活させたりといったことをしていたため地味にストレスになっていた

でさすがに普段使いで使うようなCMSにはきついということで新しいCMSをちょいちょい探していた

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

* [Netlify CMS](https://www.netlifycms.org/)
* [Forestry](https://forestry.io/)

### API Based CMS

* [Contentful](https://www.contentful.com/)

まず何かしらのサーバにCMSを直接ホスティングするServerベースなCMS、皆さんご存知世界一使われているCMSのWordpressはこれに該当する.

次にGitリポジトリベースのCMS. Netlify CMSやForestry等GitHubのリポジトリを読み込み、直接コンテンツをリポジトリ内にcommitすることで記事を管理するCMS.

そして最後にAPIベースなCMSでContentfulを代表とするSaaS側にコンテンツをホスティングするCMSがある. こちらは完全にコンテンツマネジメントとアプリケーションとしての動作を分業する形になる.

それぞれ見てみてもメリデメあるので一概にどれがいいというのはないがそれぞれ適しているユースケースはある

ざっくり言うと少数の静的ページのリポジトリに密結合したコンテンツ等はGitBased CMS, 大量のコンテンツを編集するような場合はAPI Based CMSが適している

Git Based CMSの場合主にPRベースでのマージフローになるがコンテンツが増えるに従いビルド時間も増え迅速なコンテンツの更新といったことは難しい

一方APIベースのCMSはGitベースのCMS程厳密にコンテンツのバージョン管理がされているわけではなくAPI自体の可用性にコンテンツの可用性が左右されるといったことはあるものの、コンテンツ自体を外部でホスティングすることでアプリケーションのビルドと分離出来るのでサイトの構成自体を変えやすい、コンテンツマネージャーがアプリの構成に依存しないといったメリットもある

がっつりコンテンツを生成していきたいならAPI Based CMSの方がいいしこのブログのようにたまに更新程度でほぼ静的ならGit Based CMSで十分ワークする

ということでGit Based CMSを色々試していたのだけど一旦[Forestry.io](https://forestry.io/)に落ち着いた

![](/assets/img/uploads/2020-12-23-forestry.png)

[https://forestry.io/](https://forestry.io/ "https://forestry.io/")

### Pros

* drag and dropでの画像アップロードに対応している

  ![](/assets/img/uploads/2020-12-23-2020-12-24_07-47-47.png)
* Netlify Large Mediaに対応している
  * アップロードした画像はGit LFSで管理されるためリポジトリをバイナリで圧迫しない
* まともなWYSIWYG(+ Markdown)エディタがある 
  * 重要

### Cons

* 直接コンテンツをホスティングするわけではないがSaaSなのでサービスの継続性が少し心配
* Hugo辺りはビルトインでドラフト機能に対応しているが出来ないSSGもある（VuePress等）
  * Netlify CMSのようにEditorial Workflow（ブランチベースでの下書き→公開のワークフロー）がない

軽く使った感じ必用な機能は概ね満たしていて個人利用でならPersonalプラン以上にはいかなそうなのでForestryを使うことにした

Netlify CMSはエディタ以外のワークフローがよく出来ていただけに少し惜しかったのでエディタ周りはContribution出来そうならしてみたい