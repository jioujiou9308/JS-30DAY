# 27 - Click and Drag

## 摘要

-   功能
    -   拖拉互動的功能, 要有拖拉畫面的感覺
-   畫面
    -   拖拉的程度，要和畫面移動程度，相同的 pixel

## CSS

-   perspective
-   :nth-child [w3school](https://www.w3schools.com/cssref/sel_nth-child.php)

## javascript

-   mousedown,mouseup,mouseleave,mousemove
-   pageX ,offsetLeft
-   scrollLeft 是滾輪移動的位置(我認為理解這個是這題的核心)

## 內容步驟

-   建議，可以先在 CSS 檔案中的 overflow-y: hidden;改為 auto 可以更好理解

### 1. 取得頁面元素與設定初始變數

```javascript =
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;
```

### 2. 先監聽滑鼠的四個事件 mousedown,mouseup,mouseleave,mousemove

```javascript =
/** 滑鼠按鍵按下 **/
slider.addEventListener('mousedown', () => {});

/** 滑鼠滑出範圍**/
slider.addEventListener('mouseleave', () => {});

/** 滑鼠按鍵放開 **/
slider.addEventListener('mouseup', () => {});

/** 滑鼠移動 **/
slider.addEventListener('mousemove', () => {});
```

### 3. 滑鼠按下事件

-   `e.pageX : `滑鼠點下時的 X 座標
-   `starX :` 目前螢幕上點擊的起始 X 點座標(p.pageX)，如果有 margin 會影響所以要扣(slider.offsetLeft)，這樣才可以獲得真正的 X 座標(startX)
-   `scrollLeft = slider.scrollLeft : `一開始點擊就拿到的滾動卷軸目前的位置

```javascript =
slider.addEventListener('mousedown', (e) => {
	isDown = true;
	slider.classList.add('active');
	startX = e.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;
	// console.log('mousedown-scrollLeft :', scrollLeft, 'mousedown-startX: ', startX);
});
```

### 4. 當滑鼠沒有按下的時候

```javascript =
slider.addEventListener('mouseup', () => {
	isDown = false;
	slider.classList.remove('active');
});
```

### 5. 當滑鼠移出的時候

```javascript =
slider.addEventListener('mouseleave', () => {
	isDown = false;
	slider.classList.remove('active');
});
```

### 6. 當滑鼠移動的時候

-   這裡要與滑鼠點擊的時候做搭配
-   `moveX :` 獲取滑鼠移動的 X 點座標(e.pageX)，一樣要扣掉 margin 的影響(slider.offsetLeft)，才能得到真正滑鼠移動的 X 座標(moveX)
-   `walk : `當我點及滑鼠時，移動的左右距離

```javascript =
slider.addEventListener('mousemove', (e) => {
	// 過濾掉不是點擊的時候
	if (!isDown) return;
	const moveX = e.pageX - slider.offsetLeft;
	// console.log(`點擊下去的起始點${startX}，隨時變化的${x}`);
	// 獲得拖動多少的距離
	const walk = moveX - startX;
	slider.scrollLeft = scrollLeft - walk;

	console.log('startX: ', startX, 'moveX: ', moveX, 'walk: ', walk);
});
```
