# 21 Geolocation

## 摘要

-   地理資訊的功能

-   功能
    -   抓到指北角度要改畫面
    -   抓到移動速度要更新畫面
-   畫面
    -   指北轉要旋轉
    -   顯示移動速度

## 步驟內容

### 1.先將 Class arrow 、speed 透過 querySelector 抓出來命名為變數 arrow、speed

```javascript =
const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
```

### 2.Geolocation.watchPosition() 來註冊一個處理的函式

-   當使用者的裝置位置更新時，這個函式所傳入的回呼函式(callback function) 就會自動被呼叫，也可以選擇性的定義錯誤時哪些錯誤回呼函式需要被呼叫

```javascript =
navigator.geolocation.watchPosition((data) => {
	console.log(data);
});
```

### 3.取得速度、方位與旋轉角度

-   可以透過 coords.speed 這個方法來取得速度，並用 coords.heading 取得方位，再透過 CSS 將 Class arrow 旋轉角度即可表示現在的方位。此外，如果回傳錯誤的話就在 console 中顯示 err 的內容！

```javascript =
navigator.geolocation.watchPosition(
	(data) => {
		// 若成功取回，則會回傳一組Position(這裡定義名稱為data)
		console.log(data);
		// 使用coords.speed取回速度(公尺/秒)
		speed.textContent = data.coords.speed;
		// 使用coords.heading取得方位，代表偏離北方的角度，0為正北、90為正東
		arrow.style.transform = `rotate(${data.coords.heading}deg)`;
	},
	(err) => {
		// 錯誤回傳訊息，例如未取得定位授權時
		console.error(err);
	}
);
```
