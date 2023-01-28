---
title: Electron + TypeScript + Vue.js でソーシャルメディアデトックスアプリを作ってみた
datetime: 2018-09-16
tags: 
  - Electron
  - Vue.js
  - TypeScript
permalink: built-app-with-electron-vuejs-typescript
author: shufo
description: Electron + TypeScript + Vue.js でアプリを作った話
---

<img src="https://i.imgur.com/IMqvtGH.png">

最近ちょっと SNS 断ちをしていてついでにというか勉強がてら自分用に Electron + TypeScript + Vue.js でソーシャルメディアデトックスアプリを[作ってみた](https://github.com/shufo/aspida)

簡単に説明するとアプリでスイッチをオンにすると対象のサイトにアクセス出来なくなるというもの。

以下の GIF アニメを見てもらえればなんとなくどういうアプリかは分かると思う。

![](https://github.com/shufo/aspida/wiki/assets/description.gif)

コードのコンパイル待ちだったり CI 待ちのちょっとした空き時間についアクセスしてスクロール中毒に陥ってしまうことを防ぎたくて作った。
実際ソーシャルメディアを根本的に絶つにはマシンを破壊するか回線を切るくらいしかないと思うけど、そこまで出来ない人用。

仕組み的には対象のサイトのホスト名を hosts ファイルに書き込んで IP アドレス `0.0.0.0` で名前解決させてアクセス出来なくさせるという簡単なもの。
hosts ファイルに直接書き込むのでブラウザ以外にも CLI や専用のクライアントもブロック出来る。

DNS キャッシュが効いてる状態で名前解決時にキャッシュを参照してるとアクセス出来てしまう場合があるが Chrome の場合は`chrome://net-internals/#dns`を開いてから`cleat host cache`でキャッシュを削除すれば名前解決時に hosts ファイルを参照するようになる

### Electron

テンプレートとして[electron-vue](https://github.com/SimulatedGREG/electron-vue)をベースに作成した。

Electron は初めて使ったがクロスプラットフォームでバイナリを出力出来るのはやはり便利だった。ただ各プラットフォームごとにファイルシステムのアクセス制御の仕組みが違ったりするので書き込みに管理者権限の必要な hosts ファイルの権限チェックのためプラットフォーム固有の知識が必要になったりして少し苦労した。

例えば Windows は ACL でアクセス制御しているので

```javascript
fs.access(path, fs.constants.W_OK);
```

で書き込みが可能かチェックしてもファイルが存在する限りは必ず成功する。

一方 Linux は Electron を起動させているユーザで対象のパーミッションを正しくチェックする。
なのでプラットフォームが Windows の場合のみ ACL を変えるコマンドを投げるようにした。

あと他にも色々ハマりどころがあったので忘れないように覚え書きしておく。

#### ハマったところ

##### 静的ファイルの扱い

`npm run dev` で起動する開発モードと `npm run build` で出力する production 用のバイナリでは起動時のディレクトリ構造が異なるので `__static` 変数を参照して静的ファイル用のディレクトリ(`static`)へのパスを取得しないといけない。
ちなみに TypeScript でデフォルトだと global の`__static`を解決出来ないので

```ts
declare const __static: string;
```

を宣言して解決させた。

### TypeScript

以前から使ってみたかったけど中々使う機会がなかったのでせっかくなので使ってみた。

VSCode + TypeScript の開発体験、いわゆる DX（**D**eveloper e**X**perience）は噂通り素晴らしかった。コンパイル前からエディタでほぼリアルタイムで型エラーを出力してくれるし精度も高い。補完も強力でほぼ取りこぼしもない。エディタ自体が TypeScript で作られているだけあって完成度は折り紙つき。

ただ TypeScript 特有のクセみたいなものはあって Vue.js でコンポーネント内で`this`が解決されなかったりしてコンパイルエラーになるので

```ts
(this as any).someMethod();
```

とキャストして型の解決が必要だったり多少 workaround 的な作業が必要になる箇所が何箇所かあった。

あと TypeScript に対応していない npm モジュールもうまく解決出来ないこともあった。

TypeScript 特有の問題というわけではないが主に外部のライブラリと組み合わせたときに TypeScript を考慮していない部分で問題が発生しているように思えたので、TypeScript 外の npm モジュールを組み合わせるときは予め相性をチェックする作業が必要になりそうだった。

そういった意味で TypeScript を使う際は型が正しく通るように変更するオーバーヘッドが発生する可能性があるのでプロトタイプというよりは正式版としてかっちり作るのに向いているのかなと思った。

ネイティブ JS なら npm ライブラリもほぼ問題なく使えるし TypeScript に対応していないライブラリで型の問題が発生するということもないのでプロトタイプとして JS で書いてから問題なさそうだったら TypeScript に変換するというのもありといえばありかもしれない。

JS はテストを書くにも E2E がなかなか安定しなかったりで苦労するのでネイティブ JS で一度書いてから TypeScript に変換し型である程度の一貫性を保証することで品質を担保するという考え方も出来るかもしれない。

### Vue.js

以前からちょくちょく片手間フロントエンドマンとして仕事で使ったりしていたのでなんとなくは知っていたが
TypeScript で書いたことはなかったので組み合わせた時どんな感じなのかという確認の意味も込めて使ってみた。

結果としては[Vue.js 2.5 で TypeScript に正式に対応](https://jp.vuejs.org/v2/guide/typescript.html)したこともありほぼほぼ問題はなかった。

ちゃんとコンパイラが怒るところは怒ってくれるのでとりあえずコンパイルが通れば大体動くという安心感がある。
Electron 用のアプリ作成フレームワークとして見ても特に問題はなく普段 Web で動かすのと同じように書けた。
Web と異なるのはファイルシステムに直接アクセスしてローカルのファイルを参照したりするくらいで（それが一番のメリットかもしれないが）少し修正すれば Web にもコードを再利用出来そうだった。

### まとめ

Electron + TypeScript + Vue.js でデスクトップアプリケーションを作った。
内容が簡単な割りに結構ハマったりしたものの、 TypeScript の体験はかなりよかったので結果オーライ。（オーライ）

Repo: [https://github.com/shufo/aspida](https://github.com/shufo/aspida)
