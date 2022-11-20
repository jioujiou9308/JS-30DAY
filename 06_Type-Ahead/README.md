# 06 - Type Ahead

## 摘要

-   功能
    -   接收到 Json
    -   列出符合關鍵字的項目
-   畫面
    -   列出符合關鍵字的向傅
    -   將關鍵字的部分 mark 起來
    -   顯示該項目的 ' 人口 ' 數字

## 使用功能摘要

-   JS
    -   json
    -   按鈕 change 、 keyup 事件
    -   var re = new RegExp('ab+c') - 正規表達式 [推薦文章](https://5xruby.tw/posts/15min-regular-expression)
    -   replace 函數

## 步驟

1. 先使用 fetch 抓取資料

```javascript =
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
fetch(endpoint).then(function (res) {
	res.json();
});
```

這裡會有個問題抓不到資料，他說因為不知道回傳回來的資料型態是什麼，
雖然我們明確的知道傳回來的資料是 JSON，但如果寫成 JSON.parse(res)，也是不行的

2. 我們要怎麼將抓到的 data 資料()，放進 cities 裡面，這裡要注意幾個點
   如果我們使用 const 宣告變數就不能直接用`(data) => (cities = data)`，
   但如果保持 const 我們可以使用`array.push(data)`的方式，還有一個 but，
   如果直接這樣用，他會是 array 包 array，這不是我們要的結果，解決方法就是
   以...data 展開他

3. 接者要做的是當，使用者輸入程式名稱時，他會篩選打到的字體，先看第一段程式碼
   這裡用到了兩個重要的東西 [正規表達式 Regex-文章參考這裡](https://ithelp.ithome.com.tw/articles/10307314) / 第二個是 [JS Regex 的字串比對](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

```javascript =
function findMatches(wordToMatch, cities) {
	// 開開始篩選，建立篩選的規則(function)
	return cities.filter((place) => {
		return place.city.match(/45/);
	});
}
```

這裡要做的事情是當輸入變數 wordToMatch 時會帶入到 match 中，但是變數不能直接寫在裡面，所以我們要拉出來寫一個 `const regex = new RegExp(wordToMatch, 'gi');`

```javascript =
function findMatches(wordToMatch, cities) {
	// 開開始篩選，建立篩選的規則(function)
	const regex = new RegExp(wordToMatch, 'gi');
	return cities.filter((place) => {
		return place.city.match(regex);
	});
}
```

cities 也可以當作參數帶進去

4. 先製作當我們在 input 裡面數入值的時候，會隨時跟改我們要的 value

```javascript =
function displayMatch() {
	console.log(this.value);
}
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatch);
searchInput.addEventListener('keyup', displayMatch);
```

如果只有 change 事件，他不會隨時更改，要搭配上 keyup 事件

5. 接者把這樣的結果與尋找程式結合，然後再 suggestion 印出來

```javascript =
function displayMatch() {
	const matchArry = findMatches(this.value, cities);
	const html = matchArry
		.map(function (place) {
			return `
            <li>
            <span class='name'>${place.city} , ${place.state} </span>
            <span class='population'>${place.population} </span>
            </li>
          `;
		})
		.join('');
	suggestions.innerHTML = html;
}
```

這了的 join('') 代表的是

6. 最後一步驟，我們想要在使用者輸入的關鍵字中加上背景顏色一樣使用
   const regex
