# 08 - Fun with HTML5 Canvas

## 摘要

-   功能
    -   可以畫圖的書布粗細、顏色變化
-   畫面
    -   邊畫邊換色、粗細，停下來，再繼續畫，粗細和顏色與上次停筆相同

## 功能摘要

## 步驟

1. 定義畫布的大小

-   html 內已經定義了標籤 canvas 用 JS 選取後，需先設定畫布的內容，使用 getContext('2d')定義為 2d 繪圖。接下來可以定義畫布範圍，若不定義範圍則使用 html 定義的範圍，若需改寫則須重新定義，這邊定義為 window.innerWidth 及 window.innerHeight。

```javascript =
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.heigh = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
```

2. 接下來定義繪製的顯示方式

-   Canvas 已經有內建許多屬性，可參考[Canvas](https://www.w3school.com.cn/tags/html_ref_canvas.asp)，這邊會設定 4 種屬性。

```javascript =
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round'; //round為圓弧。
ctx.lineCap = 'round'; //round為圓弧。
ctx.lineWidth = 100;
```

3. 先定義繪畫的方法，並查看監聽事件是否有效。

-   定義 draw 這個方法。首先可以先判定 isDrawing 是否為 true，為 false 則返回。

```javascript =
function draw(e) {
	if (!isDrawing) return; //設定停止
	console.log(e); //此時可以打開使用者工具看看有無回傳座標相關訊息，若有則代表到目前為止皆為成功!
}
```

無法理解!isDrawing 用法，索性直接寫 isDrawin === false 時 return

4. 接下來開始定義繪畫的內容

-   定義繪畫內容會用到 4 個參數。
    -   ctx.beginPath()當作繪畫啟動
    -   ctx.moveTo(a,b)當作起始位置。
    -   ctx.lineTo(a,b)當作終點位置。
    -   ctx.stroke()代表繪製以定義的路徑。
-   先在 function 外定義最後的位置為 lastX, lastY。e.offsetX 代表回傳事件的當前座標，所以我們可以定義 e.offsetX, e.offsetY 為每次的起始位置。

```javascript =
let lastX = 0;
let lastY = 0;

function draw(e) {
	if (!isDrawing) return;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY); //畫到的位置。
	ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
}); //開始繪圖
```

-   到這邊應該會發現繪製的途徑都是以同一個點當作起始位置，所以我們需要動態的更動起始位置，在 draw 方法內加入[lastX, lastY] = [e.offsetX, e.offsetY];更新起始位置。

```javascript =
function draw(e) {
	if (!isDrawing) return;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY); //畫到的位置。
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];
}
```

5. 到目前為止應該就能呈現在畫布上畫圖的效果了!如果你還想要再做些效果?像是顏色，以及繪畫的粗細?這邊先來時做顏色的變化吧!

-   hsl 是一個色彩表示的方式 hsl(hue, Saturation, Lightness)。
    -   hue 代表顏色的度數 0-360，0 是紅色 ，120 是綠色，240 是藍色；
    -   Saturation 代表灰階程度，0%為灰黑，100%為彩色，一般設置為 100%
    -   Lightness 為亮度，0%代表黑，100%代表白，一般設置為 50%。

```javascript =
let hue = 0;

function draw(e){
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;//重新定義顏色
  ...
  hue++;
  if(hue>=360){
    hue = 0; //若++到360自動歸零
  }
}
```

6. 顏色定義完了， 應該可以看到效果了吧?接下來要來定義寬度囉，這邊的處理方式是由細到粗，並回歸到細。

-   定義 direction 為粗細的參數，並定義其在 draw 中的變化。
-   當 direction 為 ture 時，ctx.lineWidth 遞增，當增加到 100 時把 direction 改成 false。
-   當 direction 為 false 時，ctx.lineWidth 遞減，當撿到 1 時把 direction 改成 true。

```javascript =
let direction = true;

function draw(e){
  ...
  if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
    direction = !direction;
  }
  if(direction){
    ctx.lineWidth++
  }else{
    ctx.lineWidth--
  }
}
```

## 延伸閱讀文章

[true & false 傻傻分不清楚](https://medium.com/@augus/javascript-true-false-ec3c1856623b)
