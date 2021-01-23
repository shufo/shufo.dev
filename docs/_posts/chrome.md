---
author: shufo
feed:
  enable: true
draft: false
title: 令和最新版を殺すChrome拡張機能を作った
date: 2021-01-24 00:00:00 +0900
tags:
- Chrome
- extension
- tools
slug: published-amazon-3rd-party-seller-filter-chrome-extension

---
#### TLDR

Amazonが販売元の製品しかAmazon上の検索結果に表示されなくなるChrome拡張機能を作った

[Amazon 3rd party seller filter - Chrome ウェブストア](https://chrome.google.com/webstore/detail/amazon-3rd-party-seller-f/gmfbegokkdolaokghlfnohddllgbbohd?hl=ja&authuser=0) 

例えば現在Amazon.co.jpで [「イヤホン」で検索](https://www.amazon.co.jp/s?k=%E3%82%A4%E3%83%A4%E3%83%9B%E3%83%B3&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss) すると以下のようにいわゆる令和最新版臭のする製品が検索トップに来る惨状だけど

![](/assets/img/uploads/2021-01-23-screenshot_12.png)

拡張を有効化すると以下のように第三者販売元がフィルタリングされてパナソニックとソニーのイヤホンがトップに来るようになる

![](/assets/img/uploads/2021-01-23-screenshot_13.png)

拡張を一時的に無効化して検索結果を戻したい場合はツールバーよりアイコンをクリックするとリセットされる

![](/assets/img/uploads/2021-01-23-screenshot_14.png)

元ネタ: [闇市化するAmazon「裏コマンド検索」で絞り込む](https://radiolife.com/internet/amazon/45201/)

#### Amazon闇市化問題

近年のAmazonは3rd party販売元が販売する商品が非常に多くなってきており、Amazon自体が販売する商品の方が少ないくらいになってきている

その中でもいわゆる**令和最新版**イヤホンがちょうど令和に入り初めたあたりから検索上位や大型セールの度に食い込んできていて一定の存在感を放っていた

![](/assets/img/uploads/2021-01-23-screenshot_10.png)

いつ頃からか分からないけどそういったAmazonが販売元でない第三者販売元がレビューへのリワードや大型セール前の価格変動による見かけ上の値下げで表示順位を最適化しAmazonプラットフォームをハックするような形で頻繁に目につくようになった

もはや概念と化した令和最新版↓

![](/assets/img/uploads/2021-01-23-screenshot_9.png)

実際にこれがSEOとして有効なのかも分からないしそういったSEO最適化のノウハウが共有されているのかも分からないけど最近は電化製品、服飾、工具…など勢力が広がってきており、手軽に代表的な製品を検索したい時などにかなり邪魔になっていた

自分がある程度見識のある分野ではあー令和最新版多いなぁぐらいで気にしないけど問題になるのが**自分の知らない分野**で検索する時で、検索ワードを入力してざっとどんな代表的なブランドがあるか把握してその上でいわゆるエントリーレベルのコピー製品も含めて比較評価をしたいのだけど、令和最新版くん達は同じ製造元のOEMを別ブランド名で売っていたりそもそもメーカー名も定期的に入れ替わったりしつつ的確に検索上位に上がってくるのでそれが**代表的なブランドなのかコピー製品なのか区別がつかない**問題が発生していた

もちろん価格性能比で言えば確かに当たりと言える製品もあるし下手なブランドを超えているものもなくはないが大抵ガチャでしかなく金をドブに捨てるケースもままある実質上級者向けの遊びとなっている

[Amazon’s Choiceマーク付きのFullHD 60fps対応HDMIキャプチャデバイスが治安悪い | muo-ya](https://b.muo.jp/2021/01/12/hdmi-capture.html)

HDMIキャプチャデバイス界は特に魔境となっておりハードウェアの性能とソフトウェアの性能が絡み評価が難しいわりに配信需要やテレワーク需要などで専門家でもなくても買う人が多いため令和最新版が多い

この手の中華デバイスを足がかりに一定の評価のある製品にステップアップするというルートもあるのでありがたい場合もあるのだけど時間がない時は最短ルートで代表的製品にしぼりたい

という訳でこの[Amazon 3rd party seller filter Chrome Extension](https://chrome.google.com/webstore/detail/amazon-3rd-party-seller-f/gmfbegokkdolaokghlfnohddllgbbohd?hl=ja&authuser=0)を作った

Ali Expressの謎の電子製品をディグるような闇市を掘るような楽しさはあるけど大抵一回痛い目を見るともう最初から定評のあるやつ行くわとなるので闇市感に疲れた人は使ってみてください