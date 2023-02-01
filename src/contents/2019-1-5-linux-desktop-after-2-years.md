---
title: 仕事用 PC を Linux デスクトップにしてから 2 年経ってよかったと思う点 3 つ
datetime: 2019-01-05
tags: 
  - Linux
permalink: linux-desktop-after-2-years
slug: linux-desktop-after-2-years
description: Linux デスクトップにしてから 2 年程経ったので
---

<img src="https://i.imgur.com/DbKiPNf.jpg">

というわけで仕事用の PC を Linux デスクトップにしてから 2 年程経ったので改めてその感想などを書いてみる

ちなみに OS は[elementary OS](https://elementary.io/)を入れている

### elementary OS

<br>

<blockquote class="imgur-embed-pub" lang="en" data-id="DbKiPNf"><a href="//imgur.com/DbKiPNf">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

elementary OS は Ubuntu ベースのディストリビューションで最近[DistroWatch](https://distrowatch.com/)でも Linux Mint に次いで人気のディストリビューションになっている

<blockquote class="imgur-embed-pub" lang="en" data-id="DLIE28m"><a href="//imgur.com/DLIE28m">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

elementary OS を一言で説明すると名前の通り elementary（初心者）向けの OS だ

というのは elementary OS の設計思想はどちらかというと Mac に近く、デフォルトでカスタマイズ出来る余地が少なくなっているのだ。Linux で最初にやることといったらデスクトップ環境を KDE や Gnome から選んで〜みたいなこともなく Pantheon という elementary OS のために設計されたデスクトップ環境の元で一貫した UI が提供される。

Mac が割と万人におすすめ出来るのはそういった選択の余地の少なさで、アフォーダンスを限定することで説明しなくても誰でも使える点だ。iOS も同じ思想で老人でも子供でも初見で使えるようになっている（最近は怪しいけど）

elementary OS でも同様にユーザに見せる UI を慎重に選んでいる。プログラミングにも通じることだけど、ユーザに見せる API のインターフェースをいかにシンプルにして複雑なバックグラウンドを隠蔽するかは良いソフトウェアを書くためには欠かせない点だ。 UI もソフトウェアと同じくインターフェースをいかに洗練させるかが使い安さに直結するということを(Linux ディストリ界隈では珍しく)作者はよく分かっている。

ちゃんと情報を見たいとなると CUI を使わないといけない辺り Mac に影響をかなり受けているように思われる。逆に突っ込んだことをしなければほとんど GUI で完結するので普段使いにもおすすめ出来る。（実際普段使い用の PC にも入れて使っているが特に問題ない）

ちなみに初心者向けといってもベースは Ubuntu LTS で apt コマンドもちゃんと使えるので上級者が使っても全然問題ない

前置きが長くなってしまったが以下の 3 つの点が主によかった

## よかった点

### Docker をネイティブで使える

Docker をネイティブで使えるという点については自分がサーバ周りのエンジニアということもありとても重要。
実際本番環境で動かすコンテナ環境なども Linux OS ベースのためローカルと本番で動作原理が異なることがないというのは大きい。もちろん CI を噛ました上でというのはあるがそれでも CI 環境とローカル環境で動作が同じ OS を使えるので、OS の違いで変なハマり方をするというのがとても少なくなった。

### 環境構築が楽

環境構築という点でもソフトウェアエンジニアにとってはメリットが大きい。
日々色々なツールを評価したり作ったりする中でインストール方法や Usage などは Linux 向けに書かれていることが多い。
Mac や Windows 向けのインストール方法が書かれていることもあるがやはり実際に本番環境などで動かすのはほぼ Linux 環境である以上まず Linux 向けのインストール方法は動いて Mac や Windows 向けのインストール方法がメンテされていなくて動かない、という事も少なくない。

Windows で一時期ちゃんと[開発環境を構築していた](https://qiita.com/shufo/items/355514ba4177bc8ab335)こともあったけど、本気で使うにはそれなりの努力が必要なのとやはり WSL や POSIX 環境がどうしても一枚層を噛ましている結果ネイティブの Linux に比べてファイルシステムが絡む操作の動作が遅いのが辛かった

### GNU コマンドが使える

Mac の場合 GNU コマンドを入れることも出来るがデフォルトで入っているのは BSD 版のコマンドなので `tar` コマンドや `sed` コマンドなど微妙にオプションが GNU 版と異なる

困るのがローカルでこのコマンドで問題ないな！とか思って本番環境で実行するとオプションが異なって実行出来ないみたいなことが起こる。大抵はエラーになるだろうけど Bash スクリプトなど途中でコマンドを挟んで意図したとおりのコマンドが実行されなかったりすると心臓が止まる。

Linux デスクトップではローカルで動作するなら本番でも大体動作するという再現性がある程度保証出来るので精神衛生的にもよい。

## 困った点

逆に Linux を使う上で困った点を挙げてみる

### GUI の MySQL クライアントの定番がない

これを使っておけば OK というような GUI クライアントがあまりない。
無いなら作るというのが Linux コミュニティにおける基本態度なので文句はあまり言えないが…
Windows なら HeidiSQL、Mac なら SequelPro といった定番クライアントがない。

なので Wine を入れて HeidiSQL を動かしている。そこそこまともに動いているがたまにコネクションが途切れてフリーズしたりやはりネイティブでの動作に比べて少しもっさりするのが残念。
CUI で操作しろということだと思うけど常に CUI だと疲れてる時のオペミスが怖い（UPDATE 文で WHERE 忘れたりとか）のでオペミス防止であえて GUI 使ってるとこもあるのでここは重要。

※ 2019-01-26追記

しばらく[DBeaver](https://dbeaver.com)がメモリリークバグでまともに使えなかったが修正したら普通に使えるようになったので今ではDBeaverをメインで使っている

2019-01-26現在現在最新のDBeaverをelementary OSで動かすにはdbeaver.iniでGTKのバージョンを直接指定する行を先頭に足す

```bash
$ sudo vim /usr/share/dbeaver/dbeaver.ini
```

以下の2行を先頭に足す

```
--launcher.GTK_version 
2
```

最終的にこんな感じになる

```
--launcher.GTK_version 
2
-startup
plugins/org.eclipse.equinox.launcher_1.5.100.v20180827-1352.jar
--launcher.library
plugins/org.eclipse.equinox.launcher.gtk.linux.x86_64_1.1.800.v20180827-1352
-vmargs
-XX:+IgnoreUnrecognizedVMOptions
--add-modules=ALL-SYSTEM
-Xms64m
-Xmx1024m
```


### Office がない

めったに使わないけど官公庁系のデータを見たい時とか xls 形式でしか配布してないとかたまーにある。
そういう時や Windows でしかどうしても使えないソフトがある場合は Windows をインストールしてある PC へ [Synergy](https://symless.com/synergy) で繋いでいつでも操作出来るようにしている。Synergy は神。

### サポートされていないアプリがある

例えば [Zoom](https://zoom.us/) など Linux 版だけ少し開発が遅く、Windows で使える機能を使えないなどやはりサポートが弱いということがある

Electron ベースのアプリ（Slack, VSCode など）は基本的にクロスプラットフォームで動作に変わりはないけれどそれぞれのプラットフォームのネイティブ API をディープに使うようなアプリだとクロスプラットフォームも難しいのでやはりまだ厳しい点はあるのかなという印象

結局普段どのように開発しているかというと Windows PC と Linux デスクトップをそれぞれ隣り合わせたディスプレイに別々に画面出力し [Synergy](https://symless.com/synergy) でシームレスに OS を跨いで操作出来るようにして、Linux で出来ないことや Windows の方が早い時は Windows で操作したり逆に Linux の方が早い時は Linux で操作したり補い合うことでそれぞれ苦手なところを補完している。

ちなみに Linux デスクトップ用のディスプレイは [Philips の 42 インチモニタ](https://www.philips.com.ph/c-p/BDM4350UC_00/brilliance-4k-ultra-hd-lcd-display) 1 枚でデュアルモニタにする必要をなくしている。elementary OS は HiDPI 環境でも割とまともに動く部類なので特に凝った設定も必要なかった。

## まとめ

デスクトップ Linux にして良かった点と困った点を見てみた

現状ではまだ足りない点もあるけどサーバ系エンジニアにとっては少なくともやる価値は十分あるというのが現時点での感想だ

ネイティブアプリ開発とかフロント開発とかなら正直 Mac で足りるかなという気もするけど今の Mac が気に入らないとか新しい環境を試してみたいなら脱出するいいタイミングだと思う。OS のアップデートに煩わされることが少なくなる。(無いとはいっていない)

それぞれの OS の苦手な点を補えるように Windows もしくは Mac も用意して [Synergy](https://symless.com/synergy) などのインプットデバイス共有ツールで適宜 OS を使い分けるという方法が Linux デスクトップを使う上ではベストかもしれない
