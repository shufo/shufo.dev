---
title: Laravelのblade formatterを作った
date: 2020-10-01T05:35:50.107Z
tags:
  - programming
  - OSS
slug: about-blade-formatter
---
## 作ったもの

<a href="https://github.com/shufo/blade-formatter"><img src="https://gh-card.dev/repos/shufo/blade-formatter.svg"></a>

## 何が出来るか
- Laravelのblade templateのフォーマット
  - PHP syntaxのサポート（PSR-2）
  - bladeディレクティブのネストサポート
  - HTMLのformat
  - CLIサポート
    - CIでのformattingチェック等
## Motivation

いい加減人類はコードの手動フォーマットという苦痛から解放されるべきで、もはやランタイムレベルでフォーマッタを入れるのは常識（言葉が強い）だけどLaravel bladeにはまだまともなformatterがなかったので作った

ここでまともと言っているのは少なくとも

- bladeのディレクティブがネストされる
- bladeディレクティブ内のネイティブPHPのsyntaxがPSR-2でフォーマットされる
- HTMLがフォーマットされる

ということだけどこれを実現しているformatterがなかった

## なぜなかったのか

- 作ってみて分かったけどそもそもbladeはHTMLにスクリプトを直接埋め込めるPHP + blade固有のsyntaxとなっているため, HTML, PHP, blade 3つのsyntaxが混ざるpolyglotな魔境となっていた
- 1つのファイルで3つのsyntaxをサポートするようなlexerやparserを作る労力に見合わない
  - 恐らくこれが大きい
- 特にそれぞれのエスケープ表現やネストするべきtokenが他のSyntaxとバッティングしてどちらを優先するべきか解決出来ない場面等もある

## formatterが出来るまで

### 指針

まずライブラリを作るに当たって大まかな指針を決める

- どういったアルゴリズムを使うか
  - そのアルゴリズムは自分で実装するべきか、3rd partyを使うべきか
- また既存ソリューションはなぜ問題を解決出来ていないのか
  - その問題は自分で解決出来るのか/3rd partyで解決出来るか
  - その問題を解決するコストは現実的にペイするか

指針が現実的に想像出来るレベルになったら実装に入る. とりあえず手を動かして指針に戻る場合もある

今回は既に[Laravel Blade Snippets](https://marketplace.visualstudio.com/items?itemName=onecentlin.laravel-blade)が簡易的にFormatterを実装していたのでそれをベースにこのライブラリが出来ていない箇所をブラッシュアップしていく形になった

Laravel Blade Snippetsはjs-beautifyでHTMLをFormatしているだけであくまでbladeディレクティブもHTMLのタグのようなものとして扱っていたためbladeディレクティブのネストやPSR2への準拠といったところが実現出来ていなかった

またCLIでの実行をサポートしておらずあくまでVSCodeのプラグインとしてのみ動作していたためCIでのprogramiticalなformat検査などが実行出来なかった

blade-formatterではそういった足りないところを補う形で実現した

### 実装 

まずどういったライブラリでもそうだけど最小限のPoCを実装する

PoCで十分最終的に実現したいソリューションを達成出来る手応えを得られた時点でリソースと相談して最後まで作るかどうか決める

- 時間
- 予算

ただあくまで個人的に作るOSSは[それが僕には楽しかったから](https://www.amazon.co.jp/dp/4796880011/ref=cm_sw_r_tw_dp_x_VByDFbMXWSK00)作るという場合が往々にしてあるのでリソースといったところはあまり気にしない. 

まずbladeディレクティブをネストさせる

## 参考にした

- [Laravel Blade Snippets](https://marketplace.visualstudio.com/items?itemName=onecentlin.laravel-blade)
  - Snippetといいつつ簡易的なFormatter機能もあり、方向性の指針にした. 実質このformatter機能をブラッシュアップしてbladeに特化したような形
  - js-beautifyを使っている箇所を参考にした
