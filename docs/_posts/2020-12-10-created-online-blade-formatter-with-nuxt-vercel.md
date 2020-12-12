---
title: Nuxt.js + VercelでOnline Formatterを作った
date: 2020-12-10T21:05:27.426Z
tags:
  - blade
  - tools
slug: created-online-blade-formatter-with-nuxt-vercel
---
## やったこと

オンラインで動作するBlade Formatterを作った

![](/assets/img/uploads/peek-2020-12-10-17-48.gif)



url: [online-blade-formatter](https://online-blade-formatter.vercel.app/)

source: [GitHub](https://github.com/shufo/online-blade-formatter)

## Vercel

* Next.js開発元が運営するPaaS. 元 `now` というサービスをリブランドした（now悪くなかったけどググラビリティ悪すぎた感はあった）
* ソースを解析しNext.jsやNuxt.jsでSSRまでまるっとやってくれる

## Vercel所感

* `serverFiles` を指定するとうまいことLambda Functionとして裏で起動してくれてルーティングしてくれる（ログもあり）

  * SSRとCSRした時にAPIとして必用になるようなところとそのデプロイの面倒さをとてもよく分かっている印象を受けた. とにかくそういったSSRなどで面倒になる箇所をプラットフォームで一手に引き受けることとNext.jsというプラットフォーム自体が開発したフレームワークによって一貫した開発体験を提供している. ローカルでserverMiddlewareとして設定した箇所がそのまま透過的にVercelでも動作するなど細かいところに手が届くので開発体験的にはとてもよい
  * またPricingもSSRに関してはHobbyプランではFreeなところはありがたい
  * ちょっとしたツールやutility的なものであればfunctionでサーバ処理することも出来るため今までNetlifyなどで二の足を踏んでいたServerless Functionに関する制限などがないため出来ることの幅が広がる

## Cold Start対策

* しばらくアクセスがないと自動的にCold状態に移行し、最初のレンダリングに4秒ほどかかるためAWS Lambdaで1分ごとにGETリクエストしWarmup状態を維持するようにした

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

* SSRを有効にしているとSSRもコールドスタートになるようなので（SSRもLambda Function等で処理している？）serverMiddlewareとページ自体のどちらもWarm
* 月間43200回起動 * 1リクエスト辺り平均500ミリ秒程Lambda起動, メモリ128MB割当で計算したところ月間約0.06$ = 6円, 年間$0.72 = 72円程だった
* VercelのFunctionを叩ける回数自体にリミットはないように見えるので全体的なコストパフォーマンス的には非常に優れているように思える