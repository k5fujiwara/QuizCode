# クイズアプリ テンプレート

HTML / CSS / JavaScript と JSON だけで動く、シンプルなクイズWebアプリです。

問題データを JSON ファイルに書くだけで、クイズモードとチャレンジモードを使えます。サーバーやデータベースは不要なので、GitHub Pages にアップロードするだけで公開できます。

## できること

- コースと単元を選んでクイズを表示できます。
- クイズモードでは、1問ずつ解いてすぐに正誤と解説を確認できます。
- チャレンジモードでは、制限時間つきで複数問をまとめて解けます。
- 問題文、選択肢、正解、解説は JSON で編集できます。
- GitHub Pages で無料公開できます。

## ファイル構成

```text
QuizCode/
  index.html
  app.js
  styles.css
  sample-unit.json
  data/
    catalog.json
  svg/
```

## 各ファイルの役割

### `index.html`

アプリの画面構造を定義するファイルです。

タイトル、コース選択、単元選択、クイズモード、チャレンジモードなどの画面パーツが書かれています。はじめのうちは、アプリ名を変える場合以外は大きく編集しなくて大丈夫です。

変更しやすい場所:

```html
<title>学習クイズテンプレート</title>
```

```html
<h1 class="brand-name">学習クイズテンプレート</h1>
```

### `styles.css`

アプリの見た目を決めるファイルです。

色、余白、ボタン、カード、スマホ表示などのデザインが書かれています。文字色や背景色を変えたい場合はこのファイルを編集します。

### `app.js`

アプリの動きを作っているファイルです。

JSONの読み込み、問題の表示、選択肢のシャッフル、採点、タイマー、結果表示などを担当しています。初心者が問題を追加するだけなら、基本的に編集する必要はありません。

チャレンジモードの問題数や制限時間を変えたい場合は、以下を編集します。

```js
const TEST_COUNT = 10;
const TEST_TIME_LIMIT_SEC = 300;
```

- `TEST_COUNT`: チャレンジモードで出題する問題数
- `TEST_TIME_LIMIT_SEC`: 制限時間。秒で指定します。`300` は5分です。

デザインとフォントを変えたい場合は、以下の数字を変更します。

```js
const DESIGN_PATTERN = 1;
```

選べるデザイン:

- `1`: ダーク。現在の標準デザインです。
- `2`: 明るい教室。白ベースで見やすいデザインです。
- `3`: ポップ。やわらかい色で親しみやすいデザインです。
- `4`: グリーン。自然・安心感のあるデザインです。
- `5`: オーシャン。濃い青を使った落ち着いたデザインです。
- `6`: サンセット。オレンジ系のあたたかいデザインです。
- `7`: ラベンダー。紫系のやさしいデザインです。
- `8`: モノクロ。シンプルで教材感のあるデザインです。
- `9`: レトロゲーム。濃い背景と黄色アクセントのデザインです。
- `10`: さくら。淡いピンク系のやわらかいデザインです。

数字を変えて保存し、ブラウザを再読み込みするとデザインとフォントが切り替わります。

### `data/catalog.json`

コース、分野、単元の一覧を管理するファイルです。

アプリは最初にこのファイルを読み込み、「どの単元JSONを表示するか」を判断します。

現在の例:

```json
{
  "version": 2,
  "courses": [
    {
      "id": "sample",
      "name": "サンプルコース",
      "fields": [
        {
          "id": "sample-basic",
          "name": "サンプル分野",
          "units": [
            {
              "id": "sample-u1",
              "title": "サンプル単元",
              "jsonPath": "sample-unit.json"
            }
          ]
        }
      ]
    }
  ]
}
```

主な項目:

- `courses`: コースの一覧です。
- `course.id`: コースを識別するためのIDです。英数字がおすすめです。
- `course.name`: 画面に表示されるコース名です。
- `fields`: 分野の一覧です。
- `field.id`: 分野を識別するためのIDです。
- `field.name`: 画面に表示される分野名です。
- `units`: 単元の一覧です。
- `unit.id`: 単元を識別するためのIDです。
- `unit.title`: 画面に表示される単元名です。
- `unit.jsonPath`: 問題データJSONへのパスです。

### `sample-unit.json`

問題データのサンプルです。

このファイルをコピーして、新しい単元用の JSON ファイルを作れます。

問題データの形式:

```json
{
  "unit_title": "サンプル単元（Web・プログラミング基礎）",
  "questions": [
    {
      "question": "HTMLでページの見出しを表す要素として最も適切なものはどれですか？",
      "options": ["<header>", "<h1>", "<title>", "<section>"],
      "answer": 1,
      "commentary": "見出しの主役は h1〜h6 です。title は文書タイトル、header は領域のヘッダーです。"
    }
  ]
}
```

主な項目:

- `unit_title`: 単元名です。
- `questions`: 問題の一覧です。
- `question`: 問題文です。
- `options`: 選択肢です。必ず4つ書きます。
- `answer`: 正解の番号です。`0` から数えます。
- `commentary`: 解説です。

注意点:

- `answer` は `0` から始まります。
- 1番目の選択肢が正解なら `0`、2番目なら `1`、3番目なら `2`、4番目なら `3` です。
- JSONでは、最後の項目の後ろにカンマを付けないでください。
- ダブルクォーテーション `"` を使ってください。シングルクォーテーション `'` は使えません。

## ダウンロードして使う方法

GitHubにあるテンプレートを使う場合は、次のどちらかの方法で取得します。

### 方法1: ZIPでダウンロードする

1. GitHubのリポジトリページを開きます。
2. 緑色の `Code` ボタンを押します。
3. `Download ZIP` を押します。
4. ZIPファイルを展開します。
5. 展開したフォルダを VS Code や Cursor で開きます。

### 方法2: Gitでクローンする

Gitを使える場合は、ターミナルで以下を実行します。

```bash
git clone リポジトリのURL
cd リポジトリ名
```

例:

```bash
git clone https://github.com/ユーザー名/リポジトリ名.git
cd リポジトリ名
```

## ローカルで起動する方法

このアプリは JSON ファイルを読み込むため、`index.html` を直接ダブルクリックして開くと正しく動かない場合があります。

プロジェクトフォルダで簡易サーバーを起動してください。

### Pythonを使う方法

ターミナルでプロジェクトフォルダに移動して、以下を実行します。

```bash
python -m http.server 8000
```

ブラウザで以下を開きます。

```text
http://localhost:8000
```

停止するときは、ターミナルで `Ctrl + C` を押します。

### VS Code / Cursor の拡張機能を使う方法

`Live Server` などの拡張機能を使っても起動できます。

起動方法は主に2つあります。

1. `index.html` を右クリックして、`Open with Live Server` のような項目を選びます。
2. エディター右下に表示される `Go Live` をクリックします。

起動すると、ブラウザでアプリが開きます。

停止するときは、エディター右下に表示されている `Port: 5500` のような部分をクリックします。ポート番号は環境によって変わるため、`Port: 5500`、`Port: 5501` など表示されている番号は違っていても大丈夫です。

## 問題を編集する方法

まずは `sample-unit.json` を編集します。

例:

```json
{
  "question": "CSSで文字色を指定するプロパティはどれですか？",
  "options": ["font-size", "color", "background", "margin"],
  "answer": 1,
  "commentary": "文字色を変えるには color を使います。"
}
```

問題を増やす場合は、`questions` 配列の中に問題オブジェクトを追加します。

```json
{
  "unit_title": "サンプル単元",
  "questions": [
    {
      "question": "問題1",
      "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "answer": 0,
      "commentary": "解説1"
    },
    {
      "question": "問題2",
      "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
      "answer": 2,
      "commentary": "解説2"
    }
  ]
}
```

## 新しい単元を追加する方法

例として、`data/unit02.json` を追加する場合の手順です。

1. `sample-unit.json` をコピーします。
2. コピーしたファイルを `data/unit02.json` という名前にします。
3. `data/unit02.json` の `unit_title` と `questions` を編集します。
4. `data/catalog.json` の `units` に単元を追加します。

`data/catalog.json` の例:

```json
"units": [
  {
    "id": "sample-u1",
    "title": "サンプル単元",
    "jsonPath": "sample-unit.json"
  },
  {
    "id": "sample-u2",
    "title": "2つ目の単元",
    "jsonPath": "data/unit02.json"
  }
]
```

注意:

- `jsonPath` は、`index.html` から見たファイルの場所を書きます。
- `data/unit02.json` に保存した場合は、`"jsonPath": "data/unit02.json"` と書きます。
- JSONのカンマ忘れ、余分なカンマに注意してください。

## 作成したクイズの保存場所と形式

作成したクイズは、単元ごとに1つの JSON ファイルとして保存するのがおすすめです。

おすすめの保存場所:

```text
data/
  unit01.json
  unit02.json
  html-basic.json
```

`sample-unit.json` は見本用として残し、新しく作る問題は `data/` フォルダの中に保存すると管理しやすくなります。

ファイル名のおすすめ:

- 半角英数字、ハイフン `-`、アンダースコア `_` を使います。
- 日本語やスペースは、公開時にパスの扱いが分かりにくくなることがあるため避けると安心です。
- 例: `math-basic.json`、`html-css-u1.json`、`network-01.json`

クイズデータの形式:

```json
{
  "unit_title": "HTMLの基礎",
  "questions": [
    {
      "question": "HTMLで一番大きい見出しを表すタグはどれですか？",
      "options": ["<p>", "<h1>", "<title>", "<div>"],
      "answer": 1,
      "commentary": "<h1> はページ内の大きな見出しに使います。"
    }
  ]
}
```

各項目の意味:

- `unit_title`: 単元名です。画面の「単元名」に表示されます。
- `questions`: 問題の一覧です。複数問ある場合は `{ ... }` をカンマで区切って追加します。
- `question`: 問題文です。
- `options`: 選択肢です。このアプリでは必ず4つにします。
- `answer`: 正解の番号です。1番目は `0`、2番目は `1`、3番目は `2`、4番目は `3` です。
- `commentary`: 解説です。正解・不正解の確認後に表示されます。

保存したクイズを画面で選べるようにするには、`data/catalog.json` に登録します。

```json
{
  "id": "html-css-u1",
  "title": "HTMLの基礎",
  "jsonPath": "data/html-css-u1.json"
}
```

`jsonPath` には、`index.html` から見た JSON ファイルの場所を書きます。たとえば `data/html-css-u1.json` に保存した場合は、`"jsonPath": "data/html-css-u1.json"` です。

編集時のチェックポイント:

- JSON ファイルは文字コード `UTF-8` で保存します。
- 文字列は必ずダブルクォーテーション `"` で囲みます。
- 最後の項目の後ろにカンマは付けません。
- `options` は4つ、`answer` は `0` から `3` のどれかにします。
- GitHub Pages で公開する場合は、追加した JSON ファイルも必ず GitHub にアップロードします。

## 新しいコースを追加する方法

`data/catalog.json` の `courses` にコースを追加します。

例:

```json
{
  "id": "web-basic",
  "name": "Web基礎コース",
  "fields": [
    {
      "id": "html-css",
      "name": "HTML・CSS",
      "units": [
        {
          "id": "html-css-u1",
          "title": "HTMLの基礎",
          "jsonPath": "data/html-basic.json"
        }
      ]
    }
  ]
}
```

複数コースにする場合は、`courses` 配列の中にコースオブジェクトを並べます。

## GitHubにアップロードする方法

GitHubに公開するには、GitHubアカウントが必要です。

### 方法1: GitHubの画面からアップロードする

Gitに慣れていない場合はこちらが簡単です。

1. GitHubにログインします。
2. 右上の `+` から `New repository` を選びます。
3. `Repository name` にリポジトリ名を入力します。
4. 公開したい場合は `Public` を選びます。
5. `Create repository` を押します。
6. 作成後の画面で `uploading an existing file` を選びます。
7. このプロジェクト内のファイルをアップロードします。
8. `Commit changes` を押します。

アップロードする主なファイル:

- `index.html`
- `app.js`
- `styles.css`
- `sample-unit.json`
- `data/catalog.json`
- `README.md`

問題ファイルを増やした場合は、それらの JSON ファイルもアップロードしてください。

### 方法2: Gitコマンドでアップロードする

ターミナルでプロジェクトフォルダを開き、以下を実行します。

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ユーザー名/リポジトリ名.git
git push -u origin main
```

すでにGit管理されているフォルダの場合は、以下で変更をアップロードできます。

```bash
git add .
git commit -m "Update quiz app"
git push
```

## GitHub Pagesで公開する方法

GitHubにアップロードした後、GitHub Pages を有効にするとWeb上でアプリを公開できます。

1. GitHubでリポジトリを開きます。
2. `Settings` を開きます。
3. 左メニューの `Pages` を開きます。
4. `Build and deployment` の `Source` で `Deploy from a branch` を選びます。
5. `Branch` で `main` を選びます。
6. フォルダは `/root` を選びます。
7. `Save` を押します。
8. 数十秒から数分待ちます。
9. Pages の画面に表示されるURLを開きます。

公開URLは、通常以下のような形になります。

```text
https://ユーザー名.github.io/リポジトリ名/
```

## 更新した内容をGitHub Pagesに反映する方法

問題やデザインを編集した後は、GitHubに変更をアップロードします。

Gitコマンドの場合:

```bash
git add .
git commit -m "Update quiz data"
git push
```

GitHub Pages は、`main` ブランチに反映された内容を自動で再公開します。

反映に少し時間がかかる場合があります。数分待ってからページを再読み込みしてください。

## よくあるエラー

### 画面に「data/catalog.json を読み込めませんでした」と表示される

`index.html` を直接ダブルクリックして開いている可能性があります。

`python -m http.server 8000` や Live Server を使って起動してください。

### 問題が表示されない

以下を確認してください。

- `data/catalog.json` の `jsonPath` が正しいか
- 指定した JSON ファイルが存在するか
- JSONのカンマやダブルクォーテーションが正しいか
- `questions` が空になっていないか

### JSONエラーになる

よくある原因:

- 最後の項目の後ろにカンマがある
- カンマが足りない
- `"` ではなく `'` を使っている
- `options` が4つではない
- `answer` が `0`、`1`、`2`、`3` 以外になっている

### GitHub Pagesで古い内容が表示される

ブラウザのキャッシュが残っている場合があります。

以下を試してください。

- 数分待ってから再読み込みする
- `Ctrl + F5` で強制再読み込みする
- 別のブラウザやシークレットウィンドウで開く

## 編集のおすすめ順

初めて使う場合は、次の順番で編集するとわかりやすいです。

1. `sample-unit.json` の問題を変更する
2. ローカルサーバーで表示を確認する
3. 問題数を増やす
4. 必要なら `data/catalog.json` に単元を追加する
5. GitHubにアップロードする
6. GitHub Pagesで公開する

## 注意事項

- 生徒の個人情報や非公開の教材データを、公開リポジトリに入れないでください。
- GitHub Pagesで公開する場合、リポジトリが `Public` だと中身のファイルも公開されます。
- 非公開で使いたい場合は、リポジトリの公開範囲や配布方法を事前に確認してください。
