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
  width: min(240px, 70vw);
  height: auto;
}
```
