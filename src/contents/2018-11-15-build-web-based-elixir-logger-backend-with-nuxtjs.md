---
title: Nuxt.js で作る Web ベースの Elixir Logger バックエンド
datetime: 2018-11-15
slug: build-web-based-elixir-logger-backend-with-nuxtjs
tags:
  - Elixir
  - Nuxt.js
permalink: build-web-based-elixir-logger-backend-with-nuxtjs
description: Nuxt.js で Web ベースの SPA な Elixir の Logger バックエンドを作った
---

<img src="https://i.imgur.com/WPAhlCS.png">

Nuxt.js で Web ベースの SPA な Elixir の Logger バックエンドを作った

GitHub: [Log Viewer](https://github.com/shufo/log_viewer)

![WPAhlCS - Imgur.png](https://qiita-image-store.s3.amazonaws.com/0/47983/671695d3-0a82-b11d-76a3-c2061856e9b2.png)

使用した技術としては [Nuxt.js](https://nuxtjs.org/), Websocket, Cowboy, Logger, [Vuetify.js](https://vuetifyjs.com/ja/), [Chart.js](https://www.chartjs.org/) など

簡単に説明するとこの Logger backend は Web 上に リアルタイムに Elixir のログを表示してくれる

なぜ Web にログを表示したいのか？という疑問ももっともだがまずそういうライブラリがなかったから作ったという以上の理由は今のところ正直特に無い。無ければ作る！それまでの話よ！（格言）

機能としては

- **検索ワード ＆ Log レベルでログのフィルタリング**
- **メタデータの表示によりログを仕込んだ場所や他 PID などのメタ情報の確認**
- **Syntax Highlighted されたログ**

などがある

![Imgur](https://i.imgur.com/0qj93i4.gif)

利用用途としては主にローカルでのログの確認やリモートの開発環境のログ確認だが、やろうと思えばちょっとした本番環境のログの確認も出来るだろう。
ただし Web ベースのためそれなりにリアルタイムでのレンダリングは重くなってしまうため、ログ流量の多い環境での利用はおすすめしない。
またこのライブラリに認証の仕組み自体はないためリモート環境で使用する際は別途 [guardian](https://github.com/ueberauth/guardian), [ueberauth](https://github.com/ueberauth/ueberauth) などでルートに認証をかけることが必要になるだろう。

以降ではこのライブラリを作る際に使った技術などについて所感やなぜそれを使ったかなどについて触れてみる

### Nuxt.js

Nuxt.js は今回初めて使ったが開発体験としてはとてもよかった

まず使ってすぐ分かるメリットとしては

- 小中規模 Vue.js のベストプラクティス構成
- 設計で迷いが出にくい
- ドキュメントがしっかり書かれている
- サブモジュールがオプトイン

というようなところがある。

Vue.js は最小でペラ一の HTML に埋め込むことも、 SPA + SSR でサイト全体を構成するようなそれなりの規模の構成も可能なため設計の自由度は高いのだがその分強制力がなく、自由に設計すると一貫性のないコードになってしまうという問題があった。
そこで Nuxt が Vue.js のフレームワークとして規約を提供してくれたおかげで統一された設計のもとプロジェクトをスケールすることが出来るようになった

正直そこまで規模が大きくなければプレーン Vue.js でも問題ないとはいえるが、これは後付けになるがそれでもなぜ Nuxt がよかったのかというと、Vuex や Vue-router が**オプトイン**として組み込まれていることが大きかった。

自分は最初この SPA のアプリを作った際まず Vuex や Vue-router の使い方を知らなかった。
が、特に問題なく状態管理が必要になれるレベルまで作りこめていけたのは Vuex などがあくまでオプトインで必要に応じて使えるようになっていたからであり、Vuex に関する**ドメイン知識を必要としなかった**ためである。

まず PoC をする段階で Vuex の使用が必須であれば挫折したかもしれないが、PoC の段階では状態を全て直接.vue ファイルに保持していた。
そのおかげで Vuex に状態を dispatch せずに PoC に集中することが出来た。

その上で理論的に全て動作することが確証出来た段階で改めて状態ストアの Vuex で状態を一元的に Immutable に管理することでアプリを堅牢化することが出来た。

この小さく作って育てるという流れはまさに Vue.js 作者の Evan You が提唱するところの [**Progressive Framework**](https://qiita.com/mikakane/items/3bd6af69259f5af6fecb) でありオーナーの異なる Nuxt.js でも Progressive Framework の思想が実現されていることに Evan You のコミュニティ運営の手腕を見た気がする。

Vue.js エコシステムが優れているのはエコシステム全体で Evan You の思想を実現するようサポートされていることであり、こういったエコシステムは React とはまた少し違う文化でどちらかというと PHP 的な文化であると個人的には思った。

PHP は元々プログラミング言語としてというよりは単なるスクリプトとして生まれ、HTML の中に直接埋め込めるという形になり、更にオブジェクト指向が強化され現在の形に至るが、そういった最初からビッグバンで完璧な秩序が出来上がるというよりかは時代とそのニーズに合わせて言語自体が成長するという歴史に Progressive Framework である Vue.js と近いものを感じる。

Vue.js もテンプレート言語のように最初は一枚の .vue ファイルの中にスクリプト、テンプレート、スタイルを定義してスコープを完結することが出来る。当然最初のうちはこれで問題がなくてもプロジェクトが成長するにつれて状態を一元的に管理するストアが欲しくなり、再利用可能な部品でコンポーネント化が進むが、この過程が PHP の歴史との親和性を感じた。

Laravel が Vue.js を[採用している](https://github.com/laravel/laravel/blob/de1f472d767236713870e424a87bcf2ab4ca80cf/package.json#L20)のも偶然ではないかもしれない。

### Custom Logger backend and Websocket (Cowboy)

Elixir は標準で`Logger`というロギング用のモジュールがあり、これにカスタムのロギングモジュールを提供することで`Logger.info("foo")`などでログを出す際、任意の処理を hook することが出来る

そこで今回は Web にログを出力するために Websocket 経由でログを送信するカスタムの Logger backend を[作成した](https://github.com/shufo/log_viewer/blob/master/lib/log_viewer/logger.ex)。
仕組みとしてはページを表示したクライアントへサーバより Websocket 経由でログを送るという簡単なものだ。

なぜ Websocket 経由にしたかというと、ログファイルを直接読み取る方法もあるが、近年のソフトウェア開発環境ではコンテナベースで開発することも多くログは標準出力に出力するだけでファイルとして状態を保持しないことも多いため、ブラウザを持つクライアントならどこからでも表示可能にするためこの方法にした。

Websocket の実装には[Cowboy](https://github.com/ninenines/cowboy)のビルトイン Websocket サーバを使用。

詳しい実装方法については以下に記事を書いた。

参照: [Elixir で Phoenix を使わずに Websocket サーバの実装 \- Qiita](https://qiita.com/shufo/items/6ad1c2d51bca5a2e5f49)

### Vuetify, Chart.js

UI については当初 bootstrap を検討していたが、[awesome-nuxt](https://github.com/nuxt-community/awesome-nuxt)を眺めていたところ、Official プロジェクトの中に [Vuetify](https://vuetifyjs.com/ja/) を発見し、Material デザインが可能ということで検討リストに加えてみた。[Bulma](https://github.com/jgthms/bulma) も検討していたがこの中では Vuetify がもっともアプリらしいアプリのデザインになることと、どちらかというと融通の効く bootstrap や Bulma のスタイルを使うよりかはユーザ知識の再利用が可能な Material デザインの方が機能性を求められるログビューワとしての UX としては優れているだろうという判断で Vuetify にした。

結果としては Material デザインなのでほぼスタイルのカスタムの余地はなくブロックの組み合わせでアプリを構築していく形になるのだが、既にユーザが Google 周りのサービスを使う上で学習した知識を再利用出来るので操作に迷うということは少なくなったかと思う。

逆にオリジナルのスタイルを適用したいとなるとマテリアルデザインの思想からは外れるので別の方法を検討した方がいいかもしれないが、管理画面やコンソールなど機能性を求められる箇所に関してはとても用途に合ってると思う。

プラス α 要素で Chart.js でログの量をリアルタイムにチャートに反映させるということもやってみたが、Vue.js のコンポーネントシステムがよく出来ているため、グラフに関する状態をコンポーネント内に分離した上で安全に扱えた。

## まとめ

それぞれ利用した技術について簡単に触れてみた。
Vue.js は以前から軽く触れていたため今回 Nuxt は正直評価してみたい半分で使ってみたが結果としては収穫があってよかった。

最初からその技術を目的として調査すると挫折しやすいけどライブラリ開発ドリブンで必要性に応じて理解を深めるのが学習の最短の手順だなと改めて思った。

## 環境

今回使用した環境は以下の通り

- Elixir 1.7
- Vue.js 2.5.17
- Nuxt.js 2.2.0

## Links

- [GitHub](https://github.com/shufo/log_viewer)
