Title: Pelican + codeanywhere + Github PagesでPCレスなブログ構築
Date: 2015-11-23 13:00
Category: Pelican
Tags: pelican
Slug: site_building
Author: shufo
Summary: Pelican + codeanywhere + Github Pagesで非環境依存なブログの構築

## Overview



## Pelican とは

![画像](/images/pelican.png)

[Pelican](http://docs.getpelican.com/en/3.6.3/)はPython製の静的サイトジェネレータでMarkdown形式で記事を書くことが出来ます。

主な機能としては

- 記事の作成
- RSS フィードの作成
- テーマ機能
- プラグイン

があります。ここら辺は類似のサイトジェネレータと特に変わりありません。

## Github Pages とは

![画像](/images/githubpages.JPG)

[GitHub](https://github.com/) で静的ページをホスティングすることが出来るサービスです。

## codeanywhere とは

![画像](/images/codeanywhere.png)

[codeanywhere](https://codeanywhere.com/)は Web上でコードの編集や実行が出来るクラウドIDEです。
この記事も実際codeanywhereで作成から公開まで行っています。

主な機能としては

- GitHub, BitBucketからのコードの取得・編集
- コンソール操作
- FTPアップロード
- SSHサーバ

があります。
今回はPython製ツールを使うのでコンテナのテンプレートにPythonを使いプロジェクトを作成していきます。

## やってみる

まず[GitHub](https://github.com/new)で「`ユーザ名.github.io`」という名前で空のリポジトリを作ります。
自分の場合GitHubユーザ名は`shufo`なので`shufo.github.io`を作成しました。

作成出来たらcodeanywhereの[プロジェクトページ](https://codeanywhere.com/dashboard#project)から適当に新規プロジェクトを作成します。

![画像](/images/codeanywhere1.jpg)

先ほど作成したユーザ名.github.ioを選び、コンテナのテンプレートとしてpythonを選びます。

![画像](/images/codeanywhere2.jpg)

Nextボタンをクリックししばらく待つとプロジェクト編集画面が開きファイルを編集出来るようになります。


左のファイルツリーからレポジトリ名を右クリックし「SSH Terminal」をクリックします。

![画像](/images/codeanywhere3.jpg)

ターミナルが開くのでコマンドを入力しまずPelicanのインストールをします。

```
sudo pip install pelican Markdown mdx_linkify mdx_del_ins ghp-import
```

次にサイトの初期化をします。設定するパラメータを色々質問されるので必要に応じてyまたはnを押して進めていきます。

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

初期化が完了したので記事を書いていきます。`content`ディレクトリ以下に拡張子を`.md`で保存したファイルが記事の対象になります。
基本的な記事のフォーマットは以下になります。

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

テーマを適用します。テーマは公式の[テーマ一覧](https://github.com/getpelican/pelican-themes)から適当に。

```
mkdir pelican-themes
git clone https://github.com/lucachr/pelican-mg.git pelican-themes/pelican-mg
```

pelicanconf.pyを編集します。

```
THEME = './pelican-themes/pelican-mg'
```

記事の出力を行います。

```
make html
```

確認用のサーバを起動します。

```
make serve
```

確認用のサーバURLは画面左のファイルツリーのリポジトリを右クリックし「Info」から確認します。

![画像](/images/codeanywhere4.jpg)

ファイルビューに環境情報が表示されます。

![画像](/images/codeanywhere5.jpg)

```
http://preview.ys2w6ouag0c0udid1stmdqerhrara4iot2p57l4efhzd7vi.box.codeanywhere.com
```

というURLのようです。先ほど`make serve`で起動したHTTPサーバはデフォルトで8000番でListenするので

http://preview.ys2w6ouag0c0udid1stmdqerhrara4iot2p57l4efhzd7vi.box.codeanywhere.com:8000 をブラウザで開きます。

![画像](/images/codeanywhere6.jpg)

確認出来ました。

記事に問題がなければ公開します。

```
make github
```

このコマンドを実行すると`ghp-import`で`output`ディレクトリの内容が`master`ブランチにコミットされ、同時に`master`ブランチがGitHubへpushされ公開されます。
pushから反映までは10分ほど時間かかるのでしばらく待ち反映されたのを確認出来たら完了です。

## まとめ


