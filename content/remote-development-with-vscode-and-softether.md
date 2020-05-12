title: VSCode Remote SSH + SoftEtherでリモート開発の夢を見る
Date: 2019-05-09
Status: published
Tags: VSCode, VPN
Category: development
Slug: remote-development-with-vscode-and-softether
header_cover: /assets/softether_vpn.png
cover: /assets/softether_vpn.png
twitter_image: /assets/softether_vpn.png
og_image: /assets/softether_vpn.png

先日VSCodeで[VSCode Remote SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)拡張機能がMicrosoftからリリースされた。

これは何をしてくれる拡張かというとSSHでリモートサーバに接続し特定のディレクトリをマウントすることが出来、更にマウントしつつVSCodeの拡張はそのまま使えたり、ポートフォワーディングでリモートのポートをローカルに公開出来るのだ。今までもリモートサーバをsshでマウントしたりファイル更新をトリガーに同期することでリモートサーバでの開発は出来たが、この拡張はその辺りの自分でやると面倒になりがちなマウントやssh接続ターミナル、ポートフォワーディング等をまとめて提供してくれる。

2019/05/09現在まだStableのVSCodeではこの拡張機能は使えないので[VSCode Insiders](https://code.visualstudio.com/insiders/)から先行公開版のVSCodeをダウンロードして使う。

インストールするとVSCode Insidersというアプリ名で使えるようになる。Linuxなら`code-insiders`というコマンドがインストールされる。

リモートサーバはSSHで到達出来るLinuxサーバなら何でもよい。(WindowsとMacは未対応)

用途としては

- 自宅や会社のPCにリモートからログインして開発
- クラウド上のLinuxサーバをリモートサーバとして開発
- WindowsやMacマシンで仮想Linuxホストをマウントして開発(VMやコンテナ)

などが考えられる

自分は普段家で作業する時はデスクトップで作業しているが出先でノートPCを使う時にはファイルシステムを同期する必要があるので作業内容を一旦GitHubにコミットするなどしていたのだけど、案外面倒なのでどうしようか悩んでいたところこの拡張が公開されたのでVPN接続で家のPCをリモートサーバにしてシンクライアントのような開発環境を実現してみた。

![](/assets/softether_vpn.png)

### SoftEther

VPN接続を実現するのに最初はルータのVPN機能を使おうかと思ったけど自宅はIPoE環境なのでL2TP/IPSecを実現するには意外と面倒ということが分かった。

IPoEなのでほぼグローバルアドレスが変化することはないがDDNSは必要だし、クライアント側でのVPN接続の設定も必要。

VPN接続設定もOSによってバラバラだし分かりづらい。

他に何か簡単に実現するソリューションはないかと探したところオープンソース版の[SoftEther](https://www.softether-download.com/?product=softether)を見つけた。

SoftEtherではWindowsやMac OSX, Linuxなどをサーバにしてクライアントは専用のSoftEtherクライアントを使う。
クライアントもWindows, Linux, MacOSXと対応しているので統一されたインターフェースでVPN接続が出来る。（LinuxはCUIだけど）

この専用クライアントというのが重要でOSデフォルトのVPN設定インターフェースはOSごとに名称が異なったり、入力項目も様々なためVPN接続に問題が発生した場合の問題切り分けが難しい。

![](/assets/2019-05-09_22h34_03.jpg)

SoftEther Serverをインストールし、管理用クライアントから接続するとこのようなインターフェースが表示される。
ここで表示されるDDNSホスト名をVPN Clientの接続先として使用する。

またSoftEtherはIPv6に対応しており、DDNSも自動で設定されるためIPoE環境でも特に追加設定は必要ない。

上記で作成した仮想ハブが仮想ネットワークを構築し、仮想ハブに接続されたクライアント同士で通信が可能になる。
仮想ハブから物理LANにブリッジして、物理的なLANセグメントと通信するにはローカルブリッジ用にプロミスキャスモードに対応した物理的なNICが必要で無線LANカードは通常対応していない。

自分の環境ではリモート接続したいサーバも無線LANで接続していた。
そのため接続したいリモートサーバにもSoftEther Clientを入れ、SoftEther Serverに接続させリモート接続クライアントと同一の仮想ハブに接続することでクライアント-サーバ間の通信を可能にした。


### VPN Client Install

```bash
$ wget https://github.com/SoftEtherVPN/SoftEtherVPN_Stable/releases/download/v4.29-9680-rtm/softether-vpnclient-v4.29-9680-rtm-2019.02.28-linux-x64-64bit.tar.gz
$ tar xvf softether-vpnclient-v4.29-9680-rtm-2019.02.28-linux-x64-64bit.tar.gz
$ cd vpnclient
$ make 
```

VPNクライアント側では接続設定を作成し接続する

```
$ sudo ./vpnclient start
$ sudo ./vpncmd         
vpncmd コマンド - SoftEther VPN コマンドライン管理ユーティリティ
SoftEther VPN コマンドライン管理ユーティリティ (vpncmd コマンド)
Version 4.29 Build 9680   (Japanese)
Compiled 2019/02/28 19:22:54 by yagi at pc33
Copyright (c) SoftEther VPN Project. All Rights Reserved.

vpncmd プログラムを使って以下のことができます。

1. VPN Server または VPN Bridge の管理
2. VPN Client の管理
3. VPN Tools コマンドの使用 (証明書作成や通信速度測定)

1 - 3 を選択: 2

接続先の VPN Client が動作しているコンピュータの IP アドレスまたはホスト名を指定してください。
何も入力せずに Enter を押すと、localhost (このコンピュータ) に接続します。
接続先のホスト名または IP アドレス: 

VPN Client "localhost" に接続しました。

VPN Client>
```

接続設定作成

```
VPN Client> AccountCreate VPN_Server /SERVER:vpn12345678.softether.net:443 /HUB:VPN /USERNAME:shufo /NICNAME:VPN
```

パスワード設定

```
VPN Client> AccountPasswordSet VPN_Server /PASSWORD:myPassWord /TYPE:standard
```

起動時自動接続

```
VPN Client> AcccountStartupSet VPN_Server
```

VPNサーバ接続

```
VPN Client> AccountConnect VPN_Server
```

インターフェース確認

```
$ ip a
~中略~
14: vpn_vpn: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UNKNOWN group default qlen 1000
    link/ether 5e:07:43:55:41:2c brd ff:ff:ff:ff:ff:ff
    inet6 fe80::5c07:43ff:fe55:412c/64 scope link 
       valid_lft forever preferred_lft forever
```

inet6でIPv6アドレスが振られていることが分かる
SSH接続する際はこのアドレスとインターフェース名が接続先となる

同様にリモート接続クライアントでも接続設定を作成しVPNサーバに接続出来たらSSHの接続性を確認する

```
$ ssh fe80::5c07:43ff:fe55:412c%vpn_vpn
```

IPv4アドレスでのSSH接続とは異なり末尾に`%vpn_vpn`とついてることが分かる。

ssh_configの設定では`%%`とすることで%の代わりになる

```
Host remote
    HostName fe80::5c07:43ff:fe55:412c%%vpn_vpn
    User shufo
    IdentityFile ~/.ssh/id_rsa
```

接続性確認

```
$ ssh remote
```

SSHでの接続性が確認出来ればVSCodeでのSSH Remote機能が利用出来るようになる。
デフォルトではssh_configに設定された接続設定を使える

![](/assets/2019-05-09_23.28.14.png)

Remote SSH to Hostで先程設定して接続設定を選ぶ
すると新しくウィンドウが開けばRemote SSH接続が完了する。

![](/assets/2019-05-09_23.41.00.png)

ファイル一覧からOpenFolderボタンをクリックしマウントするディレクトリを選ぶ

![](/assets/2019-05-09_23.30.08.png)

マウントが完了するといつも通りローカルで開発しているようにファイルを扱えるようになる。
もちろん拡張機能も動作する

![](/assets/2019-05-09_23.46.54.png)

またポートフォワーディングによりローカルのポートをリモートにフォワーディングすることが出来るので、例えばローカルの8000番にアクセスしたらリモートの8000番にフォワーディングして開発サーバプロセスにアクセスするみたいなことも出来る。

といった感じで一通りの機能が揃っているのでリモート開発を快適に進めることが出来る。

とここまで書いてきてなぜこの機能の反響が大きかったのかを考えると、今までもリモートのファイルシステムをマウントしたりport forwardingは手動でやればリモート開発を実現出来たが、初期設定とその設定の維持に忍耐力を要求されるものであり敷居の高さが問題だったのかなと思った。

正直その手のhackでリモート開発を実現するくらいなら最初からローカルで開発するかLinuxマシンで開発するというソリューションに辿り着くのは、その一手間が大きく開発体験を損なうものであり耐えられないものだったと。

開発者がやりたいのはただまともなPOSIX互換環境でコードを編集したいだけなのに開発環境を開く度にSSHでログインしたりポートフォワーディング設定したり、といったことがあるとちょっと思いついたコードを書くにも一手間になる。

それが軽量なVSCodeでエディタを開いたら即ディレクトリがマウントされるというのは開発体験としてはほぼローカル開発に近い。

今までも同様なリモート開発はEclipseのプラグインなり、手動でSSHFSでマウントするなりSFTPでファイルシステムを同期するなりで実現は出来たけど車輪の再発明とならないのは開発体験の大きな向上という点がある。

[Windows Terminal](https://devblogs.microsoft.com/commandline/introducing-windows-terminal/), [WSL 2](https://devblogs.microsoft.com/commandline/announcing-wsl-2/), [Visual Studio Online](https://techcrunch.com/2019/05/06/microsoft-launches-visual-studio-online-an-online-code-editor/), EdgeのChromium採用などDXへの取り組みの一環としてVSCodeを中心としたエコシステムが上手く回っていて最近のMicrosoftはおもしろい。
