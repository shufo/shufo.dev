---
author: shufo
feed:
  enable: true
draft: false
title: Blade用のPrettier Pluginを作った
date: 2022-02-05T00:00:00.000+09:00
tags:
- Tools
- Programming
slug: created-prettier-plugin-for-blade

---
### Overview

Prettier Plugin for Bladeを作った

[![shufo/prettier-plugin-blade - GitHub](https://gh-card.dev/repos/shufo/prettier-plugin-blade.svg)](https://github.com/shufo/prettier-plugin-blade)

![](/assets/img/uploads/2022-02-04-prettier-1-logo-png-transparent-1.png)

![](/assets/img/uploads/2022-02-04-screen-record-from-2022-01-27-20-53-05-2x_0-5-optimized.gif)

### 作った経緯

なぜかPrettier向けのプラグインにBlade向けの物がなく（npmでglobalに名前だけ取られているが[404](https://www.npmjs.com/package/prettier-plugin-blade)) 、以前からちょいちょいPrettierでフォーマットしたいみたいな話題が一部でちらほら上がっていたものの最近またTaylor Otwell（Laravel作者）がPrettier向け[Blade Plugin欲しいというような発言をしてた](https://twitter.com/taylorotwell/status/1486085543960186882)のを見て、以前確認した時からまだ無かったのかと気づいて作った

存在しなかった理由としてはそもそもBladeテンプレートエンジン自体がlexerやparserを使ってテンプレートを解析しているわけではなく、正規表現と置換を使ってBlade用のSyntaxを純粋なPHPファイルとして扱えるようにトークンを置き換えているだけという実装になっているので、通常ASTを期待する（ように見える）Prettierのparser向けに実装しようと思うと腰が重い…という理由なのかもしれない

### ASTじゃなくてもOK

しかしPrettierのPluginを実装する際は実はPlugin側がASTを返さなくてもフォーマット後のstringさえ返せれば問題なく、例えば [prettier-plugin-elm](https://github.com/gicentre/prettier-plugin-elm) などはそうなっており、I/O形式さえ理解すれば文字列操作だけでも完結するのでPrettier Plugin作成はそう難しくはない

で、軽く [blade-formatter](https://github.com/shufo/blade-formatter) ベースで文字列のみでPoCしたら出来たのでそのまま公開した

### 苦労した点

苦労した点としてはPrettierのparserはasyncではなくsyncで動作するのでpluginからPromiseを返しても認識しない点があった。formatter側でpromiseを返す実装のみをしていたが、Pluginのためだけにsync対応するのも少し面倒だったので最終的には [synckit](https://github.com/rx-ts/synckit) でasyncメソッドを擬似的にsynchronousに動かすことで解決した

### よかった点

Prettier pluginとして作ってよかったこととしてはVSCodeや[coc.nvim](https://github.com/neoclide/coc.nvim), WebStorm, PHPStormなどIntelliJ系IDEなどに既にPrettier拡張が存在するので、作ったプラグインを依存に追加さえすれば特に何もしなくても複数のエディタに対応出来るという点があった。 既に成熟したエコシステムならではの寄らば大樹の陰感。