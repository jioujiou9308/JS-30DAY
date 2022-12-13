# 17 - Sort Without Articles

## 摘要

-   透過 Array.sort() 排序一個 Array，但是排序不考慮 "The"、"An"、"A" 這些字眼

-   功能
    -   排序不考慮 "The"、"An"、"A" 這些字眼
-   畫面
    -   顯示排序結果

## 功能

-   sort()
-   replace('')
-   規則表達式

## 內容

### 1.先將陣列中的內容作 sort 升序的排序

```javascript =
const sortedBands = bands.sort(function (a, b) {
	if (a > b) {
		return 1;
	} else {
		return -1;
	}
});

//利用箭頭函數與三元運算式的簡寫：
const sortedBands = bands.sort((a, b) => (strip(a) > strip(b) ? 1 : -1));
```

### 2.做好升序排序後我們要開始將包含有"The"、"An"、"A"的字眼排除

-   先建立一個 replace function ，使用正規表達式來做
-   再將其放入 sort 的 function 中

```javascript =
function strip(bandName) {
	return bandName.replace(/^(a|an|the)/i, '');
}
```

### 3.將整理好的內容呈現在畫面上

```javascript =
const content = document.querySelector('#bands');
content.innerHTML = sortedBands
	.map((band) => {
		return `
        <li>${band}</li>
        `;
	})
	.join('');

//使用join('')修改連結符號為空白, 否則原先陣列的分隔符號是,也會一併渲染在html中。
```

## 補充筆記

[sort 用法筆記](https://accessible-brownie-b60.notion.site/Sort-410c3258d3e847abbf2ec3d85b540d24)

[正規表達式筆記]()
