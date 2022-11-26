# 29 - Countdown Timer

## 摘要

做一個倒數計時器

-   功能
    -   各種設定好的時間可以進行倒數
    -   可以客製化時間倒數
-   畫面
    -   顯示目前倒數的數字
    -   顯示倒數結束時是幾點幾分

## 功能摘要

-   setInterval()
-   clearInterval()
-   Math.round()
-   Date.now() & new Date()
-   getHours()、getMinutes
-   document.customFomr - 獲取 form 表單的 dom
-   e.preventDefault()
-   監聽 sumbit 事件

## 步驟

### 1. 先製作倒數計時的功能

> 此步驟完整程式碼

```javascript =
let countdown;
function timer(secondes) {
	const now = Date.now();
	const then = now + secondes * 1000;
	const countdown = setInterval(() => {
		const secondesLeft = Math.round((then - Date.now()) / 1000);
		if (secondesLeft < 0) {
			clearInterval(countdown);
			return;
		}
		console.log(secondesLeft);
	}, 1000);
}
```

> 拆解步驟解釋

-   倒數計時的方法

```javascript =
//正常我們在製作倒數計時的時候會使用此方法;
fucntion timer(seconds){
    setInterval(() => {
	seconds--;
}, 1000);
}
//但上述的方法很容易出錯，所以先拿到當前時間請使用下方
//先拿到當前時間，再拿到當前時間 + 我們設定要時間
//兩個相加就是我們的總秒數
function timer(secondes) {
	const now = Date.now();
	const then = now + secondes * 1000;
		setInterval(() => {
            // 除1000取得秒數，用Math.round四捨五入
			const secondesLeft = Math.round((then - Date.now()) / 1000);
			// 注意不能寫成 const secondesLeft = then - now，
            //因為now只被放入一次當前時間，並沒有隨時更新
	}, 1000);
}
```

-   結束 setInterval()

```javascript =
// 要結束有特定的使用方法
let countdown;
//然後設判斷
//如果只是單純的return沒有辦法結束setInterval
if (secondesLeft < 0) {
	clearInterval(countdown);
	return;
}
```

### 2. 處理最一開的那一秒，不然不會展示開始的第一秒

-   直接做一個 function 帶入就可以

```javascript =
function timer(secondes) {
	showTimeLeft(secondes);
const countdown = setInterval(() => {
    ...略
 showTimeLeft(secondesLeft);
},1000)
}
//時間顯示得功能
function showTimeLeft(secondes) {
				console.log(secondes);
}
```

### 3. 開始轉換分鐘與秒數，並且輸出成 分鐘:秒數，在來顯示到畫面上

-   處理 function showTimeLeft 拿到的時間顯示成分鐘:秒數 & 呈現畫面

```javascript =
const timeDisplay = document.querySelector('.display__time-left');

function showTimeLeft(secondes) {
	const minutes = Math.floor(secondes / 60);
	const remainedSeconds = secondes % 60;
	// 這裡解決的是，如果小於10秒，要在前面加0
	const display = `${minutes}:${remainedSeconds < 10 ? '0' : ''}${remainedSeconds}`;
	// 呈現在畫面上
	timeDisplay.textContent = display;
}
```

### 4. 製作最後截止的時間(時間戳轉換成當前時間)，就是到幾點的時候會結束(現實時間)

-   拿到當前時間戳然後轉換成時間

```javascript =
function showEndTime(timestamp) {
	// 可以轉換成時間戳記
	const end = new Date(timestamp);
	const hours = end.getHours();
	const minutes = end.getMinutes();
	const endDisplay = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
	console.log(endDisplay);
}
```

-   設定好後我們回到 function timer showEndTime 加入近來，

```javascript =
function timer(secondes) {
...略
// 因為這是要顯示到期的時間，所以是當前時間 + 我們輸入的計時時間
showEndTime(then);
}
```

### 5. 製作上方快捷鍵時間

-   選取 button dom 並監聽

```javascript =
const buttons = document.querySelectorAll('[data-time]');
function startTimer() {
	// console.log(this.dataset.time);
	const secondes = this.dataset.time;
	timer(secondes);
}
//快捷鍵製作
buttons.forEach((button) => button.addEventListener('click', startTimer));
```

中間測試會遇到的問題是，在設定好快捷時間便帶入時間時，中間顯示的時間會亂跳，為什麼會發生這個事情，因為我們設定秒數小於 0 才會停止時間，所以當我們按了很多下快捷設定的時間，就代表在時間還沒跑完，都會不斷地顯示在畫面上

那要怎解決呢? 概念是:在新的一個計時器開始的時候，我們必須把上一個計時器清除

```javascript =
function timer(secondes) {
	// 再加上這一段
	clearInterval(countdown);
	...略
}
```

### 6. 製作自定義的時間，並顯示在畫面上

-   特別注意這裏面的 function 不用 arrow function 的原因是，為了讓 this 指向我們的 window

```javascript =
// 自定義
// 用這個方式可以拿到form 表單的元素
document.customForm.addEventListener('submit', function (e) {
	//阻止畫面更新
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
});
```
