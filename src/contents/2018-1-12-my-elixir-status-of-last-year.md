---
title: 2017年にElixirを仕事で使った振り返り
datetime: 2018-01-12 00:00
tags: 
  - Elixir
  - programming
permalink: my-elixir-status-of-the-last-year
description: 1年と少しElixirを使った感想など
---

<img src="https://i.imgur.com/fbdsh5x.png">

少し遅くなったけど2017年にElixirを使った振り返りをしてみる。(<s>年末年始ダラダラしてて書くの遅れた</s>
)

以下のElixir環境まとめエントリーに触発されました

- [Elixir のチームでの開発環境について \- Qiita](https://qiita.com/melpon/items/1502c403b7b5f37e325f)
- [エムスリーでの Elixir 開発環境 ver\.2017 \#m3dev \- エムスリーテックブログ](http://www.m3tech.blog/entry/elixir-development-environment-2017)
- [Elixir 開発環境 2017 in ACCESS \- Qiita](https://qiita.com/ndruger/items/f6bd35bb0aede78b827d)

Elixirは2016年ごろから[触っていた](https://qiita.com/shufo/items/9cfb7bfcecd363e0ea86)のだけど2016年後半から2017年は仕事としてもほぼフルタイムで使っていたため、使ってるうちによかった点や辛かった点、開発環境など振り返ってみる。

## よかったところ

### 堅牢性(robustness)

これは本当に頑強でErlang VMが直接的な原因でサーバが落ちたということは本番運用も含めて１年ぐらい稼働させてる中でなかったと思う。可用性nine nines(99.9999999%)はガチ。逆にやることなさすぎて暇になるやつ

### エコシステム

ここ1, 2年で大分充実した。Hex.pmに登録されているパッケージの数は[2016年2月の段階で1455個](https://medium.com/@cameronp/is-the-elixir-ecosystem-mature-enough-for-production-apps-79fbf9f2df31)だったのが2018年1月現在**5702**個になった。約1年10ヶ月で約380%の増加。以前は主要なWebサービスでもAPIクライアントがないというようなこともあったけど最近はほぼないんじゃないんだろうか。

また[Phoenix 1.3](http://phoenixframework.org/blog/phoenix-1-3-0-released)がリリースされた. [ディレクトリ構造が変わったりContextという概念の導入](https://qiita.com/shufo/items/f0c85a100728a39dde13)などもあり若干脱Railsっぽくなってきている。既存のディレクトリ構造のままアップデートも可能なのでそのままアップデートして新しい機能を使うもよし、Phoenix 1.3 styleで始めるもよし。

以前言われていたほどパッケージが少ない問題はなくなってきていると思うのでそこが懸念点になる場合も今はあまりないと思う。

### コミュニティ

ここ1年半ほどでゆるやかに成長してきた。

以下のグラフはRedditの言語別subredditのsubscriber数の統計だが、恐らく同じようなパラダイムで領域もそこそこ被ってると思われるClojureやScalaと比較して後発ながら伸び率も悪くない。

![Imgur](https://i.imgur.com/8cEXJbn.png)

急に人口が増えたら増えたでバックグラウンドの違うステークホルダーが増えてコミュニティが混乱する気がするのでこのぐらいの伸び率でちょうどいいと思う。


### 生産性

最初はElixirを部分的に使って管理系の画面はPHPなどで作ろうかと考えていたけどPhoenixの生産性がほぼ他のFWと変わらなかったので結局管理系も含めて全てElixirで作っているぐらいには問題ない

### 楽しい

Elixirはたのしい（語彙力）

## つらかったところ

逆に使っているうちにつらかった点など

### コンパイル時間


通常Elixirはコンパイル時に変更のあったファイルのみ再コンパイルされるのだけど、変更のあったファイル以外にも依存のあるファイルが再コンパイルされる。小さなライブラリレベルでは問題ないのだけどPhoenixを利用したWeb系の開発ではファイル数も多くなってきてコンパイル時間が大きくなるのが地味に効いてくる。

ちなみに再コンパイルの基準は`compile-time dependency`が存在するかどうかで決まる。

例えば

- `import`, `require` を使用したとき
- Structを使用したとき

に`compile-time dependency`が追加され再コンパイル対象が増える。

Elixir 1.6で`mix xref graph --format stats`でcompile-time dependencyの多いファイルを[確認出来るようになる](https://github.com/elixir-lang/elixir/releases/tag/v1.6.0-rc.0)のでCIなどでチェックしてあげるといいと思います

参照: [Understanding Elixir's recompilation](
http://milhouseonsoftware.com/2016/08/11/understanding-elixir-recompilation/)

### 他の言語を使った時

デメリットというかパターンマッチングがないと辛くなるようになってしまった(?)

## 開発環境

### コーディング規約

[Elixir 1.6のcode formatter](https://qiita.com/shufo/items/f5e3ccd4892288449ff9)を使っている。1.6.0-devの開発版に既に入っていたのでローカルとCIでのチェック用に1.6.0正式版に先行して導入したけど最高だったのでみんな使いましょう。コードレビューでコーディング規約に関する指摘をしなくてよくなるだけで大分脳の負荷が違います。

### テスト

特に特別なことはしてないけどExUnitと[hound](https://github.com/HashNuke/hound)でE2Eテストをしている

PhantomJSをバックエンドにE2Eテストしているけど挙動が微妙にブラウザと違ったりdeprecatedになっているのでそろそろHeadless Chromeに置き換えたい

カバレッジは取ってないけど体感大体8割くらいはテスト書いてる

### デプロイ

ローカル: docker + docker-compose

本番: ECS + Distributed Erlang

たぶんElixirで一番悩むところがデプロイだと思うけど、[開発/本番一致](https://12factor.net/ja/dev-prod-parity)の原則のためDockerでデプロイしている。[ベースイメージ](https://github.com/shufo/docker-phoenix)はpublicでDockerHubに公開しローカルと本番で共通のベースイメージを使っている。

CIはCircleCIでテスト、コンパイル、docker imageの作成とプライベートなDockerHubのリポジトリへのpush、ECSのタスク更新を行う。

ちなみに[Distillery](https://github.com/bitwalker/distillery)は使っていない。Dockerを使っている以上リリースのたびにプロセスが再起動されるので長期間に渡って起動されるようなプロセスもなくremote consoleを使ってプロセスのstateまで閲覧してデバッグしないといけないような状況も発生しづらくメリットも薄いと考えたからだ。OTP releaseは使わずコンパイル済みのソースを含めたイメージ内で`mix`でサーバを起動している。今のところ起動中のプロセスのstateまで確認しないと分からないようなエッジケースには出会ったことはないが、そのようなケースになった時はremote console用にOTP releaseにしてみたい。


あとしばらくPhoenixのChannelのPubSubのアダプターとしてRedisを使っていたが無駄に単一障害点や管理ポイントを増やしたくないので分散Erlangクラスタを組んで[PG2](https://hexdocs.pm/phoenix_pubsub/Phoenix.PubSub.PG2.html)をアダプターとして使っている。RedisをPubSubサーバとして使っていた頃は少しレイテンシがあったりRedisサーバの負荷によってはPubSubが不安定になったりしたけどPG2にしてからは全くそういうのがなくなった。

余計な不確実性を持ち込まないという意味でも言語のランタイムレベルで問題を解決出来るというのは精神衛生的にも良い。

コンテナ起動時にどのようにしてコンテナ内のプロセスをDistributed Erlang(Elixir)クラスタに参加させるかについては、`ERL_AFLAGS`でVM間通信に使うポートを固定しコンテナ起動時のポートマッピングで固定したポートへのudp, tcpパケットを通している

```bash
ERL_AFLAGS="-name app@$ERL_HOST \
  -setcookie $ERL_COOKIE \
  -kernel inet_dist_listen_min 4370 \
          inet_dist_listen_max 4370"
```

以下はECS task definition。`4369`はepmdが固定で使うポートで`4370`はepmdが動的に割り当てるポートを固定で指定したもの。

```json
〜中略〜
"portMappings": [
	{
		"containerPort": 4369,
		"hostPort": 4369,
		"protocol": "tcp"
	},
	{
		"containerPort": 4369,
		"hostPort": 4369,
		"protocol": "udp"
	},
	{
		"containerPort": 4370,
		"hostPort": 4370,
		"protocol": "tcp"
	},
	{
		"containerPort": 4370,
		"hostPort": 4370,
		"protocol": "udp"
	}
]
〜中略〜
```

サービスディスカバリは[peerage](https://github.com/mrluc/peerage)でカスタムのディスカバリを作成しredisにexpire付きでEC2のmetadataから取得した自身のホストの(コンテナではない)プライベートIPアドレスを保存して定期的にホストの一覧を走査して取得している。

なぜこうしているかというとEC2上ではmulticast udpが基本使えず（[Weave](https://www.weave.works)などでoverlay networkを構築する方法もあるがオーバーヘッドが大きい）またgossipプロトコルを使うにもdockerコンテナのnetwork modeをhostにしなければならない→`network=host`にするとlinkオプションが使えない→分離したnginxコンテナからlink出来ないという状態になるので、半自動的なクラスタリングはせずに地道にサービス一覧を取得し、それぞれのホストに対して定期的に`Node.connetct/1`するようなディスカバリを書いている

long-running processを作れたりHot Upgrade出来るところがBEAMの強みでもあるけどdockerを使うことでデプロイの度にコンテナは破棄されるのでその利点は失われることは覚悟しないといけない。とはいえ実際にその機能は切り札のようなものでHot Upgrade自体のテストやロールバック等も考えると大半の場合は無停止でのアップグレードなどはインフラを含めたアプリケーション全体のアーキテクチャで吸収した方がいいとは思うのでElixirは基本コンテナの起動・停止で影響の出るようなステートを保持しない方針でdockerでワンバイナリのように扱っている。

## 作ったパッケージ

分量が少ないので1年程使う中でお仕事的に必要になったり個人的な興味で作ったパッケージが[10個](https://hex.pm/users/shufo)に達したので感想など


### [cdn](https://github.com/shufo/cdn)

Elixirで初めて作成したパッケージ。

Laravelの[cdn](https://github.com/Vinelab/cdn)というパッケージをportした。
S3に特定のディレクトリ（`priv/assets`とか）を更新時や差分等を考慮してアップロード出来る。またCloudFrontから配布するためのパスを生成出来る 例: `cdn(static_path(conn, "/css/main.css"))`

![](https://raw.githubusercontent.com/wiki/shufo/cdn/img/upload.gif)

- [Hex.pmへのパッケージの公開の仕方](https://qiita.com/ma2ge/items/0e19bf3f03078f589096)を学ぶ
- [doctest](http://elixir-lang.github.io/getting-started/mix-otp/docs-tests-and-with.html)便利

### [plug_rate_limit_redis](https://github.com/shufo/plug_rate_limit_redis)

rate limitをredisをデータストアに[plug](https://github.com/elixir-plug/plug)で実現するパッケージ

#### Usage

```elixir
defmodule MyApp do

  plug RateLimit, interval_seconds: 60, max_requests: 30

  def index(conn, _params) do
	conn
	|> render(:index)
  end
end
```

- 自作plugの作り方を学ぶ

### [payjp](https://github.com/shufo/payjp-elixir)

[PAY.JP](https://pay.jp/)のAPIクライアント。公式のクライアントライブラリがなかったので作成。
[Stripe](https://github.com/code-corps/stripity_stripe)のクライアントを参考にした。

#### Usage

```elixir
customer = [
  email: "test@test.com",
  description: "An Elixir Test Account",
  metadata: [
    app_attr1: "xyz"
  ],
  card: [
    number: "4242424242424242",
    exp_month: 01,
    exp_year: 2020,
    cvc: 123,
    name: "Joe Test User"
  ]
]

Payjp.Customers.create(customer)
```

- APIクライアントの作り方を学ぶ
- 外部APIのテストには[ExVCR](https://github.com/parroty/exvcr)を使うとリクエストを再現して実際叩かないようにしてくれるので便利

### [paidy](https://github.com/shufo/paidy-elixir)

[Paidy](https://paidy.com/)のAPIクライアント。同じく公式にクライアントライブラリがなかったので作成。

### [ex_line_pay](https://github.com/shufo/ex_line_pay)

[LINE PAY](https://line.me/en/pay)のAPIクライアント。同じく類似パッケージが(ry

APIクライアントは一度ベースを作るとあとはエンドポイントとモジュールをちょっと調整すれば大体似通った作りになるので楽ですね。

### [fcmex](https://github.com/shufo/fcmex)

[FCM](https://firebase.google.com/docs/cloud-messaging/)(Firebase Cloud Messaging)のAPIクライアント

FCM側にRate Limitがあり1リクエストあたり1000件までしかデバイスTokenを送信出来ないのと、短時間で大量のプッシュ通知を送信出来るように[Flow](https://hexdocs.pm/flow)で流量を考慮しつつ並列度、CPU効率を考えて送信出来るようにした。

### [activity_log](https://github.com/shufo/activity_log)

ロギング周りの実装で[Activity Streams](https://www.w3.org/TR/activitystreams-core/)風のスキーマを定義したくてDSLが欲しくなったのでmacroで実装。
EctoのSchema風にしたかったのでEctoを参考にしたりした。

#### Usage

```elixir
# スキーマ定義
defmodule MyApp.Activity.Article do
  use ActivityLog

  activity "create" do
    actor  :user
    object :article
  end

  def name(actor, object), do: "#{actor.name} created #{object.name}"
end

# ログ出力
iex> alias MyApp.Activity.Article
iex> activity = %Article{actor: %Article.Actor{id: 1, name: "foo"}, object: %Article.Object{id: 1, name: "My article"}}
iex> ActivityLog.add(activity)
# outputs
05:29:32.128 [info]  {"type":"create","target":null,"object":{"type":"article","name":"My article","id":1},"name":"foo createed My article","actor":{"type":"user","name":"foo","id":1},"@timestamp":"2017-10-15T20:29:32.128192Z","@context":"https://github.com/shufo/activity_log"}
:ok
```

- Macroの強力さと諸刃の剣さを理解
- でもやっぱDSL便利

### [plug_cache](https://github.com/shufo/plug_cache)

特定のリクエストパスに対するレスポンスをキャッシュするplug。
ETSでインメモリでキャッシュを保存するからキャッシュサーバ等は不要。分散Erlangクラスタを組んでいる場合は分散キャッシュを使ってクラスタ全体で一意なキャッシュのinvalidationなども出来る。

#### Usage

```elixir
defmodule MyApp.PageController do

  plug PlugCache, ttl: 86400 when action in [:index]

  def index(conn, _params) do
    conn
    |> render(:index)
  end
end
```

- ETS便利

### [plug_maintenance](https://github.com/shufo/plug_maintenance)

メンテナンス状態を取得して`503 Service Not Available`のHTTP Statusを返すplug

### [plug_robots](https://github.com/shufo/plug_robots)

robots.txtを平文で返すplug。作った理由忘れたけどたぶんrobots.txtをapplicationサーバから返したいみたいな感じだったと思う

と、こんな感じで微力ながらElixirコミュニティに何らかのContributionが出来ればと思ったのと必要性にかられて何個か作成したけど、やっぱり言語を学習するのになんらかのパッケージを作るのは一番の近道だなと。

## お世話になってるパッケージ

普段お世話になってるパッケージ

### [ecto](https://github.com/elixir-ecto/ecto)

- みんな大好き. [Composed Query](https://blog.drewolson.org/composable-queries-ecto/)として書くと再利用性も高くシンプルな書き方が出来るのがすき。

### [ja_serializer](https://github.com/vt-elixir/ja_serializer)

- [JSON-API](http://jsonapi.org/)形式でAPIレスポンスを返すため

### [hound](https://github.com/HashNuke/hound)

- E2Eでのテストをするため。PhantomJSをバックエンドとして使っていたけどdeprecatedになってしまったのでそろそろHeadless Chromeに移行したい

### [ex_machina](https://github.com/thoughtbot/ex_machina)

- テストデータのFactoryに

### [canary](https://github.com/cpjk/canary)

- Authorizationに

### [sentry](https://github.com/getsentry/sentry-elixir)

- [Sentry](https://sentry.io/welcome/)公式でElixirのクライアントライブラリが提供されているのでエラートラッカーはこれを使っている

### [benchee](https://github.com/PragTob/benchee)

- 実装に困ったらマイクロベンチマークで適宜ベンチマークを測って指標にする

### [phoenix_swagger](https://github.com/xerions/phoenix_swagger)

- [Swagger](https://swagger.io/)形式でAPIドキュメントを出力するため。そろそろOpenAPI 3.0仕様に準拠したい

### [logster](https://github.com/navinpeiris/logster)

- アクセスログをワンライナーでJSONで出力出来る
- アクセスログをCloudwatch LogsからKinesis, S3, Athenaなどに送り込むため最初からJSON形式でログを出力したかったのでこれを使っている
- ちなみにJSON形式でログを出力するとCloudWatch Logsのフィルタで`{ $.type = 'foo' }`のような形で検索ワードを指定出来て便利

### [scrivener](https://github.com/drewolson/scrivener)

- ページングライブラリ。最初自前でページャなどを書いたけど辛かったので早く知りたかった

## まとめ

最初は社内で自分一人だけだったElixir開発者も、実績がたまったおかげで他プロジェクトでも使われるようになって社内で5人ほど使うようになったり、周りで使われている会社も増えてきたりでなんだかんだゆるやかな成長を感じる。

少し前はミーハーでHypeな感じもあったけど最近は落ち着いて実際使う人は粛々と使ってる感じで個人的には居心地がいいです。

