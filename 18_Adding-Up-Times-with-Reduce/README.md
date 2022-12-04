# 18 - Adding Up Times with Reduce

## 摘要

透過 Reduce 把播放清單中的時間加起來。

-   功能
    -   加總時間
-   畫面
    -   依時間格式顯示小時、分鐘、秒數

## 內容步驟

### 1. 先拿到所有的字串的時間

-   因為拿到的是節點，並不是 array 所以要使用 array.from 去轉換，才能使用 map(會回傳一個數所以有 return)

```javascript
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
// console.log(timeNodes);
const seconds = timeNodes.map((node) => {
	return node.dataset.time;
});
```

### 2. 開始計算拿到的 data-time

-   這裡我使用我最值觀的方式，用 for 迴圈去對每一個 data-time 做 slice
-   要注意的是 slice 使用負數，從後面開始切，是因為秒數都是:xx，固定三個，但分鐘有的是個位數，有個是十位數，所以從後面切開，
-   接者拿到後就是把它加總起來

```javascript =
let calMin = 0;
let calSecond = 0;

// 分鐘還有秒數
for (let i = 0; i < seconds.length; i++) {
	let cutMins = Number(seconds[i].slice(0, -3));
	let cutSeconds = Number(seconds[i].slice(-2));
	calMin = calMin + cutMins;
	calSecond = calSecond + cutSeconds;
}
```

### 3. 把拿到的時間全部換成秒數，再接者計算小時分鐘秒數即可

```javascript =
// 先全部轉成秒數
calSecond = calSecond + calMin * 60;
let hour = Math.floor(calSecond / 3600);
let min = Math.floor((calSecond - hour * 3600) / 60);
let second = calSecond - hour * 3600 - min * 60;
console.log(hour + ':' + min + ':' + second);
```

## 以下是參考作者的用法，code 更精簡更簡單

-   不使用 for 迴圈，都使用 map 來運作
-   其中包含解構賦直，要了解
-   reduce 的運用

```javascript =
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));

const seconds = timeNodes
	.map((node) => node.dataset.time)
	.map((timeCode) => {
		const [mins, secs] = timeCode.split(':').map(parseFloat);
		return mins * 60 + secs;
	})
	.reduce((total, vidSeconds) => total + vidSeconds);

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft);
```
