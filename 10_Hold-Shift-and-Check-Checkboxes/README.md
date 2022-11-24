# 10 Hold Shift and Check Checkboxes

## 摘要

介紹如何使用 Shift + 左鍵來完成連續區間選取，

## 步驟

### 1. 首先先選取目標物並加入監聽事件 click，並先定義 click 後要施作的方法。

```javascript =
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
// console.log(checkboxes);
checkboxes.forEach((checkbox) => checkbox.addEventListener('click', handleCheck));
```

### 2. handelCheck 設定

-   console.log(checkboxes); 時候可以看到，有打勾的 checkbox 他的 shiftKey 為 true 反之則為 false
-   這邊可以先定義最後一個點擊的是 lastChecked，而這邊用 inBetween 參數當做在兩個 checkbox 之間的內容，若在兩個之間為 true, 其他則會 false。所以最後只要判斷 inBetween 為 true 時打勾即可。

```javascript =
let lastChecked;
// console.log(lastChecked);
function handleCheck(e) {
	// 檢查 是否有按下 shift 這個按鈕
	// 然後檢查那些被打勾了
	let inBetween = false;
	if (e.shiftKey && this.checked) {
		//接者做
		checkboxes.forEach((checkbox) => {
			console.log(checkbox); //這時候拿到的還是全部的checkbox
			//這個判斷式是檢查第一個打勾和按下shitKeu後的第二個打勾之間的input
			if (checkbox === this || checkbox === lastChecked) {
				inBetween = !inbetween;
				console.log('開始檢查他們之間');
			}
			//最後
			if (inBetween) {
				checkbox.checked = true;
			}
		});
	}
	//這個指向的我點的這個checkbox
	lastChecked = this;
	// console.log(lastChecked); // <input type="checkbox" />
}
```

## 可以延伸閱讀

-   querrySelectorAll(") 的各種用法
-   了解 checked 的意思用法
