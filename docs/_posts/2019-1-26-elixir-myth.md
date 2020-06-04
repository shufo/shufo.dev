---
title: Elixirにまつわる3つの神話
date: 2019-01-26
tags: 
  - Programming
  - Elixir
permalink: elixir-myth
description: 神話について
---

ある言語を評価するとき伝聞で聞いた情報であの言語は ○○ だという評価をよくしてしまいがちだ。

Elixir も他言語の例に漏れず、○○ 言語は ○○ だという言語神話がよく振りかざされるので一使用者の立場から誤解を恐れずその神話を解いてみたい

### 学習コストが高い

Elixir は学習コストがかかるという誤解をされることがある。

おそらく、Elixir = 関数型 = なんか難しい概念出てきそうという発想だろう。その気持ちはよくわかる。だがちょっとまって欲しい。Elixir はとても覚えることの少ない言語だ。

[How to Measure Programming Language Complexity – Richard Kenneth Eng – Medium](https://medium.com/@richardeng/how-to-measure-programming-language-complexity-afe4f7e75786) (どのようにプログラミング言語の複雑性を計測するか)

上記の記事で Richard 氏が各プログラミング言語のキーワードと予約語を数えたところ Elixir は **18** 個で Smalltalk に次いで最も予約語の少ない言語だった。

シンプルさを哲学とする Golang でさえ 25 個、PHP では 67 個で約 4 倍もののキーワードが存在する。

キーワードや予約語はプログラミングにおいて特別な意味を持っており、その文字によって予約語以外の文字と区別されるため学習する際にはほぼ覚えることが必須だ。

もちろん予約語やキーワードの少なさだけで言語の複雑性が一意的に決まる訳ではないのでここではそれ以上踏み込まないが、究極的に覚えないといけないトークンの少なさはその言語がどういう言語でありたいかという思想を表している。

後にも述べるが Elixir はマクロを使うことで制御構造でさえ変更可能な柔軟性がありつつも、究極的に覚えなければいけないのはこの 18 個の予約語だけというシンプルさを手にしている。

要は Elixir は言語それ自体のコアはシンプルでありつつも高い拡張性を指向した言語であり、同時に出来るだけ初心者がとっつきやすい (easy な） 言語でありたいという思想をもった言語であるということだ。

Smalltalk がハガキ一枚に収まる文法しか無いのと同様 Elixir もコア自体は恐らくハガキの表面と裏面で足りる程度の文法しかないだろう。

![](https://imgur.com/BUf4nbo.jpg)

だが時に過剰なシンプルさは現実の複雑な問題を解くためには大量の boilerplate を必要とするためある程度の抽象度は必要だ。それこそシンプルでさえよければアセンブリ言語で書けばいいだろうがそれは現実的ではない。そのために高級言語が存在する。

Rich Hickey が [Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy) のスライドで語ったように Simple である場合と Easy である場合では以下のような出力の違いが出る。

<img src="https://i.imgur.com/T9TVQIA.png" style="width: 70%">

Easy であるものは当初はスピードが出るものの時が経つにつれて段々と出力が落ち、逆に Simple であるものは当初は出力が出ないものの時が経つにつれて組み合わせの力で出力が増すということだ。

プログラミング言語の歴史はこの Easy さと Simple さへの反省の繰り返しで漸進的に進化してきた。

Elixir は Easy であることにも慎重に配慮されており、Ruby 系列の認知容易性の高い文法、REPL、ビルトインの mix を中心としたエコシステムが優れた開発体験を提供してくれる。

Easy というのは時にバイアスになり、Simple でないことを隠蔽してしまうため一見して Easy というものにも注意は必要だが、 Elixir は言語のコアは Simple でありつつ表面上は Easy であるため、比較的最初から高い生産性を維持していくことが出来る。図にすると以下のような感じだ。

<img src="https://i.imgur.com/UvY0dPN.png" style="width: 70%">

実際に自分が人に Elixir を教えた経験では他言語業務経験者なら 2 週間ほど、業務未経験者でも 1 ヶ月程でもう立派な Elixir のコードを書けるようになったことを覚えている。

自分が Elixir のことを気に入っているのは結局のところこういったバランス感覚であり、Simple 極振りでもないけどかといって Easy に寄りすぎてもいないとかそういうところだと思う。要するにトレードオフなのだけれど、不確実なプロジェクトに対していきなり Simple 極振りも出来ない、かといって Easy にも寄り過ぎたくないというところでプラグマティックな選択肢としての Elixir が現れる。

### Erlang のラッパー

Elixir って Erlang のラッパーでしょ？という言説をたまに目にする。念頭にあるのは CoffeeScript のようなシンタックスシュガーなものかもしれない。だがこれは間違いだ。

どちらかというと Ruby の薄皮をかぶった BEAM ベースの Lisp と言っていいかもしれない。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">ElixirってほとんどLispです。Lispの柔軟性を損なわずにアルゴル系のシンタックスです。Elixirには高速WEBを満足する並列処理と言う大義名分があります。大っぴらにElixirを使うことができます。これはLisp使いの夢の実現ではないのかなぁ。</p>&mdash; LAL(Light AI Lab) (@LAL6809) <a href="https://twitter.com/LAL6809/status/1081165168950665216?ref_src=twsrc%5Etfw">2019年1月4日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Lisp がマクロで多くのことを実現するように Elixir もマクロによって多くのことを実現している。

例えば Elixir には`defmacro/2`というマクロを作成するマクロがあるがこれも実は defmacro で定義されている。

```elixir
defmacro defmacro(call, expr \\ nil) do
  define(:defmacro, call, expr, __CALLER__)
end
```

じゃあ defmacro を定義する defmacro はどこで定義されているんだよとなるがこれは言語の bootstrap 時に定義されている。

このように Elixir ではコア機能の多くを Lisp のようにマクロで実現することでコア自体はマイクロでありつつも言語自体の大きな拡張性を手にしている。

単純にラッパーと言いきれないのはこういった拡張性で、Erlang に一対一で対応すること以上のことが拡張性で可能になっている。

しかしマクロは言語構造さえ動的に変えられるほど強力な反面一歩間違えば怪我をする諸刃の剣だ。

Elixir がうまいのはプログラマにマクロを使っているということをほとんど意識させない点で、`def`のような基本的な文法でさえマクロなのに公式サイトのイントロダクションでは一切その説明は出てこない。

```elixir
defmacro def(call, expr \\ nil) do
  define(:def, call, expr, __CALLER__)
end
```

以下のような簡単な Hello world でさえ`defmodule`と`def`というマクロを使っている。

```elixir
defmodule HelloWorld do
  def hello do
    IO.puts "Hello World"
  end
end
```

一見 Ruby 寄りの命令型言語のように見えてバックは Erlang を由来とする BEAM ベースの非純粋関数型言語であり Lisp 並にマクロをフル活用している。Ruby のように見えるのは本当に表層的な部分だけで、内実は BEAM のゴリゴリの並行システムと Ruby も影響を受けた Lisp 並の高い拡張性が同居している。

この拡張性により特定のドメインに囚われない、目的に合わせた幅広い利用が可能になっている。例えば [Nerves](https://github.com/nerves-project/nerves) によるIoT組み込みプロジェクトから、[GPGPUによる並列科学計算](https://lonestarelixir.com/2019/speakers/21)、もちろん Erlang の性能を活かした稼働率99.9999999%の高可用性システム、[銀行システム](https://medium.com/margobank/why-elixir-546427542c)、[仮想通貨](https://github.com/omisego/ewallet)、メディアサーバ、[Discordの同時500万接続を支える](https://blog.discordapp.com/scaling-elixir-f9b8e1e7c29b)シグナリングサーバなどなど。

Elixir の[デザインゴール](https://elixir-lang.org/blog/2013/08/08/elixir-design-goals/)にも掲げられているが Ruby 的文法はあくまで作者が Ruby 出身ということで追加されたプロダクトとしてのデザインで言語デザイン上のゴールではない。

あくまで言語としてのゴールは Erlang との互換性、そしてここがただのラッパーではないものになっている理由だが、マクロシステムをベースとした高い拡張性と生産性だ。

### Erlang の知識が必要

Elixir は [BEAM](<https://en.wikipedia.org/wiki/BEAM_(Erlang_virtual_machine)>) 上で作られているので Erlang の知識が必要というような言説を見ることがある。

これは半分合っているが、半分間違っていると言っていいかもしれない。

ここで Erlang の知識といっているのは OTP や Erlang 特有の知識のことで関数名や Erlang の文法などのことだ。

半分合っているというのは実際自分は 3 年程 Elixir を使っているが OTP の知識が必要になったのはライブラリを作る時や、ロングランニングプロセスで定期的なタスクを実行するプロセスを作るなどした時くらいだ。

Erlang は Elixir が依って立つ偉大な巨人だがその実態は慎重に抽象化されている。

gen_server などの behaviour は Agent モジュールで抽象化出来るし、一時的に別プロセスが欲しくなったら Task モジュールを使うことが出来る。GenStage などのbehaviourも [Flow](https://qiita.com/shufo/items/59d1c3b0baac6751777f) で抽象化出来る。

あくまで BEAM 上で動作する軽量プロセスという概念は知る必要はあるが、そのプロセス同士がどのように連携するかまでは普通に使っているうちではあまり知る必要はないように抽象化したライブラリが充実しているといった方が正確か。

もちろん作りたいものが何になるかにもよるがおそらく Elixir で最もユースケースの多い Phoenix をベースにした Web 周りの領域では踏み込まない限りは Erlang の知識が必要になることはあまりない。

ただ Elixir が内実としてプロセス同士のメッセージングパッシングで動いていることを知ると実際の動作がイメージしやすい。言語としてのゴールは Erlang との互換性を保ちつつ並行システムを別のツールセットとして組むことなので学習するとしてもまずは別のツールセットとしての Elixir を学んでから Erlang を学ぶことをおすすめしたい。
