---
title: Nuxt.js + VercelでBlade Online Formatterを作った
date: 2020-12-13T10:10:47.952Z
tags:
  - blade
  - tools
slug: created-online-blade-formatter-with-nuxt-vercel
---
# Nuxt.js + VercelでBlade Online Formatterを作った

## やったこと

オンラインで動作するBlade Formatterを[作った](https://online-blade-formatter.vercel.app/)

![](/assets/img/uploads/peek-2020-12-10-17-48.gif)

url: <https://online-blade-formatter.vercel.app/>

source code: [GitHub](https://github.com/shufo/online-blade-formatter)

## Motivation

* 楽にSSR出来るプラットフォームないかなということで探していたら[Vercel](https://vercel.com/)を知り素振りしたくなったので

## Vercel

![](/assets/img/uploads/2020-12-13_19-16-28.png)

* [Next.js](https://nextjs.org/)開発元が運営するPaaS. 元 `now` というサービスをリブランドした（now悪くなかったけどググラビリティ悪すぎた感はあった）
* ソースを解析しNext.jsやNuxt.jsでSSR, API routing等までまるっとやってくれる

## Vercel所感

* SSRまでまるっとやってくれるNetlifyという使用感

  * ブランチベースでのPreview, https有効化, デフォルトのドメインを自動発行等
* vercel.json(or now.json)で `serverFiles` を指定するとうまいことLambda Functionとして裏で起動してくれてルーティングしてくれる（ログもあり）

  * SSRとCSRした時にAPIとして必用になるようなところとそのデプロイの面倒さをよく分かっている印象を受けた. とにかくそういったSSRなどで面倒になる箇所をプラットフォームで一手に引き受けることとNext.jsというプラットフォーム自体が開発したフレームワークによって一貫した開発体験を提供している. ローカルでserverMiddlewareとして設定した箇所がそのまま透過的にVercelでも動作するなど細かいところに手が届くのは開発体験的にはとてもよい
  * またPricingもSSRに関してはHobbyプランではFreeなところはありがたい
  * ちょっとしたツールやutility的なものであればfunctionでサーバ処理することも出来るため今までNetlifyなどで二の足を踏んでいたServerless Functionに関する制限などがないため出来ることの幅が広がる

## Cold Start対策

* しばらくアクセスがないと自動的にCold状態に移行し、最初のレンダリングに4秒ほどかかったためAWS Lambdaで1分ごとにGETリクエストしWarmup状態を維持するようにした

  * Freeプランでは10秒でタイムアウトしそれまでに
    レンダリング出来ないと502 Bad Gatewayとなる

```javascript
const https = require('https');

exports.handler = async(event) => {
  let dataString = '';

  const request1 = new Promise((resolve, reject) => {
    const req = https.get("https://online-blade-formatter.vercel.app/", function(res) {
      res.on('data', chunk => {
        console.log('ok')
      });
      res.on('end', () => {
        resolve({
          statusCode: 200,
          body: 'ok'
        });
      })
    });

    req.on('error', (e) => {
      reject({
        statusCode: 500,
        body: 'Something went wrong'
      });
    });
  });

  const request2 = new Promise((resolve, reject) => {
    const data = JSON.stringify({
      data: 'foo',
    })

    const options = {
      hostname: 'online-blade-formatter.vercel.app',
      port: 443,
      path: '/v1/format',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    }

    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        process.stdout.write(d);
      })
      res.on('end', () => {
        resolve({
          statusCode: 200,
          body: 'ok'
        });
      })
    })

    req.on('error', (e) => {
      reject({
        statusCode: 500,
        body: 'Something went wrong'
      });
    });

    req.write(data)
    req.end();
  });

  const response = await Promise.all([request1, request2]).then(res => {
    return {
      statusCode: 200,
      body: 'ok'
    }
  }).catch(res => {
    return {
      statusCode: 500,
      body: 'error'
    }
  });

  return response;
};
```

* SSRを有効にしているとSSRもコールドスタートになるようなので（SSRもLambda Function等で処理している？）serverMiddlewareとページ自体のどちらもWarmup状態にした
* 1分毎に1回起動 = 月間43200回起動 * 1リクエスト辺り平均500ミリ秒程billing time消費, メモリ128MB割当で計算したところ月間約0.06$ = 6円, 年間$0.72 = 72円程だった
* VercelのFunctionを叩ける回数自体にリミットはないように見えるので全体的なコストパフォーマンスはよさそう
* [SWR](https://vercel.com/docs/edge-network/caching#stale-while-revalidate) (stale-while-revalidate)といったCache-Control機構もあるもののそもそも一度アクセスしないとcacheされないので初訪問時のレンダリングでcold startに当たり遅い場合もあるため

## 苦労したところ

* blade-formatterをfsモジュール等Node APIに依存するように作っていたためブラウザ上でstandaloneで動かせなかった
* prettierの[standaloneバージョン](https://prettier.io/docs/en/browser.html)のようにstandalone版作って、オンラインであることを前提としてブラウザAPIのみで動くようにしたい
* 具体的にはwasmのロードやSyntaxのロードをfsモジュールではなくブラウザAPIに置き換える

  * これが実現出来ればfull staticになるので
* あとServerless Function周りのビルドの挙動がブラックボックスになっているのが辛い
  * `api`ディレクトリ以下のファイルはrequireやfs.readFile等をソースから解析し自動的に必用なファイルのみLambda Functionのファイルシステムに追加されるらしいが実際どう追加されているのか等までデバッグ出来ない
    * また基本Vercel任せとなるため詳細なカスタマイズが出来ない(上位プランではメモリやtimeoutの選択の幅が広がる)
  * esmモジュールを使用しているblade-formatterをrequireしようとして詰まったり（結局serverMiddlewareとして処理しているのでcold startの場合Nuxtの立ち上げのオーバーヘッドがあって重い）

## まとめ

* Serverless APIを気軽にデプロイする手段としてはVercelよい

  * ローカルでのAPIがそのまま透過的にデプロイされる楽さ
  * 他のStatic Hostingサービスと差別化出来ている箇所
  * Full StaticであればNetlify等と正直変わりない
* 1ページ1APIごとにLambda Functionになるようなのでcold start problemへの対策が必用になる

  * SWR(stale-while-revalidate), Warmup等
  * それでも自前でサーバを持ち維持するのに比べれば月額最低数ドル * 12 vs 年間数ドル程度だと思うと維持費の敷居が低い