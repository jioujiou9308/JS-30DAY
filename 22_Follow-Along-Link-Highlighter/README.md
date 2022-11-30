# 22 - Follow Along Link Highlighter

## 摘要

-   功能
    -   超連結 Hover 時，白色區塊要出現在該超連結區塊上
-   畫面
    -   白色區塊的寬高要符合該超連結區塊
    -   滑鼠進入另一個超連結區塊時，白色的區塊不會消失

## JS 語法

-   createElement
-   mouseenter - 當滑鼠移往該項目時驅動。
-   getBoundingClientReact() -返回目標元素的大小與相對於瀏覽器視窗的位置資訊 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

## 內容步驟

### 1. 先創造一個標籤，並且新增 highlight 的節點與 class 並新增到頁面上

```javascript =
const highlight = document.createElement('span');
highlight.classList.add('highlight');
highlight.textContent = 'hello world';
document.body.appendChild(highlight);
```

### 2. 先對所有的 a 連結做事件間聽，使用 mouseenter

```javascript =
const links = document.querySelectorAll('a');
links.forEach((link) => {
	link.addEventListener('mouseenter', flow);
});
```

### 3. 獲取目標的大小以及位置，製作能匹配重點區域的大小 hightlight

```javascript =
function flow() {
	console.log('hi');
	// 目標元素的尺寸、高度等等的訊息
	// console.log(this.getBoundingClientRect());
	const linkRect = this.getBoundingClientRect();
	highlight.style.width = `${linkRect.width}px`;
	highlight.style.height = `${linkRect.height}px`;
}
```

### 4. 將我們製作好的 hightlight 可以隨者我們的數標一動到指定區域

```javascript =
function flow() {
	...略

	highlight.style.transform = `translate(${linkRect.left}px,${linkRect.top}px)`;
}
```

### 5. 但會有一個問題要解決當滾輪移動，hightlight 的筐會偏移

-   因為我們拿到的 linkRect.left 、 linkRect.top 是根據目標的位置所得到的距離，
    如果有用到滾動卷軸時，他會跑偏移，所以要根據是否有滾動卷軸去處理

```javascript =
function flow() {
	console.log('hi');
	// 目標元素的尺寸、高度等等的訊息
	// console.log(this.getBoundingClientRect());
	const linkRect = this.getBoundingClientRect();
	// 解決滾動卷軸的問題
	const linkStyle = {
		width: linkRect.width,
		height: linkRect.height,
		left: linkRect.left + window.scrollX,
		top: linkRect.top + window.scrollY,
	};
	highlight.style.width = `${linkStyle.width}px`;
	highlight.style.height = `${linkStyle.height}px`;
	highlight.style.transform = `translate(${linkStyle.left}px,${linkStyle.top}px)`;
}
```

### this.getBoundingClientRect() 補充

-   botton:項目底部到當前視窗上緣的距離。(=y or y+height)
-   height:項目本身的高度。( = botton - top)
-   left:項目左邊到視窗當前最左的距離。(=x or x+width)
-   right:項目右邊到視窗最左的距離。(=x or x+width)
-   top:項目頂部到到視窗當前上緣的距離。(=y or y+height)
-   width:項目本身寬度。( = right - left)
-   x:該項目在視窗中的 x 距離
-   y:該項目在視窗中的 y 距離

### 滑鼠事件補充

-   mouseover vs mouseenter
    -   mouseover:當項目的子項目被指到時也會驅動。
    -   mouseenter:只會受當下的項目(bound element)影響。
