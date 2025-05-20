---
title: Ugreen Nasync DXP 4800 Plusを導入した
author:
  - shufo
datetime: 2025-05-19T20:00:00+09:00
tags:
  - NAS
slug: ugreen-nasync-dxp-4800-plus
---

## TL;DR;

[Ugeen Nasync DXP 4800 Plus](https://nas.ugreen.jp/) を自宅環境に導入した。

## 初 NAS

自分が NAS を導入するのはこれが初めてになった。

なぜ今まで NAS を導入していなかったかというと、Synology や QNAP などの大手 NAS プロバイダの存在は認識していたものの、エンプラ感が強くコンシューマーへの対応ってどうなの？というところで踏み込めずにいた。（Synology が最近[対応 HDD を認定 HDD に限定したり](https://gigazine.net/news/20250418-synology-plus-certified-drive/)とエンタープライズ寄りになってきている）
日本では Buffalo や IO-Data などがコンシューマー向け NAS を出しているが今までそれらのメーカーの製品のルーター等のソフトウェアであまりいい思いをしてきていなかったのでこれも見送ってストレージの運用コスト、データ滅失リスクも考えてトータルではクラウドストレージに分があると思いお茶を濁していた。

しかし [OneDrive の値上げ](https://jfs.or.jp/jfs-cs/microsoft-office-price-up2025/)（というか Microsoft365 自体の値上げ）や、そもそもクラウドに預けているデータは原理的にクラウドプロバイダの検閲や任意のタイミングで削除が可能であること、機械学習の学習素材に使うことが可能などデータ所有権に関する問題も以前から気になっており、改めてデータ所有の主体については見直したいなとは思っていた。

2010 年代の SaaS/クラウド 一辺倒な時代も既に 10 年以上経過し、良いところも悪いところもはっきりし始め、改めて何を所有し、何を所有しないかを意識的に行う時代になって来たんじゃないかと思っている。

そんなわけで以前からアルミニウムを使用した製品でケーブルや充電器、バッテリー等で質の高いハードウェアを展開してきており、個人的にも信頼を寄せていた Ugreen が NAS を出すということで、近年のセルフホスティング熱の高まりのタイミングもあり購入した。

購入の決め手としては OS となる UGOS が [Debian ベース](https://www.techpowerup.com/review/ugreen-nasync-dxp4800-plus/5.html) であることも大きかった。Synology や QNAP など大手の組み込み OS は ベースに Linux カーネルを使ってはいるものの、特定のディストリビューションは使っておらずパッケージマネージャも独自のものとなり、また OS がハードウェアに強く依存し別の NAS OS に入れ替えが出来ない互換性、移行性の懸念も強かった。具体的には CPU や命令セット、搭載可能なメモリなどの制限で移行が難しいことが多いようだ。

その点 Debian ベースであれば同じく Debian ベースの [True Nas Scale](https://en.wikipedia.org/wiki/TrueNAS) へ理論的には移行することも可能で、また[実際移行を試した](https://nascompares.com/guide/truenas-on-a-ugreen-nas-installation-guide/)という記事も何個かあったため最悪 UGOS の提供が終わっても TrueNas などの汎用 NAS OS に乗り換えることでハードウェアをそのまま利用出来ると考えた。

|     | Ugreen (UGOS) | Synology (DSM)           | QNAP (QTS)               |
| --- | ------------- | ------------------------ | ------------------------ |
| OS  | Debian ベース | Linux ベース独自カスタム | Linux ベース独自カスタム |

Ugreen Nasync 自体は実は 1 年程先行して Ugreen US などで 10 億円を超える売上の販売をしており既に販売実績や稼働実績もあり、その間大きな問題も出ていなさそうというのも買うに当たって大きな決め手となった。（Ugreen Nasync の [Reddit コミュニティ](https://www.reddit.com/r/UgreenNASync/)などを参考）
ハードウェアとソフトウェアが関わる NAS のような領域は稼働実績こそが正義みたいなところはあるのでそこで NAS 業界新参の Ugreen が実績を出しているのは期待しても大丈夫なんじゃないかと考えた。

## 高い品質のハードウェア

製品が届いてまず一見して分かったのは Ugreen が培ってきたアルミニウム加工製品のノウハウが生かされておりビルドクオリティの高い筐体になっていることだった。

公式サイトより DXP 4800 Plus のイメージ
![Pasted image 20250512195019](https://i.imgur.com/lEZfU8u.png)

正直今まで他の NAS の導入を見送ってきたのも気に入るデザインや質感の筐体が無かったというのもあった。
いわゆる一般的な NAS は NAS の用途からいかにも業務用途面したものも多くコンシューマー向けでもいかにもストレージと言わんばかりの無骨なデザインのものが多い。

![Pasted image 20250512195648](https://i.imgur.com/dFAQ9Mm.png)

その点 Ugreen はまず部屋置きしても違和感なくガジェットの一部のように見えるようなデザイン設計をしているように思える。スペースグレイの筐体に 1,2,3,4 とナンバーを振ったドライブベイを前面に出しており、誰でもここに HDD が 4 台入るんだと分かる。NAS を運用するという観点からするとナンバーというもの自体には意味はないのだけど、あえてナンバーを振ることで印象的な意匠になっている。また筐体 4 面がフラットになっておりこれも他の NAS には無いようなデザインで Ugreen の筐体デザインへのこだわりを感じる。

充電器やバッテリーなどのガジェットを得意とするメーカーだからこそ出来たガジェット感のあるプロダクトという感じでこのデザイン面はとても満足している。他の Ugreen 製品と合わせて統一感を出すのもいいと思う。

## ソフトウェアも手抜きなし

ハードウェアの完成度が高いのは他でも既に指摘されていたので置いておくとして、ソフトウェアの方はどうかというと、UGOS がリリースされてから 1 年程度経っており思ったより全然成熟していた。
正直 Ugreen といえば USB ハブやチャージャー、モバイルバッテリー等ハードウェア企業の印象が強かったのでソフトウェアはどんなものかとやや不安だったがそれは杞憂で、普通に使う分には何も問題なく、何より初回の導入が抜群に分かりやすいのがよかった。

モバイルアプリネイティブで、ルーターにさえ繋げば全ての作業がスマホで完結するというのも体験が良かった。
NAS 初心者でもクラウドストレージを導入する程度の感覚で導入出来るのが分かる。

コンシューマ向けであることを意識していて余計な説明を省くことで裏でよしなにやってくれる感じ。

以下は PC 用アプリから操作
![ugreen nas](https://i.imgur.com/8ZGFSgU.png)

基本的なユーティリティはそろっており、ファイラ、画像閲覧、映像閲覧、docker 管理、タスクマネージャ、同期アプリなど揃っている。またクラウドドライブで OneDrive や GoogleDrive と接続も出来る（ただ自分が試した時は API コール時に同期エラーになって同期は出来なかったり、ファイル名の日本語が文字化けしたりでまだ成熟していないようだった）

アプリの UI/UX も気を使っているのが分かり、この点でも他社の業務面したアプリに比べ競争優位性を感じる。
正直 NAS を運用するに当たってアプリのフィーリングにいかにもな業務感があるとプライベートなのに仕事してる感が出るので全体的にリラックスした雰囲気を感じるモダンな UI も気に入っている。
[今後のアップデート](https://nas.ugreen.com/pages/system-update) も精力的に行われるようなのでその点も期待している。特に NAS の場合運用が長期に渡るのでどれだけの期間サポートされるのかも評価に当たっては重要になる。

## [Tailscale](https://tailscale.com/) で安全な NAS アクセス

近年の NAS はクラウド経由で自宅 NAS にアクセス出来ることが売りのものが多くあり、 Ugreen Nasync も例にもれず [UGLink](https://www.ug.link/) という機能で外出先から透過的に自宅 NAS へアクセス出来ることを売りとしている。

以下は Synology Quick Connect の例.
![Pasted image 20250513054411](https://i.imgur.com/LGE1i8K.png)

仕組み的には Synology などが提供するものと大きく変わりはないだろうが要は最初にトンネルを開けるための情報をサーバ経由でやり取りし、以降はダイレクトにトンネル経由でリクエストをやり取りするか、NAT などが存在する場合リレーサーバ経由で暗号化されたデータがやり取りされるような仕組みとなる。

Ugreen NAS でもリモート機能セットアップ時に発行される UgreenLinkID を使えば、自宅の外にいる時は UGLink 経由で、自宅内にいる時は LAN でアクセス出来る。（自動的に判別される）

しかし近年 NAS をターゲットとしたランサムウェア被害の[侵入原因の多くがこのクラウド接続機能](https://quickman-pc.com/notice/20220930-ransamware/)であることも事実なので、パブリックなログインインターフェースは塞いでおくに越したことはない。多くの人にとっては事実上そこが唯一のアタックサーフェスとなるため。また UGLink のサーバ自体の可用性にも影響されるので将来的に UGLink の提供が中止となるなどした場合外出先から使えなくなるリスクもある。

ただこれは持っているデータの重要性とのトレードオフなので重要なデータが無ければメーカー提供のクラウド機能を使うという選択肢も十分ありえる。

その上で穴を塞いだ上で同等の機能を実現するソリューションとして [Tailscale](https://tailscale.com/) がある。これは Tailscale をインストールしたマシン間を [Wireguard](https://ja.wikipedia.org/wiki/WireGuard) 上に構築されるメッシュ VPN で接続することが出来るサービスで、とにかく導入が簡単かつ軽量というのを特徴としている。

Ugreen NAS 上への導入も簡単で基本的には Docker Compose で起動したコンテナを起動しつづけておくだけではある。

まず [Tailscale](https://tailscale.com/) 公式の Settings -> Keys の[Auth Key 生成ページ](https://login.tailscale.com/admin/settings/keys)から Auth Key を生成する
その際**Reusable を On**にしておく

![Pasted image 20250512220314](https://i.imgur.com/fsGttgb.png)

UgreenNas の Docker アプリを起動しプロジェクト作成 →
プロジェクト名: tailscale
保存フォルダ: 自動入力
compose yaml に以下を記述

```yaml
services:
  tailscale:
    container_name: tailscale
    image: tailscale/tailscale:latest
    restart: always
    volumes:
        - ./tun:/dev/net/tun
        - ./lib:/var/lib
    environment:
        - TS_AUTH_KEY=your_keys_goes_here
        - TS_STATE_DIR=/var/lib/tailscale
        - TS_ROUTES=192.168.68.0/22
    network_mode: host
    privileged: true
```

先程コピーした Auth Key で上記の**TS_AUTH_KEY**を置き換える
また TS_ROUTES は UgreenNas を設置している LAN のサブネットレンジを指定する

![Pasted image 20250512220646](https://i.imgur.com/K9aABac.png)

この状態でデプロイすると Tailscale のコンソールのマシン一覧に Ugreen Nasync が現れる。

![Pasted image 20250512220833](https://i.imgur.com/CKsee7W.png)

現れたら右の...ボタンから**Disable Key Expiry**をクリックしデプロイキーが Expire しないようにする。

![Pasted image 20250512220949](https://i.imgur.com/ke0olFA.png)

これで Tailscale のネットワーク内に Nasync が常時接続している状態になる。これにより例えばスマホやタブレットに Tailscale を入れ、Tailscale の IP アドレスでアクセスすれば自宅 LAN で動かしているのと同じように透過的に NAS にアクセス出来るようになる。

構成イメージ図
![Pasted image 20250518233828](https://i.imgur.com/swj6kNk.png)

これによりクラウドのログイン画面から攻撃者にログインされ、ランサムウェアで NAS を暗号化されてしまうというような被害を防げる。

ただこれは侵入経路の一つを塞いだに過ぎず NAS の接続元 PC がマルウェアに感染して同一 LAN 内に脆弱な NAS が存在すれば侵入されてしまうことには変わりないので、自宅に重要なデータ機器が存在するということを意識して Ugreen Nas 自体のバックアップ、堅牢化などは別途行う必要はある。

Tailscale 自体はとても軽量で同一ネットワーク内であればレイテンシも 1 ミリ秒増えるかどうか程度なので外出用ラップトップや携帯の NAS クライアントではホームの LAN 内でも Tailscale 経由でマウントするようにした。

具体的には Tailscale の [MagicDNS](https://tailscale.com/kb/1081/magicdns) 機能により自動的に各ホストに DNS 名が振られるのでその名前でホストを解決してマウントしている
。
Linux (Fedora) からは MagicDNS 名でマウントし

```bash
$ sudo mount -t cifs //dxp4800plus/personal_folder /mnt/dxp4800plus -o username=********,password=********,file_mode=0755,dir_mode=0755,uid=shuhei,gid=shuhei

```

携帯からは [Tailscale Docker Proxy](https://github.com/almeidapaulopt/tsdproxy) で https リクエストを実際のポートへプロキシし、自宅、WAN 関わらず透過的にログイン出来るようにしている。

![Pasted image 20250519001527](https://i.imgur.com/7Fz0A46.png)

[Tailscale Docker Proxy](https://github.com/almeidapaulopt/tsdproxy) は Docker で起動しているコンテナのラベルとデフォルトポートから自動的に Docker 内のコンテナへプロキシするための Tailscale ノードを作成しまた Tailscale の https 証明書発行機能も使い自動的に HTTPS にした状態で安全にプロキシしてくれる。

Tailscale Docker Proxy の使い方:

1. まず Tailscale Docker Proxy のコンテナを起動する

```yaml
services:
  tailscale-docker-proxy:
    image: almeidapaulopt/tsdproxy:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - datadir:/data
    restart: unless-stopped
    environment:
      # 上記で発行したのと同じTailscaleのAuthキー
      - TSDPROXY_AUTHKEY=tskey-auth-~~~~~~~~~~~
      # DockerホストのIPアドレス
      - TSDPROXY_HOSTNAME=192.168.68.62
      - DOCKER_HOST=unix:///var/run/docker.sock

volumes:
  datadir:
```

2. その後 Tailscale 経由でアクセスしたいサービスのコンテナにラベルを付与する (以下は [Emby](https://emby.media/) を使う例)

```yaml
services:
  emby:
    image: lscr.io/linuxserver/emby:latest
    container_name: Emby
    environment:
      TZ: Asia/Tokyo
      PUID: 1000
      PGID: 1000
    labels:
      tsdproxy.enable: "true"
      tsdproxy.name: "emby"
      tsdproxy.container_port: 8096
    ports:
      - 8096
    volumes:
      - ./config:/config
      - /volume1/~~~:/tvshows
      - /volume1/~~~:/music
      - /volume1/~~~:/movies
    devices:
      - /dev/dri/renderD128:/dev/dri/renderD128
      - /dev/dri/card0:/dev/dri/card0
    restart: unless-stopped
```

以下の箇所がプロキシオプションの指定箇所で意味としては `enable` で有効化, `name` で実際にアクセスする際のサブドメイン（`<name>.<tsnet ドメイン名>` となる）、container_port はトラフィックをルーティングするポートを明示的に指定する（指定しなければコンテナ定義のデフォルトの Expose ポートとなる）

```yaml
    labels:
      tsdproxy.enable: "true"
      tsdproxy.name: "emby"
      tsdproxy.container_port: 8096
```

これにより例えば tsnet 名が your-network.ts.net であれば

`https://emby.your-network.ts.net` で暗号化された状態でブラウザで Emby へアクセス出来るようになる。逆に言えば Tailscale へ接続しないとセルフホスティングしているアプリにアクセス出来ないのだけど、例えば家の中の脆弱な IoT 機器が乗っ取られ、脆弱なセルフホスティングアプリを踏み台にして NAS 本体へ権限昇格してしまうといった被害も防げるのでたかがセルフホスティングと言えど長く運用するためには LAN アクセスでも VPN を使い堅牢化をしておいて損はない。

またコンソールアクセスは以下のように tailscale 用コンテナにラベルを付加し `https://dxp4800plus-console.~~~~.ts.net` で透過的にコンソールへアクセス出来るようにした。

```yaml
services:
  tailscale:
    container_name: tailscale
    image: tailscale/tailscale:latest
    restart: always
    volumes:
        - ./tun:/dev/net/tun
        - ./lib:/var/lib
    environment:
        - TS_AUTH_KEY=tskey-auth-~~~~~~~~~~~
        - TS_STATE_DIR=/var/lib/tailscale
        - TS_ROUTES=192.168.68.0/22
    network_mode: host
    privileged: true
    labels:
      tsdproxy.enable: "true"
      tsdproxy.name: "dxp4800plus-console"
      tsdproxy.container_port: 9443
      tsdproxy.scheme: https
      tsdproxy.tlsvalidate: false
```

ただこの状態だと Web クライアント/Windows クライアントで Nasync のファイラを開いた時 EventStream タイプのリクエストのプロキシに失敗してルートディレクトリを開けなかった（モバイルクライアントは叩いてる API が違うのか問題なかった）。

![Pasted image 20250519010211](https://i.imgur.com/zTA6BpD.png)

この構成自体は NAS のハードウェアに関わらず汎用的な構成なので Docker が動き Tailscale が動作する環境なら基本的にどの環境でも再現出来る。

### NAS バックアッププラン

Ugreen Nas 自体のバックアップは今のところ別の NAS を用意して Rsync などで定期バックアップを行うという想定でいる。正直それは専用の NAS アプライアンスである必要もないので汎用 PC に [TrueNas](https://www.truenas.com/)/[Unraid](https://unraid.net/)/[HexOS](https://hexos.com/) でも入れて冗長性無しで運用しようと思っている。（ちょうど MS-01 が 1 台余ってるのでオールフラッシュ NAS にするのもありか）。

- NAS
    - NAS 本体と異なる OS にすることで同じ脆弱性を突かれるリスクを低減させておく
        - 候補
            - TrueNas
            - Unraid
            - HexOS
- 外付け HDD/USB フラッシュドライブ
    - コスト面では最安
    - バックアップ自体の時間がかかる
    - セキュリティ保護はないため Nas にランサム被害があると同時に暗号化されてしまうリスクはある
- クラウド
    - 災害、盗難なども考慮するとクラウドが最も安全だがデータの重要性に左右される
    - コスト面はそれなりにかかる（BackBlaze でも年 99 ドル)
        - バックアップから復旧する場合も引き出すためのコストが必要
    - またサービス自体の継続性にも左右される
    - S3 互換ストレージ
        - AWS S3
        - BackBlaze B2 等

### 稼働中アプリケーション

以下のアプリケーションを今のところ Ugreen NAS で稼働させている

- tailscale
    - 公式クラウド接続機能代替の軽量 VPN
- tailsacle-docker-proxy
    - tailscale 上で docker コンテナへのルーティング、及び証明書自動作成などを行う
- Nginx Proxy Manager
    - tailscale 外で 各種サービスへ proxy する用
- [n8n](https://n8n.io/)
    - オートメーションプラットホーム。IFTTT や Zapier 代替
- [Adguard Home](https://github.com/AdguardTeam/AdGuardHome#getting-started)
    - tailscale を有効にしているとモバイルで Adguard が使えないので Adguard Home を立て、Tailscale DNS で DNS サーバとして指定している。これにより Tailscale net 内であれば自動的に DNS ブロッキングされ有害な広告やフィッシングサイトがブロックされる。
- [Jellyfin](https://jellyfin.org/)
    - メディアホスティング。音楽、動画等
- [komga](https://komga.org/)
    - 漫画等書籍のホスティング
- [metube](https://github.com/alexta69/metube)
    - Youtube 等の動画をローカルへ永続化する Downloader
- CouchDB
    - [Obsidian self hosted Live Sync](https://github.com/vrtmrz/obsidian-livesync) で使用し Obsidian のノートを同期している。

けっこうなアプリケーションを稼働させているが待機時 CPU 使用率は数％程度で処理能力には余裕がある。
Ugreen Nas は docker がプリインストールされていたり、他のいくつかのプリインストールアプリも docker で起動されるのが前提で、ただの NAS だけとしてだけでなくホームサーバとして運用されることを想定しているように思える。

## まとめ

概ね初 NAS としては満足する結果となった。クラウドによるサブスクビジネスも一周した感がある昨今、改めてホームサーバやセルフホスティングなどが盛り上がりを見せ Ugreen がこのタイミングで NAS 製品を投入したのはよく機が熟したのを見計らったうまいマーケティングだったと思う。

SSD がコモディティ化し HDD が容量面でまだ進化の余地を残し、Tailscale (Wireguard) などの新しい VPN 技術も成熟し、10GbE も手の出せる値段に落ち着き始め、Docker 経由で簡単にセルフホスティングアプリケーションを運用出来るようなインターフェースも用意されるなど前提条件が一通り揃った感があるので、NAS を導入しホームクラウドでデータ管理及びアプリケーション運用を始めるにはちょうどいいタイミングだと思う。
