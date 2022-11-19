# Array Cardio Day1

## 課堂摘要

作者用了 8 個範例來介紹關於 Array 的各種操作。
`filter 、 map 、 sort 、 reduce`

## 練習題目為

1. 篩選出於 1500~1599 年間出生的 inventor(year in 1500-1599)
2. 將 inventors 內的 first 與 last 組合成一個陣列
3. 依據生日由大至小排序所有的 inventor
4. 加總所有 inventor 的在世時間
5. 依據年齡由大至小排序所有的 inventor
6. 列出 wiki 中巴黎所有包含'de'的路名(在 wiki 中透過 querySelectorAll 來選取資料作篩選)
7. 依據 lastName 排序所有 people 的資料(小到大)
8. 分別計算 data 內每個種類的數量

### 1.篩選出於 1500~1599 年間出生的 inventor(year in 1500-1599)

-   `filter()`: 用來過濾物件條件中的選項，並收集回傳 true 的陣列。
-   console.table() 以 table 方式呈現

```javascript =
const fifteen = inventors.filter(function (inventor) {
	if (inventor.year >= 1500 && inventor.year <= 1600) {
		return true;
	}
});
```

-   arrow function 可寫成

```javascript =
const q1Answer = inventors.filter((inventor) => inventor.year >= 1500 && inventor.year <= 1600);
console.table(q1Answer);
```

### 2.將 inventors 內的 first 與 last 組合成一個陣列

-   透過 `map` 來將 firstName/lastNam 組合返回陣列

```javascript =
const nameFilter = inventors.map((item) => item.first + '' + item.last);
console.table(nameFilter);
```

### 3. 依據生日由大至小排序所有的 inventor

[sort youtube 講解](https://www.youtube.com/watch?v=R5dGFQaOC20&ab_channel=DansonLin)

[sort 參考文章](https://ithelp.ithome.com.tw/articles/10225733)

-   sort() 定義

`先了解規則 x:後面的元素 , y:前面的元素`

```javascript =
let arry = [5,8,2,61]
arry.sort(function(x,y){
    console.log('規則:' x '-' y '=' (x-y))
})
//規則 8-5 = 3;
//規則 2-8 = -5;
//規則 61-2 = 59;
```

-   當 function(x,y )返回直`小於 0` , x 會被移動到 y 的`前面`
-   當 function(x,y )返回直`大於 0` , x 會被移動到 y 的`後面`
-   當 function(x,y )返回直`等於 0`， 則`不變動`

### 4.加總所有 inventor 的在世時間

[ reduce 參考文章](https://ithelp.ithome.com.tw/articles/10299767)

以往的寫法

```javascript =
let totalYears = 0;
for (let i = 0; i < inventors.length; i++) {
	let liveYear = inventors[i].passed - inventors[i].year;
	totalYears += liveYear;
}
```

現在使用 reduce

```javascript =
const totleYear = inventors.reduce((total, inventor) => {
	return total + (inventor.passed - inventor.year);
}, 0);
console.log(totleYear);
```

### 5.依據年齡由大至小排序所有的 inventor

一樣是使用 sort 不過加入簡單的計算，這次是依照年齡大到小
當計算出年齡後，就照者上方文章的解釋，邏輯可分為幾個步驟

1. 大到小所以是降冪
2. 記住規則 x:後方元素(xlive) ，y:前方元素(ylive)
3. 當回傳直是大於 0 x 會跑到 y 的後方
4. 為了要讓回傳值正 ylive - xlive > 0 所以為降冪

### 6.列出 wiki 中巴黎所有包含'de'的路名(在 wiki 中透過 querySelectorAll 來選取資料作篩選)

1. 先知道我們要的資料是在 wiki 包在哪一個 class 中然後抓取他-querySelector
2. 接者在往下抓，使用 querySelectorAll
3. 接者使用 map 抓取每個 link 中的內容，但這時會發現沒辦法使用因為 querySelectorAll 抓到的東西嚴格來說並不是陣列，當我們點開 links 抓到的東西
   會發現，prototype 裡面只有 foreach 沒有 map，所以作者在外面加上 arry.from
4. 最後使用 filter 與 includes

### 7.依據 lastName 排序所有 people 的資料

-   這題主要根據 last name 的英文字母去做排序(算昇冪的一種)
-   使用 sort 與 split 工具 / [split 解釋看更多](https://medium.com/@bebebobohaha/slice-splice-split-%E5%82%BB%E5%82%BB%E5%88%86%E4%B8%8D%E6%B8%85-46d9c8992729) /

這題與上提不同的地方在於，字串無法使用 return a-b or b-a 這種方式
所以使用三元運算子`alast > blast ? 1:-1`，如果大於的話就回傳 1 (代表正數，x 排在 y 後面)

### 8.分別計算 data 內每個種類的數量

```javascript =
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];

const transportation = data.reduce(function (obj, item) {
	// 若 obj 物件沒有 item 屬性(item 為 data 內的各元素)，就增加該屬性，並設定值為 0

	if (!obj[item]) {
		obj[item] = 0;
	}
	// 再次碰到該屬性的話，值+1
	obj[item]++;
	return obj;
}, {});
```

要知道這題，要熟悉物件功能，[請參考](https://www.fooish.com/javascript/object.html)
