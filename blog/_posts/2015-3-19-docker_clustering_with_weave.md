---
title: マルチホストdocker環境でのBlueGreenなデプロイメント
date: 2015-03-19 13:00
tags: 
  - docker
  - weave
  - swarm
  - compose
  - consul
permalink: weave_swarm_compose
author: shufo
description: Weave / Swarm / Compose / Consulでdockerのクラスタリング
---

## Overview

dockerをそれなりに扱おうと思うと直面するのがマルチホスト環境でのdockerの構成。  
大抵シングルホストのプリミティブな環境では問題無かったL3/L4の扱い、IPアドレス、ポート等のメタデータのリソース管理が問題になってくる。  
前者に関しては、ルーティングコンテナ経由でのパケット交換、cgroup/namespaced、Open vSwtichなどでSDNを実装、   
L3/L4を抽象化し仮想的に１つのネットワークとして扱えるようにすることで解決をしようという動きがある。
代表的なソリューションとしては[socketplane](https://github.com/socketplane/socketplane), [weave](https://github.com/zettio/weave), [pipework](https://github.com/jpetazzo/pipework), [flannel](https://github.com/coreos/flannel), Open vSwitch等のソリューションがある。  

後者に関して分散Key Valueストアにコンテナのメタデータを登録し必要に応じてクラスタの構成情報を読み出す  
ことで解決しようとする動きがある。
代表的なソリューションとしては[Consul](https://www.consul.io/)、[etcd](https://github.com/coreos/etcd)、[zookeeper](http://zookeeper.apache.org/)等がある。  

## マルチホストdocker環境で辛いところ

- L3/L4管理
- コンテナの配置スケジューリング
- マルチホストでのメタデータ管理

## やりたいこと

- L3/L4の自動管理
- スケジューリングの自動化
- コンテナライフサイクル管理の自動化
- configのdynamicな書き換え
- BlueGreenなデプロイメント

## やったこと

`weave`でホストごとに存在するdockerのプライベートネットワークをL3レベルで抽象化、複数のホストにまたがるdockerネットワークを一つのネットワークとして扱えるようにし、`Consul`/`consul-template`/`registrator`でメタデータの管理/configの自動書き換え及びBlueGreenなクラスタの切り替え、またコンテナのスケジューリング/ライフサイクル管理に`docker-swarm`/`docker-compose`を使用しクラスタ全体を透過的に管理出来るようにした。  
それぞれの構成要素は単体で落ちても他の構成要素には影響しないものとし、ホスト障害があってもクラスタ全体としては可用性を存続出来るようにする。
なお前提として各構成要素は全てコンテナのためOSは便宜的に`CoreOS`を使用しているがホストでdockerさえ動作すればどんな環境でも動作するようになっている。

### 構成イメージ

![docker-weave-swarm](/images/docker-weave-swarm.gif "構成")

## Requirements

- [CoreOS](https://coreos.com/) (Tested on 557.2.0)
- [Docker](https://www.docker.com/) (Tested on 1.4.1)
- [Weave](https://github.com/zettio/weave) (Tested on 0.9.0)
- [docker-swarm](https://github.com/docker/swarm/) (Tested on 0.1.0)
- [docker-compose](https://github.com/docker/compose) (Tested on 1.1.0)
- [Consul](https://www.consul.io/) (Tested on 0.5.0)
- [Consul-template](https://github.com/hashicorp/consul-template) (Tested on 0.7.0)
- [registrator](https://github.com/gliderlabs/registrator) (Tested on v5)

## Weave

dockerネットワークの抽象化には[Weave](https://github.com/zettio/weave)を使う。  
Weaveは各ホストに存在するローカルなdockerネットワークを抽象化し、１つのネットワークとして扱うことを可能にする。

- Unitファイル作成

```
sudo vim /etc/systemd/system/install-weave.service
```

```bash
[Unit]
After=network-online.target
After=docker.service
Description=Install Weave
Documentation=http://zettio.github.io/weave/
Requires=network-online.target
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStartPre=/usr/bin/wget -N -P /opt/bin \
    https://raw.github.com/zettio/weave/master/weave 
ExecStartPre=/usr/bin/chmod +x /opt/bin/weave
ExecStartPre=/usr/bin/docker pull zettio/weave:latest
ExecStart=/bin/echo Wave Installed
```

- weave用ブリッジインターフェースUnitファイル作成

```
sudo vim /etc/systemd/network/10-weave.network
```

```
[Match]
Type=bridge
Name=weave*

[Network]
Address=10.0.0.1/8
```

```
sudo vim /etc/systemd/network/10-weave.netdev
```

```
[NetDev]
Name=weave
Kind=bridge
```

- weave service用Unitファイル作成

```
sudo vim /etc/systemd/system/weave.service
```

```
[Unit]
After=install-weave.service
Description=Weave Network
Documentation=http://zettio.github.io/weave/
Requires=install-weave.service

[Service]
ExecStartPre=/opt/bin/weave launch
ExecStart=/usr/bin/docker attach weave
```

- ネットワーク再起動

```
sudo systemctl restart systemd-networkd
```

- weaveインストール・起動

```
sudo systemctl start install-weave.service
sudo systemctl start weave.service
sudo /opt/bin/weave create-bridge
```

## Docker

docker用の管理ポートを開ける。

- Unitファイル作成

```bash
sudo vim /etc/systemd/system/docker-tcp.socket
```

```ini
[Unit]
Description=Docker Socket for the API

[Socket]
ListenStream=2375
BindIPv6Only=both
Service=docker.service

[Install]
WantedBy=sockets.target
```

dockerのデフォルトブリッジをweaveし、dockerから透過的にweaveネットワークを扱えるようにする。

```
sudo cp /usr/lib/systemd/system/docker.service /etc/systemd/system/
sudo vim /etc/systemd/system/docker.service
```

```
Environment=DOCKER_OPTS='--bridge=weave --fixed-cidr="10.0.0.0/8" --insecure-registry="0.0.0.0/0"'
```

- socketを起動

```
sudo systemctl enable docker-tcp.socket
sudo systemctl stop docker
sudo systemctl start docker-tcp.socket
sudo systemctl start docker
```

- 適宜iptables等でListenする相手を制限。

```bash
# Accept a manage node
sudo iptables -A INPUT -s 10.0.0.1 -m tcp -p tcp --dport 2375 -j ACCEPT
# Drop other nodes
sudo iptables -A INPUT -s 0.0.0.0/0 -m tcp -p tcp --dport 2375 -j DROP
```

参照: [https://coreos.com/docs/launching-containers/building/customizing-docker/](https://coreos.com/docs/launching-containers/building/customizing-docker/)

## Swarm

- クラスタIDを取得

```
docker run --rm swarm create
6856663cdefdec325839a4b7e1de38e8
```

- Swarm agentを起動(各ノード)

```
docker run -d --name swarm_agent swarm join --addr=<node_ip:2375> token://<cluster_id>
```

- Swarm managerを起動

```
docker run -d --name swarm_manager -p <swarm_port>:2375 swarm manage token://<cluster_id>
```

- 確認

```
docker run --rm swarm list token://<cluster_id>
```

- 終了

```
docker kill swarm_agent
docker kill swarm_manager
```

## Compose

- 実行ファイルをDL

```
curl -L https://github.com/docker/compose/releases/download/1.1.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

- docker-compose.ymlにコンテナの定義を書く

```
mkdir nodes
cd nodes
vim docker-compose.yml
```

```yaml
consul:
  command: --name consul -server -bootstrap -ui-dir /ui -data-dir ./data
  image: progrium/consul:latest
  ports:
  - "8300"
  - "8400"
  - "8500"
  - "8600/udp"
  environment:
  - "affinity:container!=nodes_consul_*"
  net: "host"

registrator:
  command: -internal consul://127.0.0.1:8500
  image: sttts/registrator:latest
  volumes:
  - "/var/run/docker.sock:/tmp/docker.sock"
  environment:
  - "affinity:container!=nodes_registrator_*"
  net: "host"

haproxy:
  image: shayashibara/docker-consul-template-haproxy
  environment:
  - "affinity:container!=nodes_haproxy_*"
  links:
    consul:consul
  ports:
  - "80:80"

apache:
  image: httpd
  environment:
  - "SERVICE_TAGS=production"

```

- Swarm経由でComposeを実行

```bash
DOCKER_HOST=tcp://localhost:2375 docker-compose scale consul=3 registrator=3 haproxy=3 apache=6
```

- 確認

```bash
DOCKER_HOST=tcp://localhost:2375 docker-compose ps
```

```

```

## Consul / consul-template

Consulでコンテナのメタデータを管理し、Consul-templateでHAProxy配下のbackendを切り替える。

- `shayashibara/docker-consul-template-haproxy`で起動するhaproxy用のconsul-templateのテンプレート。

```
global
  log 127.0.0.1 local0
  log 127.0.0.1 local1 notice
  user haproxy
  group haproxy

defaults
  log global
  mode http
  option httplog
  option dontlognull
  balance roundrobin
  timeout connect 5000
  timeout client 50000
  timeout server 50000

listen stats
  bind *:8001
  option httpclose
  option forwardfor
  stats enable
  stats uri /haproxy?stats
  stats auth admin:123123q
  stats realm HAProxy\ Statistics

frontend web-app
  bind *:80
  default_backend {{key "backend/current"}}

backend default
  server s1 localhost:8080

{{range $tag, $services := service "apache-80" | byTag}}backend {{$tag}}
 balance roundrobin
{{range $services}} server {{.ID}} {{.Address}}:{{.Port}}
{{end}}{{end}}
```

- [consulate](https://github.com/gmr/consulate)(Consulのpythonクライアント)で現在のクラスタのタグをsetし切り替える。  
要件によるけど任意のタイミングでBlueGreenなクラスタの切り替えを行いたかったのでこのような構成にした。  
実作業に落としこむ場合はJenkins等で切り替えをタスク化しWebUIから操作することになると思う。

```
pip install consulate
consulate --api-host 172.17.42.1:8500 kv set backend/current production
```

- 確認

```
docker exec -it nodes_haproxy_1 cat /etc/haproxy/haproxy.cfg
```

- クラスタの終了

```bash
DOCKER_HOST=tcp://localhost:2375 docker-compose kill
DOCKER_HOST=tcp://localhost:2375 docker-compose rm
```

## Conclusion

マルチホストDocker環境でBlueGreenなデプロイを実現するためweaveでL3の抽象化とConsulによる分散Key-ValueストアでL3/L4リソースの管理、consul-templateで設定ファイルの動的書き換え、docker-swarm/composeによるコンテナのスケジューリング、ライフサイクル管理、BlueGreenなクラスタの切り替えを行った。  
構成要素は多いものの各要素は疎結合でそれぞれ代替可能なツールが多い(weaveはpipeworkやflannel、Consulはetcdやzookeeper、consul-templateはconfd等ある)ので、要件に応じて構成要素は変えることが出来る。  
dokkuやflynn、deis等のマイクロPaaSやCloud-FoundryやOpenShift等のフルスタックPaaSは単体で上記ツールチェインのほとんどの機能を備えている一方ロックインされやすいという面もあるため今回は既存の技術の組み合わせのみで構成した。  

[Docker誕生から２年](https://blog.docker.com/2015/03/dockers-2nd-birthday-wishes-qa-with-solomon-hykes-founder-of-docker/)を迎え牧歌的なシングルホストでのdon't recommend in productionな状態からプロダクションでのマルチホスト環境を見据えたオーケストレーションツール群も大分整理統合されてきた感がある。  
依然レポジトリの扱いやセキュリティ面等、実運用面で辛い箇所は残るものの徐々にプロダクション環境での現実的な解が見えてきたように思える。今年はdocker in productionの飛躍の年になることを願いたい。

### 解決していない課題

- プライベートなイメージの扱い  
  OSイメージ + アプリケーションでそれなりの容量になる。  
  また何をするにもdocker-registry専用のプロトコルが必要なためイメージの配信方法の選択肢が少ない。

- ログの扱い  
  各コンテナが生成するログをどこに送るか。またログ送信の冗長性の担保をどうするか

- ステートフルなコンテナの扱い  
  主にRedis, MySQL, PostgreSQLといった状態を持ったアプリケーションをどうするか

- セキュリティ面  
  dockerデーモン自体の脆弱性、コンテナの脆弱性、ホストOSの脆弱性をどうするか

### 課題解決への布石

- プライベートなイメージの扱い  
  レポジトリ自体の冗長化、容量コスト等考えると[quay.io](http://quay.io/), [Google Container Registry](https://cloud.google.com/tools/container-registry/)等のRegistry as a Serviceという選択肢もある。

- ログの扱い  
  [logsoutput](https://github.com/gliderlabs/logspout), journalctl, fluentd等

- ステートフルなコンテナの扱い  
  ホスト側にマウント、data volume container、または[flocker](https://clusterhq.com/)、そもそもDockerizeしない等

- セキュリティ面  
  Docker層だけで対応するのは難しいのでDockerを乗せるIaaSレベルでのコントロール。
  ホスト側をなるべく薄く保つという意味でCoreOSやAtomic host等のコンテナ向け軽量OSやCoreOSの自動アップデート機能を使う。    
  またCoreOSによるコンテナ実装の[Rocket](https://github.com/coreos/rocket)からのセキュリティ面でのフィードバックを今後期待。

## References

- [Adventures with Weave and Docker](http://sttts.github.io/docker/weave/mesos/2015/01/22/weave.html)
- [docker - ELB+Swarm+Compose+Consul+Registratorで夢は叶うのか(1) - Qiita](http://qiita.com/zERobYTe/items/dd9b2365c93da2638221)
- [logspoutでDockerコンテナのログの集約・ルーティング | SOTA](http://deeeet.com/writing/2014/05/14/logspout/)
