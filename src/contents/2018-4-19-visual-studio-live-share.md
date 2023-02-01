---
title: Visual Studio Live Share (Preview) を使ってみた
datetime: 2018-04-19
tags: 
  - Tech,
  - VSCode
permalink: visual-studio-live-share
slug: visual-studio-live-share
description: ローカルサーバ共有便利
---

<img src="https://i.imgur.com/6tqbPxG.png">

[Visual Studio Live Share](https://code.visualstudio.com/visual-studio-live-share) のプレビュー版の Invitation が届いていたので使ってみた

### 環境

* VSCode 1.22.2
* Windows 10
* Ubuntu 16.04 (Elementary OS)

### インストール

[インストールガイド](https://docs.microsoft.com/en-us/visualstudio/liveshare/quickstart/share?utm_source=hs_email&utm_medium=email&utm_content=62213452&_hsenc=p2ANqtz--m9WZrFIPTxaPK0eTQ3uE4z6Yd7V-bkVsRtSa9amDCZtBMIExhOfl1uhzG27uu73HL3SzfjyrTI9fPcwC7zmN_dFaW7w&_hsmi=62213452)を参考に進める

Windows 環境の場合は [Live Share 専用の拡張](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)を入れれば即使えるが、Linux は追加でパッケージのインストールが必要。

```
sudo apt-get install libunwind8 \
liblttng-ust0 \
libcurl3 \
libssl1.0.0 \
libuuid1 \
libkrb5-3 \
zlib1g \
libicu55 \
gnome-keyring
```

Linux 環境の場合は Live Share 拡張をインストールするとインストール手順が出るのでそれに従って進める。

### 所感

接続性はほぼ問題なし。エディタで現在開いているファイルや、ファイル作成もリアルタイムで行われる。

ここまでは割とよくありがちなエディタ共有なので特に目立ったところはない。

ポイントとしてはエディタの操作も共有されるため VSCode のブレークポイントも共有されるのでデバッグも同時に出来るところか。

### ローカルサーバ共有

個人的にこれ便利だなと思ったのがローカルサーバ共有機能で、ホスト側で「Share Local Server」からポート番号を `80` など指定すると、ホスト側のローカルのポートがクライアント側にフォワーディングされる

![Imgur](https://i.imgur.com/Y34EUM9.png)

つまり、何が出来るかというとホスト側で 80 番で Web サーバを立ち上げて共有するとゲスト側のブラウザでも `localhost:80` で動作確認出来る。

[Teleconsole](https://www.teleconsole.com/)などのツールでポートフォワーディングは出来るが別のツールとなってしまうため VSCode でポートフォワーディングを完結出来るのは大きい。

### ターミナル

コマンドは基本ホスト側からしか叩けない。基本的に主導権はホストでゲストは編集をサポートする役を想定しているのかもしれない。ペアプロなどで同時に編集する場合ホスト側からだけしかコマンド叩けないとゲスト側にコマンドについての知識がある場合ややこしくなる。なので基本的にはペアプロなどする場合はホスト側がメインで作業する側でゲストがサポート役ということになる。

出来ればターミナル共有なども出来るとうれしい。

### 他困った点など

* Linux → Windows だと IME の入力が確定するまで Windows 側に反映されないので入力しているかどうか分からない問題がある
* Windows → Linux だと IME の確定を待たずにリアルタイムで共有される
