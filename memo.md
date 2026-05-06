# 反映コードメモ

## ファビコン

`index.html` の `<head>` 内に追記:

```html
<link rel="icon" href="./svg/favicon.svg?v=20260506-2" type="image/svg+xml" sizes="any" />
<link rel="shortcut icon" href="./svg/favicon.svg?v=20260506-2" type="image/svg+xml" />
```

## ロゴ

`index.html` のヘッダー内を変更:

```html
<h1 class="brand-name">
  <img class="brand-logo" src="./svg/logo_white.svg" alt="BeEngineer" />
</h1>
```

`styles.css` に追記:

```css
.brand-logo {
  display: block;
  width: 70vw;
  max-width: 240px;
  height: auto;
}
```

## カリキュラム

追加ファイル:

- `curriculum.html`
- `curriculum.js`
- `data/curriculum-schedule.json`

`index.html` のモードボタン内に追記:

```html
<a class="btn btn-curriculum" href="./curriculum.html">カリキュラムを見る</a>
```

`curriculum.html` で読み込むファイル:

```html
<link rel="stylesheet" href="styles.css" />
<script src="curriculum.js" defer></script>
```

`curriculum.js` で読み込むデータ:

```js
const CATALOG_URL = "data/catalog.json";
const SCHEDULE_URL = "data/curriculum-schedule.json";
```

`styles.css` に追記:

```css
.app--wide {
  max-width: 960px;
}

.btn-curriculum {
  margin-left: auto;
  background: rgba(88, 166, 255, 0.16);
  border-color: #58a6ff;
  color: #a5d6ff;
}

.btn-curriculum:hover {
  background: rgba(88, 166, 255, 0.28);
}
```

`styles.css` にカリキュラム表示用クラスを追記:

```css
.curriculum-list
.curriculum-section-title
.curriculum-item
.curriculum-item-meta
.curriculum-session
.curriculum-date
.curriculum-item-title
```
