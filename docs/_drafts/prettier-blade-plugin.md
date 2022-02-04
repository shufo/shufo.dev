---
author: shufo
feed:
  enable: true
draft: true
title: PrettierのBlade Pluginを作った
date: 2022-02-05 00:00:00 +0900
tags:
- Tools
- Programming
slug: created-prettier-plugin-blade

---
### Overview

Prettier用のBlade Pluginを作った

[![shufo/prettier-plugin-blade - GitHub](https://gh-card.dev/repos/shufo/prettier-plugin-blade.svg)](https://github.com/shufo/prettier-plugin-blade)

### 作った経緯

なぜかPrettier向けのプラグインにBlade向けの物がなく（npmでglobalに名前だけ取られているが[404](https://www.npmjs.com/package/prettier-plugin-blade)) 、以前からちょいちょいPrettierでフォーマットしたいみたいな話題が一部でちらほら上がっていたが最近Taylor OtwellがPrettier向け[Blade Plugin欲しいというような発言をしてた](https://twitter.com/taylorotwell/status/1486085543960186882)のを見て、以前確認した時からまだ無かったのかと気づいて作った

存在しなかった理由としてはそもそもBladeテンプレートエンジン自体がlexerやparserを使ってテンプレートを解析しているわけではなく、正規表現と置換を使ってBlade用のSyntaxを純粋なPHPファイルとして扱えるようにトークンを置き換えているだけという実装になっているので、通常ASTを期待する（ように見える）Prettierのparser向けに実装しようと思うと腰が重い…という理由なのかもしれない

### ASTじゃなくてもOK

しかしPrettierのPluginとしては実はPlugin側でASTを返さなくてもフォーマット後のstringさえ返せれば問題なく、例えば[prettier-plugin-elm](https://github.com/gicentre/prettier-plugin-elm) などはそうなっており、実際Pluginを作るのは形式さえ分かれば文字列操作だけでも簡潔するのでそう難しくはない

で、軽く [blade-formatter](https://github.com/shufo/blade-formatter) ベースでPoCしたら出来たのでそのまま公開した

### 苦労した点

苦労した点としてはPrettierのparserはasyncではなくsyncで動作するのでpluginからPromiseを返しても認識しない点があった。formatter側でpromiseを返す実装をしていたため、Pluginのためだけにsync対応するのも少し面倒だったので最終的には [synckit](https://github.com/rx-ts/synckit) でasyncメソッドを擬似的にsynchronousに動かすことで解決した

### よかった点

Prettier pluginとして作ってよかったこととしてはVSCodeや[coc.nvim](https://github.com/neoclide/coc.nvim), WebStorm, PHPStormなどIntelliJ系IDEなどに既にPrettier拡張が存在するので、作ったプラグインを依存に追加さえすれば特に何もしなくても複数のエディタに対応出来るという点があった