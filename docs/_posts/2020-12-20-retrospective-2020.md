---
author: shufo
title: 2020年に作ったソフトウェア / 触った環境振り返り
date: 2020-12-20T00:00:00.000+09:00
tags:
- tools
- programming
slug: retrospective-2020
feed:
  enable: true

---
以下の記事に触発された

[2020年に作ったソフトウェアや開発技術をふりかえる](https://laiso.hatenablog.com/entry/everyday-coding-2020)

今年は仕事内容としては大きく変わることはなかったけど、業務や趣味ではちょいちょい新しいの触ったり素振りしたりはしたのでその振り返り

[GitHub GraphQL Exploler](https://docs.github.com/en/free-pro-team@latest/graphql/overview/explorer) からリポジトリの作成順でソートして今年のリポジトリに絞り込んで何やってたか思い出してみる（大体その時期興味あったリポジトリが作られてるような気がするので）

```graphql
{
  user(login: "shufo") {
    repositories(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
      nodes {
        createdAt
        name
      }
    }
  }
}
```

![](/assets/img/uploads/clipboard_2020-12-17-03-46-01.png)

### GitHub Action

* GitHub Actionを業務個人利用含め使う機会が割と多くなった
  * 個人利用でのCIはほぼGitHub Actionのみになった
  * 静的解析、細々としたタスクあたりを業務で使うことも多くなった
    * 他のWorkflowを真似したい場合 `.github`ディレクトリをコピるだけでほぼ以上完了するのがすき
    * dependabotもGitHubに集約されGitHubのCIへの力の入れ方が伺える

以下作ったアクション

* [auto-assign-reviewer-by-assignee](https://github.com/shufo/auto-assign-reviewer-by-assignee)
  * レビュワーをアサイニーによって自動的に割り当てるやつ![](/assets/img/uploads/clipboard_2020-12-19-19-05-57.png)
* [auto-assign-reviewer-by-issuer](https://github.com/shufo/auto-assign-reviewer-by-issuer)
  * レビュワーをPR作成者によって自動的に割り当てるやつ

![](/assets/img/uploads/clipboard_2020-12-19-19-12-27.png)

* [auto-assign-reviewer-by-files](https://github.com/shufo/auto-assign-reviewer-by-files)
  * レビュワーをファイル名のパターンによって自動的に割り当てるやつ

![](/assets/img/uploads/clipboard_2020-12-19-19-11-19.png)

GitHubアクションはペライチスクリプトでもコンテナで動かすことが出来てホスティングもGitHubで完結出来るので開発の敷居が低いのがよい

### ECS Fargate運用

* [ecs-fargate-oneshot](https://github.com/shufo/ecs-fargate-oneshot)

![](/assets/img/uploads/clipboard_2020-12-19-19-16-28.png)

ECS Fargate運用する中で雑にoneshot(一回切り)でコンテナでコマンド叩きたいな〜みたいな場面が多かったのでoneshotで叩けるやつ作った
クラスター, Service, Taskと実行したいコマンドを渡すと最新の定義からいい感じにｽｯとコマンドを実行してログを出してくれる

既存のoneshot系は機能が多すぎてよく分からなかったのとコマンド自体がリソースを作成してAWSリソースのstateを変えるような望まない挙動が多かったので

Cluster, Service, task definitionが既に定義されてること前提なので既にIaCで管理されてるコードベースでも運用後に追加しやすいと思う

### VSCode Extension

* [vscode-blade-formatter](https://marketplace.visualstudio.com/items?itemName=shufo.vscode-blade-formatter)

![](/assets/img/uploads/screencast.gif)

去年作った[blade-formatter](https://github.com/shufo/blade-formatter) (bladeファイルのopinionatedなformatter)をVSCode Extensionに移植した インターフェースがCLI -> VSCodeになってユーザ増えたことでいいフィードバック雑なフィードバック含めフィードバックが増えた.

npmで何か作ってる人はVSCode ExntensionでWrapするとフィードバックには困らないかもしれない

### Lambda Function

* [lambda-pdf-generator](https://github.com/shufo/lambda-pdf-generator)
  * [lambda-cjk-font-layer](https://github.com/shufo/lambda-cjk-font-layer) 日本語対応用レイヤ

パラメータとしてHTMLを渡すとPDFを出力するLambda Functionを作った

![](/assets/img/uploads/2020-12-19-lambda-pdf-generator.png)

e.g.

```bash
$ echo '{"data": "<html><body><p style=\"color: red\">Hello World</p></body></html>"}' > payload.json
$ aws lambda invoke \
 --function-name lambda-pdf-generator \
 --invocation-type RequestResponse \
 --payload file://payload.json --cli-binary-format raw-in-base64-out response.json

 $ cat response.json | jq -r .data | base64 -d > example.pdf
 $ open example.pdf
```

![](/assets/img/uploads/2020-12-19-2020-12-20_00-18-52.png)

Lambda上のHeadless Chrome経由で出力しているためChrome PDF印刷互換のPDFが生成される

PDFをお仕事でごにょごにょしたいやつが出てきて（これ定期的に発生するな）最初昔のごとく各言語ネイティブなPDF出力系のバイディングを探していたのだけど、ChromeのPDF印刷なら楽じゃんということでLambdaベースでChrome動かないか探したら[あったので](https://github.com/alixaxel/chrome-aws-lambda)なんか出来た. HTML/CSSベースなので各言語のPDF出力系ライブラリよりずっと楽にスタイリング出来てまともなレンダリングのPDFが出力出来る. 楽すぎて各言語のバインディングで謎のセマンティクスを理解してPDFをゴリゴリいじってたのがあほらしくなる.

ChromeのバージョンによってPDF出力に改善が加えられてたりする（CSSの縦/横のportraitを認識したり）ので開発用ChromeとLambdaのChromeのバージョンを揃えないハマる（1敗）

### サーバレス運用

* [lambda-query](https://github.com/shufo/lambda-query)

![](/assets/img/uploads/2020-12-19-lambda-query.png)

サーバレスでRDSにクエリ投げるためのCLI & Lambda Functionのセットを作った

以下の要領で[Aurora Serverless Data API](https://dev.classmethod.jp/articles/aurora_serverless_now_supportsdataapi/)のようにサーバレスでRDSにクエリ出来る

    $ lambda-query -f lambda_function -q "select * from users" --format table

RDS前提だけどIAMさえ持ってればクエリを投げられるようにしたくて作った

Aurora ServerlessはCold Startがあるので許容出来ずRDSでやっているけどサーバレスにクエリしたいよという場合は便利かもしれない

作った結果踏み台サーバのようなものを作ってOS更新がパスワードがユーザ/Groupが許可されたコマンドが云々みたいなやつがなくなって楽になった

直近の[AWS CloudShell](https://aws.amazon.com/jp/cloudshell/)やAWS SSMなどもあるけど基本的にサーバ管理も直接サーバに入ったりローカルに依存するということも今後必用になる場はやはり少なくなって行くと思う。人間の認知限界がある以上[Zero Touch Production](https://www.usenix.org/conference/srecon19emea/presentation/czapinski)のプラクティスは基本的にベストプラクティスということにはこれからも変わらない。ただ抽象化されるわけではなく、**直接触らない** ことが重要でObservabilityは確保した上での全てトレース可能になるようにし、API経由の構成でトレーサビリティを確保することに関心が向かっていくと思う.

AWS CloudShellもその文脈の話でWebコンソールでゼロコンフィグでAWS CLIを触れるというのが重要.　実際は裏にインスタンスが立っているわけだけど直接触れないということが重要.

### Vercel

* [online-blade-formatter](https://github.com/shufo/online-blade-formatter)

  ![](/assets/img/uploads/2020-12-19-2020-12-19_23-44-22.png)

[Vercel](https://vercel.com/)素振りしたくて[blade-formatter](https://github.com/shufo/blade-formatter)をオンラインに移植した

* 色々制限はあるもののVercelに最適化したものを作れれば強そうだなという感覚はある. ただ最適化が強すぎて一連託生感はあるので気軽に移るみたいなことをしづらくなりそう
  * 実際実用レベルで使うためにはVercelはプラットフォームをもう少しオープンにしてほしいけどNext.jsと一体になった強い最適化が強みでもあるのでVercel選ぶのなら最初から一蓮托生覚悟で行った方がいいかもしれない

### GraphQL

* 実運用に投入するレベルではないけどちょいちょい触ってる
* RESTの代替云々みたいな話はどうでもよくクエリを定義するタイミングをクライアント実装時まで遅延させる遅延束縛みたいな開発スタイルも出来る点がすき
* 要は開発スタイルに選択肢が生まれるということが重要でその点ではRESTと競合するものでもないので比較対象としては違うと思ってる
  * スモールチーム（モバイル開発や個人開発等）で最大の生産性を発揮するんだろうなというのは分かるけどでかくなった時のスキーマ, Resolverのメンテナンスがいまいち想像つかない
    * GraphQLスキーマ, リゾルバ実装 / バックエンド実装 -> テスト実装といった形になると思うけどGraphQLレイヤーの分の負担がスケールしたときにどこまででかくなるかということに興味がある
    * 要は責任分界点はどこになるかということだけどエンドトゥーエンドのテスタビリティの確保をどうするかというところも気にある
* AppSync/Amplify辺りも触ってみてなるほどなという感じ
  * AmplifyもGraphQLだけ扱えるというわけでなくRESTもサポートしている
  * サービス説明にモバイル開発者/フロントエンド開発者向けみたいな文言が入っていたのでバックエンド抽象化しすぎてる系のいつものAWSサービスかと思ってたけど割と筋は悪くない（Amplifyは抽象化しすぎてるので個別のコンポーネント理解してないときつくなりそうだけど）

### HP更新

Pelicanから[VuePressに移行した]()

JSスタックなのでプラグインを作ったりするのが楽になったのはよかった

* [vuepress-plugin-loading-overlay](https://github.com/shufo/vuepress-plugin-loading-overlay) を作ったりした

![](/assets/img/uploads/2020-12-19-101765431-a2bba500-3b24-11eb-97d6-af71636890b1.gif)

### Laravel

* ちょい大きめのお仕事だとちょいちょい触る
* 複数人でやる場合はなんだかんだやっぱフルスタックなRailsライクな方法論がハマりどころが少ないというのはある
  * いい意味で枯れてる方法論なので枯れた方法論が必用になる限りは廃れることはないとは思う
  * プロトタイピングの段階やPoCの段階でPDCAを高速で回すのにサーバレスやクライアントViewを中心とした開発が楽というのは分かるけどスケールした時の方法論はまだMatureな感じがしない
    * というか毎回サーバレスやる度に何かしらトラップにハマってる気がする…（サーバレス力が足りない）
  * 結局アプリケーションのメインのStateを中央集権的に管理するか非中央集権的に管理するかの違いな気がするけど非中央集権はそれぞれの境界が明確でありつつ協調して働く自己完結的なMatureな構造を求められる…
    * サーバレスの謳い文句でよく言われるワンタッチでデプロイとかフルマネージドで無限にスケールとかは隠蔽されている問題を解決したわけではないので、そのインピーダンスミスマッチがサーバレスで難しいところなのかなと思う

## まとめ

* 相変わらず小さめの身の回りのやつ作ってる
  * 基本自分が困っているものの改善のために作っているのでコンパクトになりがち
* 問題のターゲットを広げたサイドプロジェクトを作るのが課題
  * いまいち致命的な課題感を感じてないのが原因かもしれない
  * とりあえず来年は課題感を感じるようなサイドプロジェクト探しでもしたい