# 20 - Speech Detection

## 摘要

-   語音輸入的功能：

-   功能、畫面
    -   講話要變文字在畫面上
    -   停頓太久要分段

## 內容步驟

### 1.先將 SpeechRecognition 建立起來

-   interimResults 是 SpeechRecognition 裡面的屬性，如果為 true 就是可以獲得語音識別的結果

```javascript =
// 將全域環境中的SpeechRecognition指好(依據不同瀏覽器)
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// 建立一個變數recognition來放為語音識別功能
const recognition = new SpeechRecognition();
// 讓語音識別回傳識別後的資訊（預設為false)
recognition.interimResults = true;
// 將語音識別翻譯為中文
recognition.lang = 'zh-TW';
```

### 2. 接者對識別系統做監聽

-   因為當我們說了一段話中間有間隔，系統就會當作是結束，所以就要再繼續開啟

```javascript =
// 對識別系統做監聽
recognition.addEventListener('result', (e) => {
	console.log(e);
});
// 連續監聽與新系統，結束時再開啟
recognition.addEventListener('end', recognition.start);
// 除了監聽還要開始語音識別的模式
recognition.start();
```

### 3.處理我們語音得到的結果

-   `console.log(e.result)` 可以看到我們講的話是存放在 e.result 裡面
-   所以將其內容轉化成陣列的方式存進設定好的變數中 (transcript)- 記得轉化成陣列
-   `console.log(transcript)` 可以得到語音識別在陣列中的元素
-   所以要用 map 將結果拿出來-將內容一層一層的拿出來，最終只有我們講出的語音內容

```javascript =
recognition.addEventListener('result', (e) => {
	console.log(e.result);
	// 將拿到的結果轉化成陣列
	const transcript = Array.from(e.result)
		.map((result) => result[0])
		.map((result) => result.transcript)
		.join('');
	// console.log(transcript)
});
```

-   以上 transcript 就是最終拿到的語音識別內容

### 4.將語音識別的內容呈現在頁面上

```javascript
// 將拿到的語音內容呈現在畫面上，先抓取元素
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChiled(p);

recognition.addEventListener('result', (e) => {
...略
p.textContent = transcript;
});
```

-   做到這裏可以將語音識別的內容呈現在畫面上就有基本的功能了，但會遇到一個問題，當我們重新講話時，原先呈現在畫面上的內容會消失，重新再呈現一次

### 5.解決消失的語音內容

-   在監聽事件裡面加上一個判斷，當 p 元素結束時，在創建一個 p 元素

```javascript =
recognition.addEventListener('result', (e) => {
...略
if (e.results[0].isFinal) {
	p = document.createElement('p');
	words.appendChild(p);
}

});
```

### 6.接下來就可以做一些變化，將逗號變成，..

```javascript =
let filter = transcript.replace('逗號', '，').replace('冒號', ':');
```

-   也可以在語音識別的內容增加一些判斷，像是 clear，就清空頁面

```javascript =
// 增加語音內容，清空畫面
if (transcript.include('clear')) {
	words.innerHTML = '';
}
```
