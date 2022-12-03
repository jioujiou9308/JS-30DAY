# 24 - Sticky Nav

## 摘要

-   功能
    -   menu 到畫面最上面，要固定
-   畫面
    -   menu 固定在畫面上面時，要露出 Logo
    -   menu 不固定時，不露出 logo
    -   menu 固定的那一瞬間，下面的文章不可以出現跳動

## 內容步驟

1. 選取要比較的數值：scrollY vs topOfNav
2. 比對數值，並修改 Css 效果。
3. 針對 jerky jump 效果進行處理。
4. 加入 css 的動畫效果修正。

### 1. 先監聽網頁滾動的事件，並取得 nav 的元素

```javascript =
const nav = document.querySelector('nav');
const body = document.querySelector('body');
window.addEventListener('scroll', fixNav);
```

### 2. 定義一個 css ，當網頁滾動到某個位置時，nav 開始固定

-   `window.scrollY` 就是視窗滾動的 Y 距離
-   使用 `navTop = nav.offsetTop` 就是計算 nav 到頂點的距離
-   當滾輪距離 > nav 到頂部的距離開始作用，新增一個 `nav-fix`的 class 在 nav 中
-   不使用 header 的距離是因為，很有可能對裡面的東西做更改，不利於維護

```css =
/* 自定義新增的nav class 名稱 */
/* 鎖住位置 */
.nav-fix {
	position: fixed;
}
```

```javascript =
const navTop = nav.offsetTop;
function fixNav() {
	if (window.scrollY > navTop) {
		nav.classList.add('nav-fix');
	} else {
		nav.classList.remove('nav-fix');
	}
}
```

### 3. 這時會遇到一個問題，當我們往下拉 nav fix 在頂端的時候，下層內容會突然忽視 nav 的距離，導致下文會瞬間往上，解決方法如下

-   要知道我們 nav 的高度是多少，用的是 `offsetHeight` =>`nav.offsetHeight`
-   知道距離後當 fix 啟動時把他加入倒 body 的 paddinTop 中

```javascript =
function fixNav() {
	if (window.scrollY > navTop) {
		nav.classList.add('nav-fix');
		// 解決內文突然上移
		body.style.paddingTop = `${nav.offsetHeight}px`;
	} else {
		nav.classList.remove('nav-fix');
		body.style.padding = 0;
	}
}
```

### 5. 在 html 中原本就有 logo，現在要做的是，當 nav fix 的時候，logo 就要顯示出來

-   原本的 css 是將 logo 的 max-width = 0 來隱藏
-   所以我們只要多寫上下方的 code 就可以，當 nav 新增了 nav-fix 的 class 時，第下的 class = li.logo 的 max-width 就會變成我們設定的寬度

```css =
.nav-fix li.logo {
	max-width: 300px;
	font-size: 40px;
}
```

## 延伸問題

-   display 與 transition 的衝突解決辦法 [連結筆記](https://accessible-brownie-b60.notion.site/Transition-display-c9ef3b50f9954e2daab08e1273b4ecab)
