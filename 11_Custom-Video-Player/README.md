# 11 - Custom Video Player

## 摘要

-   功能
    -   和預設介面相同的功能
    -   play、pause、跳到指定時間、音量調整、播放速度、往前 10 秒、往後 5 秒
-   畫面
    -   縮起來剩下進度條
    -   Hover 整個出現

## 功能

css

-   flex-basis

## 內容步驟

### 1. 先拿到元素節點，先做撥放與暫停的按鈕

```javascript =
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
// 做一個撥放與暫停的功能
function togglePlay() {
	console.log(video.paused);
	const method = video.paused ? 'play' : 'pause';
	video[method]();
	// 判斷播放或暫停與下面if的判斷一樣
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}
// 製作改變撥放與暫停的圖標，並使用video的play與pause 來監聽 updateToggle
function updateToggle() {
	const icon = video.paused ? '►' : '❚❚';
	toggle.textContent = icon;
}

// 典籍螢幕或是撥放箭都會有撥放雨暫停的效果
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
toggle.addEventListener('click', togglePlay);
```

### 2.製作快進與後退

-   就是拿到當前影片撥放的時間，來增加時間或是減少時間

```javascript =
// 拿到快進與後退的自定義元素
const skipButtons = player.querySelectorAll('[data-skip]');
// 讓快進與後對監聽我們設定的skip事件
skipButtons.forEach((skipBtn) => skipBtn.addEventListener('click', skip));
//再來獲取對應的值
//在skip function 中使用 this.dataset.skip便可以拿到自訂的屬性值
function skip() {
	// console.log('skip...');
	// console.log(this.dataset.skip);
	// 獲得影片目前撥放的時間為currenttime
	// this.dataset.skip是string 所以要轉換類型
	video.currentTime += Number(this.dataset.skip);
}
```

### 3.做音量與撥放速度的控制

-比較特別的是使用了 video[method]的寫法，來直接操作 video 的屬性， 直接用影片是否已暫停 paused 來做判斷。

```javascript =
// 拿到音量與撥放速度元素
const ranges = player.querySelectorAll('.player__slider');
// 監聽音量與撥放速度的事件
// 因為是滑動隨時都在改變狀態，所以是change
ranges.forEach((range) => range.addEventListener('change', handleChange));

// 針對音量還有撥放速度的屬性值分別為 volum 、 playbackRate
// 音量與撥放速度事件
function handleChange() {
	// 在html中已經寫好對應的name & value，用log來看一下
	console.log(this.name);
	console.log(this.value);
	video[this.name] = this.value;
}
```

-   做到這裡已經可以有音量與撥放速度的功能，但是因為我們使用的是 change 的事件，所以沒有辦法平滑的去改變，只有點下去拿喜來的瞬間才可以監聽的道便改變音量或是速度的值
-   所以只要再多監聽一個事件就可以

```javascript =
// 使音量與撥放速度事件隨者滑鼠的拖拉來改變
ranges.forEach((range) => range.addEventListener('mousemove', handleChange));
```

### 4.製作影片的進度條

-   先拿到對應在 html 中的元素

```javascript =
// 拿到進度條與其中進度條的顏色
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
// 製作進度條的百分比
function handleProgress() {
	// 當前時間:video.currentTime，總時間:video.duration ，先拿到撥放進度百分比
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

接下來就是考慮要什麼時候來調用這個進度條版分比的函示;
// 在vdeo裡面有一個屬性，隨者撥放時間改變，這樣就可以調用我們寫好的handleProgress
video.addEventListener('timeupdate', handleProgress);
```

### 5.製作當我們點及進度條的位置時，影片的撥放進度會到我們點到的指定位置

-   這裡的解釋是，第四步驟我們是更具撥放時間來影響顯示的進度條，但如果是以點擊進度條的方式，我們就要知道當前點擊的位置，換算過來是當前影片撥放到的是哪一個時間點，裡面有一個`offsetX`可以使用，並與撥放時間拿來做數學的比運算

```javascript =
function screp(e) {
	// console.log(e);
	const screpTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = screpTime;
}
```

-   再來增加點擊並且拖動進度條，就可以一定撥放進度，但是不能只有 mousemove，還要加上鼠標點下的判斷

```javascript =
// 製作屬標案下就可以拖拉影片的進度條
let mousedown = false;
progress.addEventListener('mousedown', () => {
	mousedown = true;
});
progress.addEventListener('mouseup', () => {
	mousedown = false;
});
progress.addEventListener('mousemove', (e) => {
	if (mousedown) {
		screp(e);
	}
});
```

## HTML5 語法&備註

Video & Media Element
這次的主軸是 HTML 的 video 標籤，所以滿多操作都是直接操作 video 的屬性，
例如偵測暫停的 paused 或是當前播放時間 currentTime，
但其實這些屬性並非 video 獨有的，而是 HTML Media Element，好比說 audio 也會有。

> 參閱：
> [MDN-Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)  
> [CSS flex-basis Property](https://www.w3schools.com/cssref/css3_pr_flex-basis.php)  
> [HTMLMediaElement](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLMediaElement)
