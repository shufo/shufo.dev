---
title: Laravelのblade formatterを作った
date: 2020-10-01T05:35:50.107Z
tags:
  - programming
  - OSS
slug: about-blade-formatter
---
## 作ったもの

<a href="https://github.com/shufo/blade-formatter"><img src="https://gh-card.dev/repos/shufo/blade-formatter.svg"></a>

## 何が出来るか
- Laravelのblade templateのフォーマット
  - PHP syntaxのサポート（PSR-2）
  - bladeディレクティブのネストサポート
  - HTMLのformat
  - CLIサポート
    - CIでのformattingチェック等

format例: 

Input: 

```php
@extends('frontend.layouts.app')
@section('title') foo
@endsection
@section('content')
<section id="content">
<div class="container mod-users-pd-h">
    <div class="pf-user-header">
    <div></div>
    <p>@lang('users.index')</p>
    </div>
        <div class="pf-users-branch">
            <ul class="pf-users-branch__list">
                @foreach($users as $user)
        <li>
            <img src="{{ asset('img/frontend/icon/branch-arrow.svg') }}" alt="branch_arrow">
            {{ link_to_route("frontend.users.user.show",$users["name"],$users['_id']) }}
        </li>
        @endforeach
      </ul>
      <div class="pf-users-branch__btn">
      @can('create', App\Models\User::class)
            {!! link_to_route("frontend.users.user.create",__('users.create'),[1,2,3],['class' => 'btn']) !!}
            @endcan
        </div>
  </div>
    </div>
</section>
@endsection
@section('footer')
@stop
```

Output:

```php
@extends('frontend.layouts.app')
@section('title') foo
@endsection
@section('content')
    <section id="content">
        <div class="container mod-users-pd-h">
            <div class="pf-user-header">
                <div></div>
                <p>@lang('users.index')</p>
            </div>
            <div class="pf-users-branch">
                <ul class="pf-users-branch__list">
                    @foreach ($users as $user)
                        <li>
                            <img src="{{ asset('img/frontend/icon/branch-arrow.svg') }}" alt="branch_arrow">
                            {{ link_to_route('frontend.users.user.show', $users['name'], $users['_id']) }}
                        </li>
                    @endforeach
                </ul>
                <div class="pf-users-branch__btn">
                    @can('create', App\Models\User::class)
                        {!! link_to_route('frontend.users.user.create', __('users.create'), [1, 2, 3], ['class' => 'btn']) !!}
                    @endcan
                </div>
            </div>
        </div>
    </section>
@endsection
@section('footer')
@stop
```

ディレクティブレベルでネストされ、PSR-2準拠、HTMLもネストされていることが分かる

## Motivation

いい加減人類はコードの手動フォーマットという苦痛から解放されるべきで、もはやランタイムレベルでフォーマッタを入れるのは常識（言葉が強い）だけどLaravel bladeにはまだまともなformatterがなかったので作った

ここでまともと言っているのは少なくとも

- bladeのディレクティブがネストされる
- bladeディレクティブ内のネイティブPHPのsyntaxがPSR-2でフォーマットされる
- HTMLがフォーマットされる

ということだけどこれを実現しているformatterがなかった

## なぜなかったのか

- 作ってみて分かったけどそもそもbladeはHTMLにスクリプトを直接埋め込めるPHP + blade固有のsyntaxとなっているため, HTML, PHP, blade 3つのsyntaxが混ざるpolyglotな魔境となっていた
- 1つのファイルで3つのsyntaxをサポートするようなlexerやparserを作る労力に見合わない
  - 恐らくこれが大きい
- 特にそれぞれのエスケープ表現やネストするべきtokenが他のSyntaxとバッティングしてどちらを優先するべきか解決出来ない場面等もある

## formatterが出来るまで

### 指針

まずライブラリを作るに当たって大まかな指針を決める

- どういったアルゴリズムを使うか
  - そのアルゴリズムは自分で実装するべきか、3rd partyを使うべきか
- また既存ソリューションはなぜ問題を解決出来ていないのか
  - その問題は自分で解決出来るのか/3rd partyで解決出来るか
  - その問題を解決するコストは現実的にペイするか

指針が現実的に想像出来るレベルになったら実装に入る. とりあえず手を動かして指針に戻る場合もある

今回は既に[Laravel Blade Snippets](https://marketplace.visualstudio.com/items?itemName=onecentlin.laravel-blade)が簡易的にFormatterを実装していたのでそれをベースにこのライブラリが出来ていない箇所をブラッシュアップしていく形になった

Laravel Blade Snippetsはjs-beautifyでHTMLをFormatしているだけであくまでbladeディレクティブもHTMLのタグのようなものとして扱っていたためbladeディレクティブのネストやPSR2への準拠といったところが実現出来ていなかった

またCLIでの実行をサポートしておらずあくまでVSCodeのプラグインとしてのみ動作していたためCIでのprogramiticalなformat検査などが実行出来なかった

blade-formatterではそういった足りないところを補う形で当初は作ることにした<br>
実際作った後から見るとほぼ別物になっていたので最初の指針で残っているのは大まかにlexerを作るか作らないかという違いくらいだった気がする

### 実装 

まずどういったソフトウェアでもそうだけど最小限のPoCを実装する

PoCで十分最終的に実現したいソリューションを達成出来る手応えを得られた時点でリソースと相談して最後まで作るかどうか決める

- 時間
- 予算

ただあくまで個人的に作るOSSは[それが僕には楽しかったから](https://www.amazon.co.jp/dp/4796880011/ref=cm_sw_r_tw_dp_x_VByDFbMXWSK00)作るという場合が往々にしてあるのでリソースといったところはあまり気にしない. 

今回はまず要件としてbladeディレクティブをネストしたいのがあり、これを実現するためにはbladeファイルをパースしtokenizeした上でblade特有のディレクティブをtokenとして認識する必用があるのだけど、ここはTextMateのtmBundle形式の言語ファイルを使用した

VSCodeには実はvscode-textmateというtextmateのbundleを処理するためのライブラリがbuiltinで入っており、vscode-textmate経由で各種言語のSyntax Highlightやtokenizeを行っている

そのためtmBundle形式のファイルさえ用意すれば比較的用意にSyntax Hilighterなどは作れるのだがこれを利用し、vscoode-textmate自体はVSCodeが存在しなくても動くのでbladeファイルのtokenizerとして利用した

結果としてはこの選択が後で作るVSCode向けの拡張の[vscode-blade-formatter](https://marketplace.visualstudio.com/items?itemName=shufo.vscode-blade-formatter)を作る時にVSCodeビルトインのvscode-textmateを直に利用出来る結果になったため互換性が増してよかった

### 反省点

- 正規表現のみで無理やりformatterのようなことを実行しようとするナイーブな実装になってしまった点
  - やはり専用にlexerやparserを作るのが最も確実な手段ではあるなと実感
  - 実際のプロジェクトでの早急な必要性からナイーブなソリューションに飛びついてしまったけどもうちょい踏ん張りたかった

## 参考にした

- [Laravel Blade Snippets](https://marketplace.visualstudio.com/items?itemName=onecentlin.laravel-blade)
  - Snippetといいつつ簡易的なFormatter機能もあり、方向性の指針にした. 実質このformatter機能をブラッシュアップしてbladeに特化したような形
  - js-beautifyを使っている箇所を参考にした
