# 23 - Speech Synthesis

## 摘要

-   語音輸出（speech synthesis）

-   功能
    -   切換不同的聲音（語系）
    -   調整說話速度（聲調改變）
    -   調整咬字速度
    -   要能輸入要唸的內容
    -   可以觸發開始講、暫停
    -   切換聲音時，會先暫停再開始講

## 功能

-   new SpeechSynthesisUtterance()

## 步驟內容

### 1.先搞清楚是如何調用語音轉換，並將其綁在停止與開始按鈕

-   了解 SpeechSynthesisUtterance()裡面的數醒有哪些，分別代表了什麼意思後 ex `const abc =new SpeechSynthesisUtterance()`
-   在 abc 裡面的 text 屬性放入要講的東西`abc.text = 'hellow world'`
-   使用 speechSynthesis.speak('abc')這個功能會直接說出裡面的內容

```javascript =
const voiceMsg = new SpeechSynthesisUtterance();
// 將文字放入boiceMsg裡面的text屬性中
voiceMsg.text = document.querySelector('[name="text"]').value;
// 直接就可以撥放語音功能
// 做一個按鈕來觸發
function toggle(startSpeak = true) {
	if (startSpeak) {
		speechSynthesis.speak(voiceMsg);
	} else {
		speechSynthesis.cancel(voiceMsg);
	}
}
```

-   將其功能事件監聽在停止與開始按鈕中

```javascript =
const stopButton = document.querySelector('#stop');
const speakButton = document.querySelector('#speak');

speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => {
	toggle(false);
});
```

### 2.獲取當前語音的種類，並呈現在網頁上

-   在 speechSynthesis 裡面有個屬性 getVoices ，裡面 voice 的引擎種類並展示到網頁上

```javascript =
// 拿到元素，準備將可使用的語言引琴呈現在這裡
const voicesDropdown = document.querySelector('[name="voice"]');

// 先設定voices 為空陣列，等等可以裝全部的語音引勤
let voices = [];

function showVoices() {
	voices = this.getVoices();
	const optionHTML = voices
		.map((voice) => {
			return `
          <option value="${voice.lang}">${voice.name}(${voice.lang})</option>
          `;
		})
		.join('');
	// console.log(voices);
}

// 監聽speechSynthesis，改變的時候就換語音種類
speechSynthesis.addEventListener('voiceschanged', showVoices);
```

### 3.接下來，當改變語音引勤的時候，要改變發出的聲音，所以要對 voiceMsg 做

-   當 voiceDropdown 改變的時候調用，所以要對此作事件監聽
-   在 f12 中查看 setVoice 裡的 this.value 可以拿到種類 ex : en-US zh-TW
-   再會去看 voiceMsg 可以看到裡面的 voice 屬性，就是當前的引勤種類
    ，所以要來設定
-   可以透過 speechSynthesis 裡面的 lang 去匹配當中的職

```javascript =
function setVoice() {
	// console.log(this.value); //可以拿到類似  en-US  or zh-TW
	// 直接將匹配到的引勤複製給boiceMsg的voice
	voiceMsg.voice = voices.find((voice) => voice.lang === this.value);
	toggle();
}

//當下拉是引勤選項改變時就觸發setVoice
voicesDropdown.addEventListener('change', setVoice);
```

### 4.處理改變語音速度、音高與文本內容，這都是 voiceMsg 裡面的屬性

-   先抓取三個的元素
-   再來事件監聽
-   改變語速 是 voiceMsg 裡面的 rate ，等於是說將我們語速的直，複製給在 voiceMsg 裡面的 rate

```javascript =
// 最後要做語音速度、音高與文本內容，先抓取其中所有的元素
const options = document.querySelector('[type="range"],[name = "text"]');

function setOption() {
	console.log(this.value);
	// es6語法
	voiceMsg[this.name] = this.value;
	toggle();
}

// 對options 做事件監聽
options.forEach((option) => option.addEventListener('change', setOption));
```
