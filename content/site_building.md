Title: Pelican + codeanywhere + Github Pagesでシンクライアントなブログ作成
Date: 2015-11-23 13:00
Category: Pelican
Tags: pelican
Slug: site_building
Author: shufo
Summary: Pelican + codeanywhere + Github Pagesで非環境依存なブログ構築

## Overview

このブログは[Pelican](http://blog.getpelican.com/)で書いているけどいわゆるサイトジェネレータにありがちな問題なのがいちいち開発環境を開いたりするのが面倒というのがある。  
WebUI管理画面をサイトジェネレータ自体が持っている[HubPress](http://hubpress.io/)は気軽に記事を投稿出来るもののGithub APIを使うためGithub Pages専用アプリという色が強く他の環境に移す場合を考慮して使ってはいない。  
2015年11月現在主なサイトジェネレータは[Static Site Generators](https://staticsitegenerators.net/)でGitHub Starの多い順で[Jekyll](http://jekyllrb.com/), [OctoPress](http://octopress.org/), [Hexo](https://hexo.io/), [Hugo](http://gohugo.io/), [Pelican](http://blog.getpelican.com/)がよく使われている。  
それぞれWebベースの管理画面はないもののシンプルな構成で一度生成してしまえば特定のランタイムやDBに依存しないで静的コンテンツを配信出来る。

## やりたいこと

- 特定のマシン(PC, Mac, タブレット)に依存しないサイトジェネレータ環境の構築

## やったこと

[Pelican](http://blog.getpelican.com/)で静的コンテンツの生成、[codeanywhere](https://codeanywhere.com/)でWebベースでのファイルの編集とサイトジェネレータ用ランタイムの構築、GitHub Pagesでサイトの公開を行った。

## Pelican とは

![画像](/images/pelican.png)

[Pelican](http://docs.getpelican.com/en/3.6.3/)はPython製の静的サイトジェネレータでMarkdown形式で記事を書くことが出来る。

主な機能としては

- 記事の作成
- RSS フィードの作成
- テーマ機能
- プラグイン

があり、ここら辺は類似のサイトジェネレータと特に変わりなし。

## Github Pages とは

![画像](/images/githubpages.JPG)

[GitHub](https://github.com/) で静的なページをホスティングすることが出来るサービス。
独自ドメインの割当も出来る。

## codeanywhere とは

![画像](/images/codeanywhere.png)

[codeanywhere](https://codeanywhere.com/)は Web上でコードの編集や実行が出来るクラウドIDE。  
プロジェクトごとにコンテナが作成されランタイム等は自由にインストール出来る。  
ちなみにこの記事もcodeanywhereで作成から公開まで行っている。

主な機能としては

- GitHub, BitBucketからのコードの取得・編集
- コンテナ内での任意のコマンドの実行
- FTPアップロード
- SSH接続

がある。今回はPython製ツールを使うのでコンテナのテンプレートにPythonを使いプロジェクトを作成してみる。

## やってみる

まず[GitHub](https://github.com/new)で「`ユーザ名.github.io`」という名前で空のリポジトリを作る。
自分の場合GitHubユーザ名は`shufo`なので`shufo.github.io`を作成。

作成出来たらcodeanywhereの[プロジェクトページ](https://codeanywhere.com/dashboard#project)から適当に新規プロジェクトを作成する。

![画像](/images/codeanywhere1.jpg)

先ほど作成したユーザ名.github.ioを選び、コンテナのテンプレートとしてpythonを選択する。

![画像](/images/codeanywhere2.jpg)

Nextボタンをクリックししばらく待つとプロジェクト編集画面が開きファイルを編集出来るようになるので  
左のファイルツリーからレポジトリ名を右クリックし「SSH Terminal」をクリックする。

![画像](/images/codeanywhere3.jpg)

ターミナルが開くのでPelicanのインストールをする。

```
sudo pip install pelican Markdown mdx_linkify mdx_del_ins ghp-import
```

次にサイトの初期化。設定するパラメータを色々質問されるので必要に応じてyまたはnを押して進める。

```                                                                                                                                                                                                                                                                                      
Please answer the following questions so this script can generate the files                                                                                                                                                                                                           
needed by Pelican.                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                      
> Where do you want to create your new web site? [.]                                                                                                                                                                                                                                  
> What will be the title of this web site? test                                                                                                                                                                                                                                       
> Who will be the author of this web site? shufo                                                                                                                                                                                                                                      
> What will be the default language of this web site? [en] ja                                                                                                                                                                                                                         
> Do you want to specify a URL prefix? e.g., http://example.com   (Y/n) y                                                                                                                                                                                                             
> What is your URL prefix? (see above example; no trailing slash) http://shufo.github.io                                                                                                                                                                                              
> Do you want to enable article pagination? (Y/n) y                                                                                                                                                                                                                                   
> How many articles per page do you want? [10]                                                                                                                                                                                                                                        
> What is your time zone? [Europe/Paris] Asia/Tokyo                                                                                                                                                                                                                                   
> Do you want to generate a Fabfile/Makefile to automate generation and publishing? (Y/n) y                                                                                                                                                                                           
> Do you want an auto-reload & simpleHTTP script to assist with theme and site development? (Y/n) y                                                                                                                                                                                   
> Do you want to upload your website using FTP? (y/N) n                                                                                                                                                                                                                               
> Do you want to upload your website using SSH? (y/N) n                                                                                                                                                                                                                               
> Do you want to upload your website using Dropbox? (y/N) n                                                                                                                                                                                                                           
> Do you want to upload your website using S3? (y/N) n                                                                                                                                                                                                                                
> Do you want to upload your website using Rackspace Cloud Files? (y/N) n                                                                                                                                                                                                             
> Do you want to upload your website using GitHub Pages? (y/N) y                                                                                                                                                                                                                      
> Is this your personal page (username.github.io)? (y/N) y                                                                                                                                                                                                                            
Done. Your new project is available at /home/cabox/workspace
```

初期化が完了したので記事を書いていく。`content`ディレクトリ以下に拡張子を`.md`で保存したファイルが記事の対象となる。
基本的な記事のフォーマットは以下の様になる。

```
Title: Pelican + codeanywhere + Github Pagesでブラウザのみでブログ構築
Date: 2015-11-23 13:00
Category: Pelican
Tags: pelican
Slug: site_building
Author: shufo
Summary: Pelican + codeanywhere + Github Pagesでの非環境依存なブログ構築

## Pelican とは
以下本文
```

テーマを適用。テーマは公式の[テーマ一覧](https://github.com/getpelican/pelican-themes)から適当に。

```
mkdir pelican-themes
git clone https://github.com/lucachr/pelican-mg.git pelican-themes/pelican-mg
```

pelicanconf.pyを編集。

```
THEME = './pelican-themes/pelican-mg'
```

記事の出力とサーバの起動を実行。

```
./develop_server.sh start
```

確認用のサーバURLは画面左のファイルツリーのリポジトリを右クリックし「Info」から表示出来る。

![画像](/images/codeanywhere4.jpg)

ファイルビューに環境情報が表示される。

![画像](/images/codeanywhere5.jpg)

```
http://preview.ys2w6ouag0c0udid1stmdqerhrara4iot2p57l4efhzd7vi.box.codeanywhere.com
```

先ほど起動したHTTPサーバはデフォルトで8000番でListenするので

http://preview.ys2w6ouag0c0udid1stmdqerhrara4iot2p57l4efhzd7vi.box.codeanywhere.com:8000 をブラウザで開いてみる。

![画像](/images/codeanywhere6.jpg)

確認出来た。

記事に問題がなければ公開を実行。

```
make github
```

このコマンドを実行すると`ghp-import`で`output`ディレクトリの内容が`master`ブランチにコミットされ、同時に`master`ブランチがGitHubへpushされ公開される。  
pushから反映までは10分ほど時間かかるのでしばらく待ち反映されたのを確認出来たら完了。

## まとめ

PelicanとcodeanywhereとGitHub Pagesで意識低めのブログ構築をした。  
ローカルの環境に依存しないためいつでも気が向いたときに書けるというのがブログ作成に当たっては大きいメリットだと思う。
