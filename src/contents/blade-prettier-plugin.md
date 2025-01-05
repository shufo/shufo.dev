---
author: shufo
feed:
  enable: true
draft: false
title: Blade用のPrettier Pluginを作った
datetime: 2022-02-05T00:00:00.000+09:00
twitter_image: /assets/img/uploads/2022-02-04-prettier-1-logo-png-transparent-1.png
og_image: /assets/img/uploads/2022-02-04-prettier-1-logo-png-transparent-1.png
tags:
- Tools
- Programming
slug: created-prettier-plugin-for-blade

---

### Overview

Prettier Plugin for Blade を作った

![](/assets/img/uploads/2022-02-04-prettier-1-logo-png-transparent-1.png)

[![shufo/prettier-plugin-blade - GitHub](https://gh-card.dev/repos/shufo/prettier-plugin-blade.svg)](https://github.com/shufo/prettier-plugin-blade)

![](/assets/img/uploads/2022-02-04-screen-record-from-2022-01-27-20-53-05-2x_0-5-optimized.gif)

### 作った経緯

なぜか Prettier 向けのプラグインに Blade 向けの物がなく（npm で global に名前だけ取られているが[404](https://www.npmjs.com/package/prettier-plugin-blade)) 、以前からちょいちょい Prettier でフォーマットしたいみたいな話題が一部でちらほら上がっていたものの最近また Taylor Otwell（Laravel 作者）が Prettier 向け[Blade Plugin 欲しいというような発言をしてた](https://twitter.com/taylorotwell/status/1486085543960186882)のを見て、以前確認した時からまだ無かったのかと気づいて作った

存在しなかった理由としてはそもそも Blade テンプレートエンジン自体が lexer や parser を使ってテンプレートを解析しているわけではなく、正規表現と置換を使って Blade 用の Syntax を純粋な PHP ファイルとして扱えるようにトークンを置き換えているだけという実装になっているので、通常 AST を期待する（ように見える）Prettier の parser 向けに実装しようと思うと腰が重い…という理由なのかもしれない

### AST じゃなくても OK

しかし Prettier の Plugin を実装する際は実は Plugin 側が AST を返さなくてもフォーマット後の string さえ返せれば問題なく、例えば [prettier-plugin-elm](https://github.com/gicentre/prettier-plugin-elm) などはそうなっており、I/O 形式さえ理解すれば文字列操作だけでも完結するので Prettier Plugin 作成はそう難しくはない

で、軽く [blade-formatter](https://github.com/shufo/blade-formatter) ベースで文字列のみで PoC したら出来たのでそのまま公開した

### 苦労した点

苦労した点としては Prettier の parser は async ではなく sync で動作するので plugin から Promise を返しても認識しない点があった。formatter 側で promise を返す実装のみをしていたが、Plugin のためだけに sync 対応するのも少し面倒だったので最終的には [synckit](https://github.com/rx-ts/synckit) で async メソッドを擬似的に synchronous に動かすことで解決した

### よかった点

Prettier plugin として作ってよかったこととしては VSCode や[coc.nvim](https://github.com/neoclide/coc.nvim), WebStorm, PHPStorm など IntelliJ 系 IDE などに既に Prettier 拡張が存在するので、作ったプラグインを依存に追加さえすれば特に何もしなくても複数のエディタに対応出来るという点があった。 既に成熟したエコシステムならではの寄らば大樹の陰感。
