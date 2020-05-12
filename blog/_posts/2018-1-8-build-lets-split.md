---
title: Let's Split (レツプリ) を組み立てた
date: 2018-1-8
tags: 
  - DIY
  - keyboard
  - 自作キーボード
permalink: build-lets-split
description: レツプリを組み立てた話
---

<img src="https://i.imgur.com/zEWMnD8.jpg">

昨今の自作キーボードブームと格子配列型で左右分割のキーボードを試してみたくなったので昨年よく見かけたレツプリを作ってみることにした

## 必要なもの

* Let's Split PCB x 2
* Pro micro x 2
* スイッチ x 48 [Kailh Pro Switche Burgundy](https://www.aliexpress.com/item/kailh-pro-switches-3pin-RGB-SMD-purple-light-green-teal-aqua-burgundy-MX-RGB-Swithes-For/32838033039.html?spm=a2g0s.9042311.0.0.lT90up)
* TRRS ジャック x 2
* TRRS ケーブル
* ダイオード x 48
* ケース(top プレートと bottom プレート)
* ネジとスタンド
* LED ケーブル x 1 [[Switch Science](https://www.switch-science.com/)]
* タクトスイッチ x 2 [Switch Science]
* リード線 [Amazon]
* 3M クッションゴム [Amazon]
* はんだごてセット [Amazon]

今回は[Mehkee](https://mehkee.com/)でレツプリの[セット](https://mehkee.com/collections/keyboards/products/lets-split-acrylic-cases-kits?variant=46981199311)が売っていたので最初に必用なパーツはある程度揃える事が出来た

クッションゴム, タクトスイッチ, リード線、LED ケーブルはなかったので別途買った

## 組み立て

幸い先人たちのビルドログが結構な数あったので途中で詰まることはあまりなかった

### ダイオードハンダ付け

それぞれ+-の方向だけ気をつけてハンダ付け。ダイオードの黒い方のリード線が四角い穴に入るようにする。

<img src="https://gaaasw.ch.files.1drv.com/y4m1jARiYKevuzhzusO6jJ8wPdIbbNPbzkkYZHw0pu-tl8cFUlVv1Vrbu0KbQ1ERLsMbeTdPnjUyN9DVr8XMqkmAIRmiOp6mFGe7mLyfPRK5sMsTRBYQHpjEZrj2KkT7a2TArf8chzK33vnxI9PrhaMXI9ym7TGHdMVP-QnbWZQcDUHTJRysWbRqY6ggMCWr2_9Oaxvyi9z4C3WLNiB1ivlPA?width=1440&height=1080&cropmode=none" width="1440" height="1080" />

<img src="https://iqbl1g.ch.files.1drv.com/y4m7Fs5CBMUaGnv8q3IisbBbepE1D4AbrEc296TJdNPqJEOWYy9p2G4CVJNjGrUhRXDUASDHZcv-sIUoHvL9XbqeN786dSDReb890_bOu4N1zGbn8lLnJTPCmsVSQjEV85bBkyQ2nelmSI12gsXDNLQkpQl_r_g9SwRPNwmSJodHPJSwO-cjz2wNKp7-dUVOVrxlFA4aSk_7Zzut3YK9TTW1A?width=1440&height=1080&cropmode=none" width="1440" height="1080" />

### TRRS ジャック取り付け

<img src="https://gqaasw.ch.files.1drv.com/y4mxf1_q7YLEL3iYck7oRBTGC4PzSOwLRBfxe_g-j6k9P19EavN_yOB3x_9G_8zCeXobCrzFML70YLiXqN2pXkipsrYZmK4wk-3b4kjWCvvI453J3AbouwkY_4rKAAXS5Vvz3rJwhjmKv8Lx3SNyU5qBIYJ9CxduFoUY5T0iiIJDJWu4RtjJhxXb80LZgsokJJT2d6_PD8L7WyD8PqdqHB97w?width=1440&height=1080&cropmode=none" width="1440" height="1080" />

<img src="https://igaasw.ch.files.1drv.com/y4m8yzp4MEmVM-rBrQ7MbrdXfJI9C3koY5tRdBP98f4pnxV_gOIy8r2KHpUNimtJW_AiZdraMPTDmkVJ3Xk8xD99ab0Xqdf8g9Hk4_zy4JnypcFtxopwVHy5pUOZpGhe9N8FJYill3pQAj2uEI3qB_kDs5DsZUfnwHhm3VJ8MSzyt6eHuUetbTZbreTHnQBz2zKqm11JjtWBx6Ug86S_lcHlg?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

### ジャンパー接続

公式から引用。以下の要領で PCB の TRRS ジャック下のに空いてる箇所をハンダで接続する

```
VCC [x]     [ ] VCC
    [x]     [x]
GND [ ]     [x] GND
```

<img src="https://jabl1g.ch.files.1drv.com/y4m_8f2vgBCB3MmpwtKz4wBRiYAoCtmQoqS0WiyLbEOsqX9x5dt5JeX0_56u2UfNtKmCJwsyz2lwskcKKigd1kcoXE3TGEBfWsMacPM0hG3RSSe5KJ4t-PnU4ku8hEh7DARKS6ptIJzGa44kma2nUwOwz-tAyCPspVnBg5b4RkW5-yCpqlINLKU9fwQid-riexK4lJpQ6hrbmlfIV--eIwdTg?width=1503&height=1127&cropmode=none" width="1503" height="1127" />

### ヘッダーピン取り付け

Pro Micro 付属のヘッダーピンを取り付ける。足の長い方を TRRS ジャックと同じ側にして差し込む。足の短い表側をハンダ付けしておく。

<img src="https://jaaasw.ch.files.1drv.com/y4m7GJqIcbAhnM0nX8C96lB3Q2wb3XwbRC9gqN2kS-Q09ijWyW8sdoORQhLH07kAI_SR50sL6bjYtvih2otF3pdyPrHxKMQATL7ZIbEaxA9IDRwi1KA7lrM5EEKmKXmmKJnWjNMuEXRFjwLbw7URqrtfMMFLA8e0SgG7Q4878Lc_KW7LqJkdpDkRd4cDSqRbp2HiVldYpqeG8OEjgcxVS9BpQ?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

### 先に２つスイッチをつける

Pro Micro と位置が被るので Pro Micro の位置のスイッチ 2 つは先に実装する。

上側のケースを挟みこむようにしてスイッチを取り付ける。

<img src="https://hgaasw.ch.files.1drv.com/y4mc2BP86AEgyrKSczYwuB2xd4eoBKNQ4KhquoY7mk4DPs-6cHcwDGOmpILzn0nfm7CVf0NTdEUt5cagf4D_lOhdOkKHuhMDtDhB80rMRNE-HTh4STIXGPEW_U_7cuQqxEAXY3pdp0LK_ZHKX5GNr6mmGLDHDlYhMyscJhDtjsZsOjiN1ji-4sUF2zkuIjG8QAxGZ_gsGnbIF4ajUBEToMcTQ?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

スイッチを差し込むと PCB のパンダの目のようなとこにスイッチの足が出るのでハンダ付け。ここがしっかり接続されていないとキーを押したのに反応しないというようなことが起こるので注意。特に Pro Micro を取り付けた後だとここのハンダは修正出来ないのでハンダがちゃんと浸透してるか見ておいた方がいい。

### Pro Micro 取り付け

Pro Micro を実装する。それぞれ左右で表裏を変えないといけないので注意。

左手側(TRRS ジャックが右に来る方)は実装面が上に来るようにして実装。Pro Micro から飛び出した長い足はニッパーで切ってハンダ付け。

<img src="https://iqaasw.ch.files.1drv.com/y4mGkc4xtrqV5YE1GZz9Ot8be8M00g0_fwgRRlmHKfXRMsEEgosB20gxHUIV9AQzJ-bM_S_iqpu3jhgJlT9FcHLA7n5U80ZrGAzqp_AQzP8BftTr2PXzMRaeYR3idP1YvnkUmKsb2k8NbFb2CSdAokDNuCsY2Og1J7DPdpr6y6WZCEUQQUi1WApp7zAMmm8bWZKX8gv9Gs8KS2ak8UuqjQFrQ?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

右手側(TRRS ジャックが左に来る方)は裏側を表にして実装。

<img src="https://iaaasw.ch.files.1drv.com/y4m9jLjzUJJawBh8NlfNBmwXRg-JofQmUFjHEOgXskkbaTKk6UlE_yonASXdL3oLKHHUDNZytGyKWxnRr39KXuuA7VXCLc3_q6x523ZLOCPPERRweTx_kCTRWHLOdeXKeOyPgAU1ZlBsz7iCpXwQRKIeTtav4tJEcctRsi5KwQloEU0W0HEI-G-CCGAG5LDRojAU5dFHN2jdw02o9qCri6fkg?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

### スイッチ取り付け

残りのスイッチを全て取り付ける。

<img src="https://gaybwa.ch.files.1drv.com/y4mhwUF-UokW-i4HMxpXoACH1VMM8BqXjEKE0H4PaCd18Kiic9u7npca62IboQdXiUvNJp9Vp0mmnCxHcnWXju0lp42Cah5za_5PyPfSh6l47z4q6G2lDFLDM2zJoXEa_AmXu72GU4zGbNDVWTzYSSeXDRpMDHPBA-534Vlq3UuguTfxMwzYbd9kj-0KDyYEnD1lOnBtZlq9fnmG_-ph5QdIA?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

ハンダ付け後。同じくハンダ付けが甘いとキー押下時の認識が甘くなるのでちゃんとハンダ付けする。

<img src="https://gqybwa.ch.files.1drv.com/y4mLN753LmIQu1V992WSp6VrK7ysOsc-VukF8zXCBVt-xiPPBOByJ0lyg6Uz7PxsPNO8cqY-g5_zRu7l6G84mLKfuRaWNzkMaoydb0bSUYdbOynM5f52beoyaiT7zWNGN65WPg6S4GjgVbOD0Rdk-EPcEXJWcDm_A7R2KYptZ6XLIcoIWP2M41wSHNwr0VJ1mG307GjJ0A3N7rZfrIOVK8B7Q?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

### タクトスイッチ取り付け

ファームウェアを書き込む時に GNC と RST をショートさせる必要があるため、ボタン操作でリセット出来るようにタクトスイッチを取り付ける。それぞれ GND と RST をタクトスイッチの足にハンダ付け。

<img src="https://iwybwa.ch.files.1drv.com/y4m5jLAqCvWcOQblxIMaTcd9knX-m2XqWKSG_duQ-fORXu0o3sDmdD_hC52x-xnWzBYo1N9JlQsbG_Y9YW8REIi8c3a70YzGwnxGgMn2X5ehzvbSVjt2Ew5pAziG0KPQzO5OZFJc1cv6wayFoxsIcM4Rx_D-Q_R6hozLbGq4aEGQO8c8j0BEm8EK1W4xQPs9sZAx8NaBGpwPha1L635N4hHkA?width=3120&height=4160&cropmode=none" width="3120" height="4160" />

<img src="https://jaybwa.ch.files.1drv.com/y4mrmJWnLXTyVzF3vQW3WnTnEabbeofN-OBNcGjf3Ka2HO7WAUGzQT0TuHE7FBUtcQ4Od6GfthJWNctxtYjxVYzx8bC7O3eZImQ5c_REwInl00efvmpc1Hx-tktO97ncd3EyGICnPjl88IJ73bTk8UVd0xWSTi-CWV0rwpaM54wV-r67dA3wvjy-hTTLZYkEmeH5Pm09pu53KjYAw2Rplz3FA?width=3120&height=4160&cropmode=none" width="3120" height="4160" />

### LED 実装

一応ここまでで既にキーボードは動作するが光の民ゆえ光らせたいので LED を実装する。光の民って何。

Switch Science で買った LED（１７ｃｍ）をハサミで２つに切ってそれぞれ実装する。

<img src="https://iaybwa.ch.files.1drv.com/y4mRKqpbFxku7gKCZhJghVjULduUSHpxFpK7PQ_ArX28a1Ghumaknc5iWxkSIdU-CZjQvAt4_b-MblTESka0_o83n3A0AOP_snyQFM_gqD57_swFg0O1ebbrGj_XbqzqsXJfW1qtkeE5ViNdCZKexYxI1hka6ahRHARrylt1hvMBIUSGQck9mnf6UdBQ4mTIccgzU4Qv-KrHjauJVVKrqlFcw?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

たぶんここが一番苦労した。リード線に予備ハンダをして線をメッキしてからハンダ付け箇所でリード線に付着したハンダを溶かして付着させると楽かもしれない。

右手側は GND -> GND, +5V -> VCC, DI -> extra data で接続する。

<img src="https://skixvg.ch.files.1drv.com/y4mrI_iwEgfR1VIiVU1DBj9TxeZdbQvlmicJijTASkPwx3cxz4ZsTFp0BZPoo419AVifnyHn0Aj0BezXXMERFReAZgILWcMqlgJu2VbsChdhDDnaoUheIXXEDm7n8c4VPbsYemwBCdOJ9-2I69HQeXLbZgTeweD1sh1T0E1qjuo1rZmkpOlZCf4flq4ajYlGR1BQoCWyXMhDW9QIaPK9bzvow?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

左手側はそれぞれ左は+5V -> VCC, DO -> extra data, GND -> GND. 右側は DIN -> TX0 pin, GND -> GND, +5V -> VCC で接続する。

<img src="https://uaixvg.ch.files.1drv.com/y4mQKyOuuUal6JLuePdC_lM_Gb6561jeZRFFeSco83hq4iTx3shQTpEVyfT_M1xDtEVi7zTfG0Z-KDpAg7015xaHxMcl1X9ULUDf7jOAp1VTV88k6B5YAIuzyfeE_2cSv0p8CenMGfOQFmgBv3VhBqThdT7xKWWUkOlsxrR6MW-6lEmrqw759KGqvxcHNSl2_7Msye3lerFz4LXNJrNJJupVg?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

## ファームウェア書き込み

リポジトリを clone

```bash
git clone https://github.com/qmk/qmk_firmware.git
```

ファームウェアのビルドに必要なパッケージ類をインストール(Linux)

```bash
apt-get install gcc unzip wget zip gcc-avr binutils-avr avr-libc dfu-programmer dfu-util gcc-arm-none-eabi binutils-arm-none-eabi libnewlib-arm-none-eabi
```

デフォルトのレイアウトを書き込む

```bash
$ make lets_split/rev2:default
```

```bash
$ sudo make lets_split/rev2:default:avrdude
QMK Firmware 0.5.207
Making lets_split/rev2 with keymap default and target avrdude

avr-gcc (GCC) 4.9.2
Copyright (C) 2014 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

Size before:
   text	   data	    bss	    dec	    hex	filename
      0	  18850	      0	  18850	   49a2	./.build/lets_split_rev2_default.hex

Compiling: ./tmk_core/common/command.c                                                              [OK]
Linking: .build/lets_split_rev2_default.elf                                                         [OK]
Creating load file for flashing: .build/lets_split_rev2_default.hex                                 [OK]
Checking file size of lets_split_rev2_default.hex                                                   [OK]
 * File size is fine - 18850/28672
Detecting USB port, reset your controller now...........
Detected controller on USB port at /dev/ttyACM0

Connecting to programmer: .
Found programmer: Id = "CATERIN"; type = S
    Software Version = 1.0; No Hardware Version given.
Programmer supports auto addr increment.
Programmer supports buffered memory access with buffersize=128 bytes.

Programmer supports the following devices:
    Device code: 0x44

avrdude: AVR device initialized and ready to accept instructions

Reading | ################################################## | 100% 0.00s

avrdude: Device signature = 0x1e9587 (probably m32u4)
avrdude: NOTE: "flash" memory has been specified, an erase cycle will be performed
         To disable this feature, specify the -D option.
avrdude: erasing chip
avrdude: reading input file "./.build/lets_split_rev2_default.hex"
avrdude: input file ./.build/lets_split_rev2_default.hex auto detected as Intel Hex
avrdude: writing flash (18850 bytes):

Writing | ################################################## | 100% 1.41s

avrdude: 18850 bytes of flash written
avrdude: verifying flash memory against ./.build/lets_split_rev2_default.hex:
avrdude: load data flash data from input file ./.build/lets_split_rev2_default.hex:
avrdude: input file ./.build/lets_split_rev2_default.hex auto detected as Intel Hex
avrdude: input file ./.build/lets_split_rev2_default.hex contains 18850 bytes
avrdude: reading on-chip flash data:

Reading | ################################################## | 100% 0.14s

avrdude: verifying ...
avrdude: 18850 bytes of flash verified

avrdude: safemode: Fuses OK (E:CB, H:D8, L:FF)

avrdude done.  Thank you.
```

途中で`reset your controller now`と出るので GND と RST をショートしたスイッチを押す。1 回で認識しない場合は何回か押す。

書き込みが成功すると上記のようなログが出る。左手と右手両方とも書き込む。
USB 接続し、TRRS ソケットで繋げて全部のキーが動作するか確認。ハンダ付けが甘いと微妙に認識しづらいキーがあるので直しておく。

### LED の設定

`vim keyboards/lets_split/keymaps/default/rules.mk`

`rules.mk`に以下の行を追加

```
RGBLIGHT_ENABLE = yes
```

キーマップを修正する

```
vim keyboards/lets_split/keymaps/default/keymap.c
```

UNDERGLOW 用のレイヤーを定義

```
#define UNDERGLOW_LAYER 6
```

キーマップを追加

```
[UNDERGLOW_LAYER] = KEYMAP( \
  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______, \
  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______, \
  _______,  RGB_TOG,  RGB_MOD,  RGB_HUD,  RGB_HUI,  RGB_SAD,  RGB_SAI,  RGB_VAD,  RGB_VAI,  _______,  _______,  _______, \
  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______,  _______ \
),
```

QWERTY レイヤーのどこかのキーに`MO(UNDERGLOW_LAYER)`を割り当て

再度ファームウェア書き込みの時と同じ手順でキーマップを Flash し`MO(UNDERGLOW_LAYER)`でレイヤーを切り替えて`RGB_TOG`で LED が光ることを確認する。また`RGB_MOD`で発光パターンを色々切り替えられる。

以降もキーマップを変えたい場合は`keymap.c`を編集して変えることが出来る。

## 完成

こんな感じでなんとか完成。

<img src="https://u6ixvg.ch.files.1drv.com/y4mLfKNMawH4ubEowYh-8FARCykY9b6eRKWdZ8hw_eEJcNoQT-yXqxYvspmdnUjZnJydyewy-7r6tOh2eBF7eT2971-Q1w9lGMJ4AU_ujoGQcUUSkbYehZXST-aJJFCBexTGC06YIosebBsTnmP0fGPmUb_lcxbQm-mIh-j9a2A4ywTrDKPF3n4uF3eWtMc-pFzYYk2WDYqogjASzkWcFoOrw?width=4160&height=3120&cropmode=none" width="4160" height="3120" />

キーキャップは[DEVLIN K-SERIES AURORA](http://www.mechsupply.co.uk/product/devlin-k-series-aurora-planck-keyset)にした。

## 感想

パーツが揃ったり揃わなかったり、10 数年ぶりのハンダ付けに苦労したりと結構時間かかったけど初自作キーボードなのでやっぱりなんとなく愛着が湧く。キーマップを色々いじって自分好みの配列にしてみたい。

## 参考資料

* [lets\-split\-guide/assembly\.md at master · nicinabox/lets\-split\-guide](https://github.com/nicinabox/lets-split-guide/blob/master/assembly.md)
* [Let's split を作る\(製作編\) \- abcdefg\.\.\.\.\.](http://pppurple.hatenablog.com/entry/2017/09/24/193635)
* [分離型のコンパクトなキーボード let's split\(レツプリ\)を組み立てた話 \- Qiita](https://qiita.com/kzmake/items/443478763cdeaedcfd0a)
* [Pro Micro & QMK Firmware のセットアップガイド \(Let's Split 編\) \- Voxel Highway](http://riv-mk.hateblo.jp/entry/pro_micro_and_qmk)
* [レツプリ他自作キーボードまとめ \- yhara\.jp](http://yhara.jp/LetsSplit)
* [Let's Split を組み立てた話 \| 遊舎工房](https://yushakobo.jp/pluis9/2017/07/lets-split-fes/)
* [Install Build Tools · QMK Firmware](https://docs.qmk.fm/getting_started_build_tools.html)
