---
title: Nuxt.js + VercelでFormatterを作った
date: 2020-12-10T21:05:27.426Z
tags:
  - blade
  - tools
slug: created-online-blade-formatter-with-nuxt-vercel
---
## やったこと

オンラインで動作するBlade Formatterを作った

//ここに画像

[online-blade-formatter](https://online-blade-formatter.vercel.app/)

## Vercel

- Next.js開発元が運営するPaaS. 元 `now` というサービス（now悪くなかったけどググラビリティ悪すぎた感はあった）
- ソースを解析しNext.jsやNuxt.jsでSSRまでまるっとやってくれる

## Vercel所感

- `serverFiles` を指定するとうまいことLambda Functionとして裏で起動してくれてルーティングしてくれる（ログもあり）
  - SSRとCSRした時にAPIとして必用になるようなところとそのデプロイの面倒さをとてもよく分かっている印象を受けた. とにかくそういったSSRなどで面倒になる箇所をプラットフォームで一手に引き受けることとNext.jsというプラットフォーム自体が開発したフレームワークによって一貫した開発体験を提供している. ローカルでserverMiddlewareとして設定した箇所がそのまま透過的にVercelでも動作するなど細かいところに手が届くので開発体験的にはとてもよい
  - またPricingもSSRに関してはHobbyプランではFreeなところはありがたい
  - ちょっとしたツールやutility的なものであればfunctionでサーバ処理することも出来るため今までNetlifyなどで二の足を踏んでいたServerless Functionに関する制限などがないため出来ることの幅が広がる

## Cold Start対策
- しばらくアクセスがないと自動的にCold状態に移行し、最初のレンダリングに4秒ほどかかるためAWS Lambdaで1分ごとにGETリクエストしWarmup状態を維持するようにした
  - 月間43200回起動 * 1リクエスト辺り平均500ミリ秒程Lambda起動, メモリ128MB割当で計算したところ月間約0.06$ = 6円, 年間$0.72 = 72円程だった
  - VercelのFunctionを叩ける回数自体にリミットはないように見えるので全体的なコストパフォーマンス的には非常に優れているように思える