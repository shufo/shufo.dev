---
title: Laravel blade formatter VSCode Extensionを作った
datetime: 2020-10-03T14:29:07.574Z
tags:
  - programming
  - vscode
  - laravel
slug: published-vscode-blade-formatter
---
一昨日公開した[エントリ](https://shufo.dev/2020/10/01/about-blade-formatter/)で紹介したblade-formatter

[![shufo/blade-formatter - GitHub](https://gh-card.dev/repos/shufo/blade-formatter.svg)](https://github.com/shufo/blade-formatter)

をVSCodeから利用出来る
VSCode Extensionを作った

[![shufo/vscode-blade-formatter - GitHub](https://gh-card.dev/repos/shufo/vscode-blade-formatter.svg)](https://github.com/shufo/vscode-blade-formatter)

Market Place: <https://marketplace.visualstudio.com/items?itemName=shufo.vscode-blade-formatter>

意外と需要があったのか2ヶ月くらいで10k DLを超えた

## Preview

![](https://github.com/shufo/vscode-blade-formatter/raw/master/screencast.gif)

### 出来ること

* Bladeファイルを拡張子で判別してVSCodeの `Format Document` に対応

  * Formatプロバイダを使っているためVSCodeデフォルトのFormat on Saveなどで随時フォーマット出来る

## Motivation

* [blade-formatter](https://github.com/shufo/blade-formatter)はCLIツールとして開発したがエディタで編集している時に毎回CLIから叩くのが面倒だった
* VSCodeを使っていてかつblade-formatterをnpmで公開していたので、じゃあVSCodeで依存が解決出来れば利用出来るな？という安直な発想からPoCしたら実際出来たので
* あとVSCode Extensionの素振りがしたかった

## VSCode Extensionインプレ

VSCode Extensionを作るのは今回初めてだったので公開の仕方は既に山程[書かれてる](https://stackoverflow.com/questions/43671356/how-to-publish-a-extension-on-vscode-by-myself)ので譲るとして、以下VSCode Extensionを触った感想

### Pros

### npmを使える

まずnpmで公開されているmoduleであればほぼそのまま利用出来る

なので自前のパッケージで外部から利用出来るインターフェースさえあれば割と安直に使えるので、vscode向けに作ったものでなくても比較的簡単にExtension化出来る

#### Native Module対応はちょいむずい

ただ気をつけないといけないのがVSCodeはElectronでマルチプラットフォームで動作するためOS依存のnative moduleが依存にある場合使うのが難しいというところ

例えばonigurumaなどはそれぞれのOS向けのbindingがあるためそれぞれのOS向けにバイナリをビルドしないといけない. 今回まさにblade-formatterの依存でvscode-textmateがonigurumaを使っているため一度詰みかけたが、blade-formatterがVSCode Extensionの依存として読み込まれた時はvscode-onigurumaをnpmで解決されたblade-formatterの依存のonigurumaではなく**VSCodeバンドルのものを使う**というややhackyなworkaroundで回避した

要はVSCodeは各OS向けにビルド済みのバイナリをバンドルしているためVSCodeのインストールで自動的に一緒に入るのでそれを利用した

### フィードバックが増える

シンプルにVSCodeの利用者が膨大なので元のblade-formatter以外のユーザ(CLIを触らないユーザ)からこういった条件で動かないとか、こういった条件に対応してほしいなどのフィードバックをもらえた

### [VSCode Codespaces](https://github.com/features/codespaces) で使える

最近Early Accessで公開されたVSCodeのクラウドIDE. GitHubからシームレスにエディタを起動出来る.

自分のリポジトリをWeb上で直接Web版VSCodeにcloneし編集出来る（Beta版はOrganizationリポジトリは未対応とのこと）
実際使ってみると動作としてはエディタ起動時にAzure内にコンテナが起動され、ある程度（10Gくらい？）のディスクがアタッチされリポジトリの内容がマウントされる. もちろんターミナルも使える. また環境内から更にコンテナを起動することも出来る.

当然VSCodeなのでWeb上でもExtensionを利用出来るのだけど、試しにvscode-blade-formatterをインストールしたところ普通にWebでも動いた

まだBeta版なので未完成な部分もあるが個人的にはかなり可能性を感じた. 今までクラウドIDEというとお仕着せのエディタでローカルとは違う環境を割り当てられるのが普通だったため、Webでほぼローカルと同様のVSCodeが動き、更にやろうと思えば自分で拡張も出来るというのはある程度エディタの場所を意識しない透過的な開発が出来るようになるのではという気がしている. 

![](/assets/img/uploads/2020-10-03_22-20-03.png)

### Contributionポイントが多い

公式の[ドキュメント](https://code.visualstudio.com/api/references/contribution-points)を見ると分かるのだけど以下の部分を拡張することが出来る

```
configuration
configurationDefaults
commands
menus
keybindings
languages
debuggers
breakpoints
grammars
themes
iconThemes
productIconThemes
snippets
jsonValidation
views
viewsWelcome
viewsContainers
problemMatchers
problemPatterns
taskDefinitions
colors
typescriptServerPlugins
resourceLabelFormatters
```

後発にも関わらずVSCodeエコシステムが巨大になり数年でエディタ市場を支配してしまったのはJSをベースにした拡張性の高さと作りやすさというところはあると思うけど拡張可能な箇所が多いことによる貢献のしやすさもエコシステムの成長という点では重要だったのかなと思う

## Cons

APIが膨大なのでどこにContributionすれば何が変わるかドキュメント見てもなかなか分からない. 同じようなことをやっている他の拡張のソースを見てAPIの使い方の空気を読むことが必用. 

