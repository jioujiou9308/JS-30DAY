# 28 - Video Speed Controller

## 摘要

-   功能
    -   拖拉 Range 改變影片播放數度
-   畫面
    -   拖拉 Range 可以顯示目前的速度倍率（格式：nx）

## 內容步驟

### 1. 先抓取元素，對進度條作事件監聽

```javascript =
const video = document.querySelector('.flex');
const target = document.querySelector('.speed');
const bar = document.querySelector('.speed-bar');

// 進度條的事件監聽
target.addEventListener('mousemove', moveHandler);
```

### 2.做 moveHandler 的 function ，包含百分比、顯示撥放速率，需求倍速

-   範圍的比例換算可以這樣 `原比例 * (最大值 -最小值) + 最小值`
-   影片的撥放速率 : playbackRate

```javascript =
function moveHandler(e) {
	const max = 2;
	const min = 0.5;

	const y = e.pageY - this.offsetTop;
	let persent = y / this.offsetHeight;
	// 先處理 bar條的長度
	const height = Math.round(persent * 100) + '%'; //100
	bar.style.height = height;
	//0-1 -> 0.5-2 ，文字的部分也要用心的persent來做
	persent = persent * (max - min) + min;
	bar.textContent = Math.round(persent * 100) / 100 + 'x';
	video.playbackRate = persent;
}
```
