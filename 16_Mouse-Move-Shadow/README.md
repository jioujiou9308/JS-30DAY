# 016 - Mouse Move Shadow

## 摘要

-   功能
    -   移動滑鼠，文字的影子要移動
-   面
    -   影子要隨著滑鼠相對的位子來修改距離
    -   追加: 模糊程度要隨著滑鼠相對的位子來修改

## 功能

-   offsetWidth
-   es6 解構賦值
-   this & e.target 的差異

## 內容

### 1. 先拿到最外層與 h1 的元素

-   從 f12 可以看到 .hero 包含了 h1，先獲取最外層.code 與內層 h1，然後制定滑鼠的事件監聽功能

```javascript =
const code = document.querySelector('.code');
const text = code.querySelector('h1');

function shadow(e) {
	console.log(e);
}

code.addEventListener('mousemove', shadow);
```

### 2.獲取.code 的整個頁面的範圍 & 滑鼠移動的位置

-   有使用 es6 的解構賦值，`const width = code.offsetWidth;`
    `const height = code.offsetHeight;`可以直接寫成`const { offsetWidth: width, offsetHeight: height } = code;`

```javascript =
function shadow(e) {
	// 獲取.code的寬度 & 長度
	const { offsetWidth: width, offsetHeight: height } = code;
	// 抓取滑鼠偏移的位置
	const { offsetX: x, offsetY: y } = e;
	console.log(x, y);
}
```

### 3.此時會遇到問題，當滑鼠移動到 h1 元素時，滑鼠的移動距離就會針對 h1 元素的長寬計算，並不會以.code 的長寬來呈現

-   可以先以`console.log(this)`;`console.log(e.target)`;來看呈現出來的是什麼，會發現在 h1 左上角的 x,y 為 0,0
-   所以當在 h1 元素裡面時 x 的數標位置應該是，當前 h1 的 offsetX + h1 的最左邊邊界到 code 的 x 邊界的距離

```javascript =
function shadow(e) {
	// 獲取.code的寬度 & 長度
	let { offsetWidth: width, offsetHeight: height } = code;
	// 抓取滑鼠偏移的位置
	let { offsetX: x, offsetY: y } = e;

	if (this !== e.target) {
		x = x + e.target.offsetLeft;
		y = y + e.target.offsetTop;
	}
	console.log(x, y);
}
```

-   在 shadow 的 function 中 this 是指向 .code(當中包含了 h1)，但是 e.target 就是看滑鼠移動到的是.code(裡面也還是包含 h1)，或是只有 h1

### 4.獲取陰影的 x,y 軸偏移的方向，並建立鼠標移動與陰影的官聯繫

-   先計算要給陰影的 x y 的數值

```javascript =
function shadow(e) {
    ...略

	// 先給定一個r 給陰影的計算
	let r = 100;

	// 數學計算，在陰影的政中心為0 上下左便最大最小值為 50 & -50
	const xR = Math.round((x / width) * r - r / 2);
	const yR = Math.round((y / height) * r - r / 2);
	console.log(xR, yR);
}
```

-   與 h1 陰影連結

```javascript =
text.style.textShadow = `${xR}px ${yR}px 3px rgba(0, 0, 0, 0.4),
${yR}px ${xR}px rgba(0, 0, 0, 0.4)`;
```

## 補充 :

-   補充 1: text-shadow 第三個參數: 模糊度
-   補充 2: Mouse Event Coordinate
    -   movementX, movementY
        距離上次 Event 觸發時滑鼠位置的差距
        原點: 上次的 screen(x, y)
        計算方式: currentEvent.movementX = currentEvent.screenX - previousEvent.screenX.
    -   clientX, clientY
        application client area 的座標, 也就是 client 的可視區座標
        可視區左上角
    -   offsetX, offsetY
        在 HTML 元素上的座標
        原點: 該 HTML 元素的左上角。
    -   pageX, pageY
        在頁面上的位置
        原點: 該頁的左上角(捲軸捲動時，座標會改變)
    -   screenX, screenY
        在螢幕上的座標
        原點: 作業系統畫面(螢幕)的左上角
        x, y
        client(x, y)的意思, 它只是別名
