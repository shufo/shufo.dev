---
title: vscode-blade-formatter hits 2000 GitHub Stars
author: shufo
datetime: 2022-11-23T00:00:00+09:00
featured: true
draft: false
tags:
- tools
- vscode
slug: vscode-blade-formatter-hits-2000-github-stars

---
以前からちょくちょく開発している [vscode-blade-formatter](https://github.com/shufo/vscode-blade-formatter) が 2000 GitHub Star に到達した。(2022-11-23 現在 2043 stars) 1k star になった時に何かエントリーでまとめようと思ったけどいまいち時間を取れずに書けなかったので 2k のタイミングで書くことにした。

[![shufo/vscode-blade-formatter - GitHub](https://gh-card.dev/repos/shufo/vscode-blade-formatter.svg)](https://github.com/shufo/vscode-blade-formatter)

Issue や PR を作成してくれた Contributor の方々ありがとうございます。

## Contributors

|  |  |  |  |
| --- | --- | --- | --- |
| <img src="https://avatars.githubusercontent.com/u/1257629?v=4" width="100;" alt="slovenianGooner" class="jop-noMdConv"><br><sub>SlovenianGooner</sub> | <img src="https://avatars.githubusercontent.com/u/188642?v=4" width="100;" alt="yaegassy" class="jop-noMdConv"><br><sub>Yaegassy</sub> | <img src="https://avatars.githubusercontent.com/u/4225509?v=4" width="100;" alt="dianfishekqi" class="jop-noMdConv"><br><sub>Dian Fishekqi</sub> | <img src="https://avatars.githubusercontent.com/u/1239921?v=4" width="100;" alt="j3j5" class="jop-noMdConv"><br><sub>Julio J. Foulquie</sub> |

## How I got 2000 stars

どのような経緯で 2000 stars まで行ったかというと大半は直近の半年程度で付けられたもので、今年の 3 月頃まではじわじわという感じだった

![](/img/uploads/2022-11-23-star-history-202267.png)

### 開発の経緯

元々は [blade-formatter](https://github.com/shufo/blade-formatter)という Blade ファイルのフォーマッタを開発していて npm package として開発していたが、途中から VSCode でも提供出来たら CLI オプションを覚える必要もないしエンジニア以外でも利用しやすくなると思い blade-formatter をベースとして VSCode 拡張版として vscode-blade-formatter を開発した。
ベースとなる blade-formatter 自体を作った動機としてはその当時調べた限りまともに使える Blade ファイルをターゲットにしたフォーマッタが存在しなかったからで、2022 年現在も調べた限りは代替になるレベルのパッケージは存在しないので恐らくそれなりに人がやりたくないものなんだろうなぁと思う。

なぜ Blade の Formatter の開発をやりたくないかというと

* Blade テンプレート自体には形式文法のようなものがなく基本的なアイデアは正規表現で特定の Blade の Token (`@if` や `@foreach` 等)を**php として**valid な文字列 (例: `<?php if (~) ?>, <?php foreach (~~) ?>`) に置き換えるというアプローチで Templating を実現している
  * 別の言い方をすれば Blade として Valid な文字列というのは基本的にはなく、PHP へ Compile 後に PHP の Syntax として正しいかどうかでしかその Blade テンプレートが文法として正しいか評価出来ない（つまり Blade -> PHP へコンパイルする前に最終的な正当性を検証出来ない）
    * この理由があり Parser や Lexer で Blade テンプレートの AST を作るようなアプローチはうまくいかない
    * 厳密に言えば Syntax が形式化されていないから Formatter のアプローチも同様に正規表現ベースで行う必要がある
      * prettier/plugin-php の[issue](https://github.com/prettier/plugin-php/issues/1120#issuecomment-1023560656) でも「Blade サポートは複雑になるのでつらい」というようなことを言及していた

というところがあったのだと推測している。つまり通常フォーマッタを作成する時に考えるような構文解析して AST を生成 → 決められた形式文法に従ってフォーマットするというようなアプローチではなく文字列操作で完結させるの辛いよねという至極当たり前の感想になるのだけど（構文解析するにしても PHP, HTML, Blade 入り混じった文字列の解析になるのでつらい）まぁただ現状そうするしかなさそうなのでそうしている。

VSCode で拡張を公開したところ思ったより反響が大きく公開してからフィードバックが増えて潜在的なバグの修正や機能改善が進んだ。

今思うと npm パッケージを分離したことで結果的に VSCode Extension 本体と分離され、ベースとなるパッケージを安全に開発できたことはよかったと思う。その後 Prettier の plugin 版 [prettier-plugin-blade](https://github.com/shufo/prettier-plugin-blade) も作成しこちらも Prettier への依存と分離して開発を進めることが出来た。
また coc.nvim の plugin として[coc-blade](https://github.com/yaegassy/coc-blade) (by [@yaegassy](https://github.com/yaegassy)) が作られるなど nodejs ベースの別 platform の plugin での利用も進んだ。

### 分析

Extension のインストール数と DL 数自体は [VSCode Extension Marketplace](https://marketplace.visualstudio.com/) の統計から分かっていて、1 リリースごとに 5 万 \~ 7 万 程度 DL 数が増えていたから、おおよそで大体 5 万人程度アクティブユーザがいるんだろうなという推計はしていた (VSCode Extension は新しいバージョンを Publish すると自動的に拡張機能を有効化しているマシンに更新後の拡張機能が DL される)

ただ VSCode Extension Marketplace 自体には MAU を出力する機能などがなかったので今一 DL 数の推移だけから予測したこの数値に確信が得られていなかった。

なので 3 月くらいに [vscode-extension-telemetry](https://github.com/microsoft/vscode-extension-telemetry) を導入し Telemetry 経由で [Azure Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview) を使い実際のアクティブユーザ数の統計を取ったところ MAU で 8 万人程のユーザが使っていることが分かった (2022-11-23 時点で MAU で **98k users**, DAU で **30k users** ほど)

![](/assets/img/uploads/2022-11-23-2022-11-20_03-46.png)

(Azure Application Insights の Users レポート画面)

2022-11-20 現在 VSCode Marketplace で `Laravel` での [検索結果](https://marketplace.visualstudio.com/search?term=Laravel&target=VSCode&category=All%20categories&sortBy=Relevance) で上から数えて 7 番目に多くインストールされている拡張機能となっており、Laravel カテゴリーで snippet 系やコマンドショートカット系を除いた拡張機能の中では Laravel Extra Intellisense に次いで実質 2 番目くらいの位置になっている。

![](/assets/img/uploads/2022-11-23-2022-06-07_04-21.png)

### 仮説＆検証

ここからそれなりにアクティブなユーザ数がいる割には Star 行動に繋がっていないのがなぜなのかちょっと不思議に思い他の Star が多い Extension などをリサーチした。

例えば同じ程度の DL 数やインストール数の Extension (Laravel Extra Intellisense 等) でも 1000 や 2000 stars 獲得しているが 2 月時点では vscode-blade-formatter は 100 程度だったのでその違いがどこから来るものなのか不思議に思った。
リポジトリの Star 数はある程度実際のユーザ数と相関関係があるので、8 万人 MAU がいるならその 1% が star するとして 800 stars くらいは平均的に行くのでは？と。

そしておそらく何らかの Star 行動に繋がるための導線が足りないんじゃないかという仮説を立てた。

そうこうして同じ程度のインストール数で Star が多い Extension のリポジトリのソースなど読んでると, いわゆる [CTA (Call to Action)](https://en.wikipedia.org/wiki/Call_to_action_%28marketing%29 "https://en.wikipedia.org/wiki/Call_to_action_(marketing)") のような手法を使っていることが多いのが分かった。

なぜそうするかというと通常 VSCode 拡張機能 は インストールから更新まで VSCode 内で完結するのでリポジトリへ至る導線がなく GitHub の Star ボタンを物理的に押すことが難しいからだ。(自分から検索したり拡張機能ページの詳細からリンクを押さない限り）
それ以前も Exception が発生した時に簡単に issue を報告出来るようポップアップでリポジトリの issue へのリンクボタンを設置したダイアログを表示するようにしていたのだけど、この機能自体は Exception が発生した時にしか表示されないので実際にリポジトリへ訪れるユーザの行動の動機はバグ報告がメインだった。

ここで更に仮説を立てて CTA (Call To Action) で直接 Star を行うための導線を確保すれば Star という形で Contribution したいユーザの行動意欲を満たせるんじゃないかと推測した。

で、実際に CTA で特定のタイミング（最初のインストール後の Activate 時、もしくは Extension 更新後の Activate 時）でリポジトリへの導線となる Welcome メッセージのダイアログとボタンリンクを設置したところ、上記のグラフのように目に見えて1ユーザ当たりの Star Rate が増えたことである程度仮説が正しいことが確認出来た。

### 継続的な開発

ここからは Star 数に直接は関係ないけど結果的にアクティブなユーザ数が増えた下地として重要だったなと思ったこと

#### リリース自動化

GitHub Action で Extension の公開を[自動化](https://github.com/shufo/vscode-blade-formatter/blob/129e1d0040aa933259a2d9f801c5e6454bb57b66/.github/workflows/create-release.yml)している

##### Conventional Commits

コミットメッセージを [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) 形式に統一することで [release-please action](https://github.com/marketplace/actions/release-please-action) を使い、特定のコミットメッセージ（chore: \~\~) に応じて version の bump、CHANGELOG.md の更新までを bot が自動的に Pull Request を出せるようにしている。自分はその変更内容を確認して merge するだけでリリース出来るようになっていて、これが長くメンテしてると地味に効いてくる。

リリースの自動化は単純作業が多く機械化しやすい割りには失敗した時にクリティカルな箇所なので安全で継続的な開発には欠かせない。特にサイドプロジェクトとしてやっているような OSS だとあまり時間も確保も出来ないので 1 人で回せる範囲を機械的に広げることは重要になる。

##### vscode-test

また [vscode-test](https://github.com/microsoft/vscode-test) で VSCode Extension のリリースを省力化出来たのも重要だったなと思う。というのは Extension の更新は Marketplace に公開するとインストール済みのユーザには即 DL が始まるので壊れた時にクリティカルになりやすい。そのため [E2E テスト](https://github.com/shufo/vscode-blade-formatter/actions/runs/2470214939) を GitHub Action で 3 プラットフォーム（Linux, Mac, Windows) で実行してそれぞれのプラットフォームで成功して初めてリリース出来るようにしている。一度特定のプラットフォーム（Mac）だけプラットフォーム依存の問題で動作しなくなった以来 E2E での Extension CI を導入して安全にリリース出来るようになった。

こんな感じで 1 bug fix 1 リリースぐらいの粒度で細かくリリースしていたら約 2 年で 100 リリースを超えた。

## 学んだこと＆やってよかったこと

* Telemetry で統計を取ることのメリット
  * 行動の裏打ちを取ることで、次の行動へつなげることが出来た
* GitHub Star はちょっとした導線の確保だけで 1000 違いが出てくることもあるということ
  * 自分で実際に体験して Star はメトリクスとしてはそもそも曖昧なものであることも再確認
    * ユーザがそもそもリポジトリの URL を知らないだけという場合も多い
      * また意識的に Star を押すという行動をしないと結構普段からお世話になっているリポジトリでも押し忘れていることも多い (ただでさえ GitHub 上では目立たない位置にボタンがある）
    * Star 数をリポジトリの健全性を測るメトリクスとして使うのはやはり難しいなということも再確認 (施策ありなしで 1000 程度なら誤差は出る。Star が少ないことは有用でないことを意味しないし、多いことは必ずしも有用であることを意味しない)
      * 10k stars の大台を超えるとまた違った評価軸になるのだろうけど
* しかし既にユーザ数がある程度いることが予測出来るならちょっとした導線整理などで 1000 程度なら Star が違ってくることもあるのでやっておいて損はない
  * Star 数それ自体にはあまり意味はないけど、継続性を考えるとリポジトリに Contribute する可能性のある人の裾野が広がる
* 他の人がやりたくないことには需要がある
  * 思いついても面倒さや不確かさゆえにやっていないことには需要がある
* npm でのパッケージ公開
  * 最初は VSCode 対応などあまり考えずに php パッケージとして packagist に公開してフォーマッタを作ることも検討していたけど、script タグや HTML、PHP 自体の適当なフォーマッタが存在せず、その周辺のエコシステムが揃っているのが prettier や js-beautify の存在する npm だったので npm パッケージとして作ることに決めた。結果論にはなるけど多プラットフォームに展開しやすかったのでよかったなと思う。

## 今後やりたいこと

とりあえず現実的な目標としての一つのマイルストーンである 1k star, 2k star を達成したものの、急に増えたユーザからのバグ修正依頼を優先してコードベースが不必要に複雑になってしまったところも多いのでリファクタリングを進めていきたい。

また現状インストール数と MAU の比が 4:1 くらいでまだリテンションレートを改善出来る余地はありそうなのでインストール後の体験の改善も進めていきたい。