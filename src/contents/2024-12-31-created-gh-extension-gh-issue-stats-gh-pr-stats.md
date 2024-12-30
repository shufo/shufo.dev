---
title: GitHubのissueやPRの統計情報を集計するGitHub CLIの拡張機能を作った
datetime: "2024-12-31T00:00:00.000Z"
slug: created-gh-extension-gh-issue-stats-gh-pr-stats
author: shufo
tags:
  - tool
  - development
draft: false
featured: true
description: gh-extension
---

### TL;DR

それぞれ以下で作成した

- [gh-issue-stats](https://github.com/shufo/gh-issue-stats)
- [gh-pr-stats](https://github.com/shufo/gh-pr-stats)

### 使い方

以下のスクリーンキャスト通り

#### Screencast

![](https://assets.tina.io/c62a3f46-718a-47df-9433-ee1efaba84ce/ScreencastFrom2024-12-3021-18-59-ezgif.com-video-to-gif-converter.gif)

### Motivation

- 自分は初めて見るプロジェクトの Insight を得るためにはまず issues や PRs を見るということをよくやっている
  - というのは issue や PR の Open 率、総件数, Open に対する Close 率等々…を見ることでそのプロジェクトの健全性や成熟度の指数が大まかに分かる
  - Open 率が低く保たれているのであれば比較的健全にプロジェクトが回っている、もしくは回るための努力をしている、Open 率が高かったとしても件数自体が多ければそれだけアクティブに使用や検証をしているユーザが多く体制次第でより成長するポテンシャルがある、もしくは単に放置されているということがわかり、どのように issue に対応しているかで現状のプロジェクトの成熟度に関する洞察が得られる
- たださすがに何百、何千個も issue や PR が存在するプロジェクトの insight を得る場合は、個別に見ていては時間かかりすぎるのと毎回ウェブページで見るのも時間がかかっていた
- そのためコマンドで one shot でラベルごとに issue や PR の統計を出力して分析したい、というモチベーションがまずあり、ただラベルごとにまとめて出力しているようなプロジェクトが見当たらなかった、またあったとしても GitHub のアクセストークンを要求したりセットアップが面倒だった（統計情報を得るためは API を叩いて issue 一覧を取得するようクエリしないといけないが、Rate Limit の上限でトークン無しだとすぐ上限を超えてしまったりする）
  - そのため既に開発者なら全員セットアップしている（過言）`gh` コマンドであれば認証を skip した上でそれぞれ issue や PR をクエリし統計情報として比較的容易に出力出来ると考えこの拡張を作った
  - 実際作ってみると比較的簡単に作れるような仕組みが既に整備されておりそこまで時間はかからなかった
    - 基本的には `gh extension create` コマンドで拡張機能の boilerplate が出力されるのであとはそれに従って実装していくだけ
    - 使用可能な言語は Golang 以外でも任意のシェルスクリプトなどでも可能なのでハードルは割と低い
    - ただ可搬性は下がるので Golang で boilerplate に付属している gh-extension-precompile action を使って各プラットフォームのバイナリを毎リリースごとに生成すれば基本的には特に気にしないでも各プラットフォームで動作する
    - GitHub CLI の拡張として作るメリットとしては既に `gh auth login` でログインしていれば大抵の API を叩ける状態になっているので `go-gh` パッケージ経由で直接 gh のサブコマンドを叩いたり、REST API, GraphQL API を叩くことで GitHub の API エコシステムに乗っかりやすいこと

### Usage

gh コマンドが入っていれば以下の 2 ステップで統計情報を出力出来る
programmatically に出力を扱えるよう JSON 形式での出力, また Excel や Notion など外部の表形式でのツールに貼れるよう CSV と TSV 形式で出力を出来るようにしている

#### gh-issue-stats

```bash
gh extension install shufo/gh-issue-stats
gh issue-stats
gh issue-stats --format csv
gh issue-stats --format json
gh issue-stats --format tsv
```

#### gh-pr-stats

```bash
gh extension install shufo/gh-pr-stats
gh pr-stats
gh pr-stats --format csv
gh pr-stats --format json
gh pr-stats --format tsv
```

## Conclusion

GitHub CLI 拡張機能を作った

1.18 ぶりくらいに Golang を触ったけど 1.23 でも特に良い点も悪い点も大きくプログラミングフィールは変わらずという感じで安心した
