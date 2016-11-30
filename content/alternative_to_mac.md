Title: MacBook Proを捨ててThinkpad X220を買った
Date: 2016-11-28 20:00
Category: PC
Tags: Mac, PC
Slug: alternative_to_mac
Author: shufo
Summary: Macbook Proを捨ててThinkpad X220を買った話

関連: [MacBook Proを捨ててThinkpad T460sを買ってgentooを入れた \- joker1007の日記](http://d.hatena.ne.jp/joker1007/20161125/1480069437)

## 概要

正確にいうとMBP Late 2016を買おうと思っていたのだけど結局Thinkpad X220を買った話です

今年10月の[例のイベント](http://www.apple.com/apple-events/october-2016/)で発表されたMBPは本当に楽しみにしていたし、MBP費用も貯めていたのだけど  
やっぱり欲しくなくなってしまった理由としてAppleがもう開発者の方向を向いてないかもしれない、というのをあのイベントを見て強く感じたからです。  
Appleの方向性に共感していたら買ったかもしれないけどTouchBarの方向性はちょっと支持出来なかったので…

あと最近Docker for Windowsを久しぶりに使ったらmount周りもちゃんと動いたのでWindows環境でも自分の場合は普段の開発にほとんど問題なくなったというのもあります。
自分で作ったアプリは全てDockerizeするDockerオタクなのでこういうときはさすがに恩恵を感じます。
Linuxデスクトップを導入することも考えたけどドライバ周りや普段使い、会社での相互運用性を考えると常用するには少しハードルが高いなと思いWindowsにしています。

## ThinkPad X220

### スペック

- Core i5-2660M
- Mem: 4G
- Disk: HDD 480GB
- ディスプレイ解像度: 1366x768

### MBPとの比較

- ESCがデカい
- キーボードが最高
- トラックポイントはいいぞ
- 2～3万で買える
- バッテリ持ちは悪い
- 1.5kgぐらいあるので若干重い
- パーツが大量に出回って分解も簡単なので直しやすい
- ~~スタバでMacを威嚇出来る~~

ThinkPad X220は2011年発売のモデルで、アイソレーションキーボードになる前のクラシック型のキーボードとしては最後のold ThinkPadです。
Sandy Bridge世代のCPUと高い拡張性で2016年現在でもパーツの換装を行えば十分使用可能ながら、企業からのリース品が大量に出回って中古市場で2～3万でとこなれて来てるので購入するには丁度いい頃だと思います。  
Sandy Bridgeと最新のSkylake世代のCPUを比較しても性能差は[ほぼない](http://www.cpubenchmark.net/compare.php?cmp%5B%5D=2556&cmp%5B%5D=812)のでCPUバウンドな処理を行わなければSSDとメモリ換装で最新ノートPCと比べてもほぼ遜色ないんじゃないでしょうか。  
さすがにPCIe-NVMeディスクを搭載出来るような機種にはSATA SSDに換装してもディスクI/Oで劣るけれども割り切って使うにはありだと思います。

今回は英字キーボードが国内の中古市場には見つからなかったのでeBayから輸入しましたが
日本語キーボードでよければ国内の中古市場にも十分流通してるのでそちらの方が早いと思います。

### 注文

[eBay](http://www.ebay.com/sch/i.html?_from=R40&_trksid=p2050601.m570.l1313.TR0.TRC0.H0.XX220.TRS0&_nkw=X220&_sacat=0)からThinkPad X220を検索しそこそこ状態のよさそうな品かつリース品を綺麗にしたようなものをDyminという業者から購入。

X220にはタッチパネルモデルもあるみたいだけど無駄に重くなるので普通のモデルにした。

### 配送から届くまで

- 注文後1日: 業者から発送
- 4日: eBayのGlobal集荷センターに到着(ここから長い)
- 5～14日: 海外配送
- 14～15日: 国内配送
- 16日: 到着

パーツも結構流通してるっぽいので国内中古市場で買った日本語キーボード版を英字キーボードに換装したほうが早かったかなと思いました。

### 到着

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="ja" dir="ltr">MacBook Pro届いた <a href="https://t.co/A3lKMTUrYT">pic.twitter.com/A3lKMTUrYT</a></p>&mdash; shufo (@shufo_) <a href="https://twitter.com/shufo_/status/802768934432743424">November 27, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

(ThinkPad X220です)

海外発送の送料込でちょうど3万程でした。  
全体的に使用感はほとんどなく綺麗だったけどキーボードには気にならないレベルだけどわずかに使用感あり。
ThinkPadを買うのは初めてですがこの時代のold ThinkPadは雰囲気があっていいですね。個人的にはキーボードは薄い方が好きですがちゃんとした深さがあるので無駄にガチャガチャやりたくなります。

### SSD・メモリ換装

SSDとメモリを以下に換装。
パーツ費用含めても全体で大体5万くらいでした。  
換装済みの中古品もあるけど高くつく割には容量が少なかったりするので手間をかけられるなら自分で換装した方が安く高スペックに出来ます。

#### SSD

- Crusial MX300 525GB

交換手順参照: [ThinkPad x220 SSD交換\(Apacer/SanDisk\) \| 003SH 解体新書](http://003sh.ou-net.com/blog/?p=1114)

#### メモリ

- Transcend PC3L-12800 DDR3L 1600 8GB×2

交換手順参照: [ThinkPad X220 増強作戦 その１ ： 1万円でメモリを16GBに増設 \- きままテック](http://kimamatech.blog.fc2.com/blog-entry-49.html)

## まとめ

MBPの代替としてThinkPad X220を買った。  
モバイル出来るUnixとしてMacは好きなのだけど最近のAppleの方向性からロックインが強くなることの懸念も含めてノートPCから変えてみました。(まだiPhoneは使ってる)

最近のWindows開発環境としてはbabun + Docker for Windowsがあれば個人的に困ることはほぼなくなって来たのであとはWSLのbashの完成度がより高まればいよいよWindowsでも十分だなと思います。  
Linuxデスクトップは[elementary OS](https://elementary.io/ja/)が気になっているのでmSATA SSDを追加してデュアルブートにでもしてみようかなと思います。

## 他候補

MBPオルタナティブのノートPCとしては

- [Razer Blade Stealth](http://www.razerzone.com/gaming-systems/razer-blade-stealth)
- [Dell XPS 13](http://www.dell.com/jp/p/xps-13-9360-laptop/pd)

がスペックと価格のバランスがよかったので検討していたのだけど自分のノートPCの使用頻度に対してはオーバースペックすぎたので候補から外れました。

## 追記 2016-12-01

到着後Windows7からWindows10 Proにアップグレードしバッテリーのファームウェアをアップグレードしようとしたらバッテリーが死にました…
ファームウェアをアップデートする前はバッテリーを認識していたので恐らくファームウェアの書き換えに失敗したようです。

### バッテリー追加

結局以下の互換バッテリーをAmazonでポチりました  
元は9セルでX220本体からバッテリーがはみ出していたのが筐体の枠にちょうど収まりました  
公式じゃないですけど今のとこ問題ないです  
安いし物理的に取り外しし易いからバッテリーが心配な時は何本か持ち歩くってのもありですね

<blockquote class="imgur-embed-pub" lang="en" data-id="a/wiq4p"><a href="//imgur.com/wiq4p"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

[WorldPlus バッテリー LENOVO ThinkPad X230 X230i X220 X220i X220s 対応 6セル](http://amzn.asia/bjrtGpW)