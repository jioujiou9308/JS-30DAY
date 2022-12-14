# 30 - Whack A Mole

## 摘要

-   功能
    -   一個關卡要幾分鐘要固定
    -   地鼠冒出來、自動縮下去的時間間隔要不一樣
-   畫面
    -   畫面要顯示目前的關卡
    -   地鼠要自動冒出來、縮下去
    -   地鼠被點到要縮下去、數量要增加

## 步驟內容

### 1. 我們先做出可以呈現在畫面上的計分與計時器

-   在計時器裡面我們先寫一個 function getRandomMole() - 要做的是，當我們開始遊戲時，地鼠隨機跑出來，些寫好放者

```javascript =
let score = 0;
let timeUp = true;
// 分數
const setScore = function (s) {
	score = s;
	scoreBoard.textContent = score;
};
// 開始遊戲
const startGame = function () {
	setScore(0);
	timeUp = false;

	getRandomMole();

	setTimeout(() => {
		(timeUp = true), alert('Time is up');
	}, 10000);
};
```

### 2.使用 proxy 讓資料驅動畫面，當為 true 的時候，地鼠就跳起來

-   這裡有一點不太一樣的是要新增一個 css 在裡面`.mole.up {top: 0;}`
-   在網頁主控台打 moleProxy[index] = true 就可以檢查是否有地鼠跑出來

```javascript
// 觀察每個洞的目前狀態
const status = moles.reduce((prev, current, index) => {
	prev[index] = false;
	return prev;
}, {});
// 先把clickHandlers坐起來
const clickHandler = function () {};
// 使用js proxy 來做狀態
const molesProxy = new Proxy(status, {
	get(target, key) {
		return target[key];
	},
	set(target, key, value) {
		target[key] = value;
		moles[key].removeEventListener('click', clickHandler);
		if (value) {
			moles[key].addEventListener('click', clickHandler);
			moles[key].classList.add('up');
		} else {
			moles[key].classList.remove('up');
		}
	},
});
```

### 3.接下來做當地鼠跑起來我們點擊時，要新增分數，並且點完就變 false，地鼠消失

```javascript =
// 功能: 滑鼠彈跳起來，我們點擊得到分數，地鼠消失
const clickHandler = function () {
	if (molesProxy[moles.indexOf(this)]) {
		setScore(score + 1);
		molesProxy[moles.indexOf(this)] = false;
	}
};
```

### 4.地鼠隨機從棟裡面跑出來

```javascript
const getRandomMole = function () {
	const mole = Math.floor(Math.random() * moles.length);
	const time = Math.random() * (1000 - 500) + 500;
	// 這行是做檢查，如果已經被打了，那就在打開一次新的隨機
	if (molesProxy[mole]) return getRandomMole();
	molesProxy[mole] = true;
	setTimeout(() => {
		if (!timeUp) getRandomMole();
		molesProxy[mole] = false;
	}, time);
};
```
