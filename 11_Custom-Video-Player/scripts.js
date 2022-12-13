const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
// 拿到快進與後退的自定義元素
const skipButtons = player.querySelectorAll('[data-skip]');
// 拿到音量與撥放速度元素
const ranges = player.querySelectorAll('.player__slider');
// 拿到進度條與其中進度條的顏色
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

// 做一個撥放與暫停的功能
function togglePlay() {
	console.log(video.paused);
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
// 快進與後退事件
function skip() {
	// console.log('skip...');
	// console.log(this.dataset.skip);
	// 獲得影片目前撥放的時間為currenttime
	video.currentTime += Number(this.dataset.skip);
}
// 音量與撥放速度事件
function handleChange() {
	// 在html中已經寫好對應的name & value，用log來看一下
	video[this.name] = this.value;
}
// 製作影片的進度條
function handleProgress() {
	// 當前時間:video.currentTime，總時間:video.duration ，先拿到撥放進度百分比
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}
//製作當我們點及進度條的位置時，影片的撥放進度會到我們點到的指定位置
function screp(e) {
	// console.log(e);
	const screpTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = screpTime;
}

// 典籍螢幕或是撥放箭都會有撥放雨暫停的效果
video.addEventListener('click', togglePlay);
// 使用viedio的點擊效果來撥放或是暫停
video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
toggle.addEventListener('click', togglePlay);
// 讓快進與後對監聽我們設定的skip事件
skipButtons.forEach((skipBtn) => skipBtn.addEventListener('click', skip));
// 監聽音量與撥放速度的事件
ranges.forEach((range) => range.addEventListener('change', handleChange));
// 使音量與撥放速度事件隨者滑鼠的拖拉來改變
ranges.forEach((range) => range.addEventListener('mousemove', handleChange));
// 在vdeo裡面有一個屬性，隨者撥放時間改變，這樣就可以調用我們寫好的handleProgress
video.addEventListener('timeupdate', handleProgress);
// 監聽當點擊進度條的時候，得到的位置
progress.addEventListener('click', screp);
// 製作屬標案下就可以拖拉影片的進度條
let mousedown = false;
progress.addEventListener('mousedown', () => {
	mousedown = true; // 製作屬標案下就可以拖拉影片的進度條
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
});
progress.addEventListener('mouseup', () => {
	mousedown = false;
});
progress.addEventListener('mousemove', (e) => {
	if (mousedown) {
		screp(e);
	}
});
