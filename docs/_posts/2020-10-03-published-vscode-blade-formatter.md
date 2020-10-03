---
title: blade formatter VSCode Extensionを作った
date: 2020-10-03T06:14:54.355Z
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

![](https://github.com/shufo/vscode-blade-formatter/raw/master/screencast.gif)

## Motivation

- [blade-formatter](https://github.com/shufo/blade-formatter)はCLIツールとして開発したがエディタで編集している時に毎回CLIから叩くのが面倒だった
- VSCode Extensionの素振りがしたかった
- blade-formatterをnpmで公開していたのであれ、じゃあVSCodeで依存が解決出来れば利用出来るな？という安直な発想をPoCしたら実際出来たので

## VSCode Extension

公開の仕方は既に山程書かれてるので譲るとして以下VSCode Extensionで公開するよいところ

### Pros

### npmを使える

npmで公開されているpackageであればほぼそのまま利用出来る

なので自前のパッケージで外部から利用出来るインターフェースさえあれば割と安直に

ただ気をつけないといけないのはVSCodeはElectronでマルチプラットフォームで動作するためOS依存のnative extensionが依存にある場合難しくうということ


### [VSCode Codespaces](https://github.com/features/codespaces) で使える

最近early accessで公開されたVSCodeのWebエディタ. 自分のリポジトリをWeb上で直接Web版のVSCodeにcloneし編集出来る（Beta版はOrganizationリポジトリは未対応とのこと）のだけど、当然VSCodeなのでWeb上でもExtensionを利用出来る（！）. 試しにvscode-blade-formatterをインストールしたところ普通にWebで
