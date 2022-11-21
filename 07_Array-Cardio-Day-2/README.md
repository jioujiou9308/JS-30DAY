# 07 - Array Cardio Day 2

## 摘要

-   有兩個陣列 `people、comments` ，完成題目的要求
-   題目以 `Array.prototype.method()` 為分界
-   練習這些方法：`Array.prototype.some()`、`Array.prototype.every()`、`Array.prototype.find()`、`Array.prototype.findIndex()`

## 使用功能摘要

-   new Date() getFullYear() - [參考文章](https://ithelp.ithome.com.tw/articles/10225167)
-   注意簡潔的寫法，可以多簡潔

## 題目

### 1. 這群人(people)有人已經成年了嗎

-   some(): Array.prototype.some()，只要一個條件符合就回傳 true。(new Date).getFullYear()可以取得當前日期的年份。

```javascript =
const isAdult = people.some(function (adult) {
	if (new Date().getFullYear() - adult.year >= 19) {
		return true;
	}
});
console.log(isAdult);
```

### 2. 這群人(people)全部人都成年了嗎

-   every(): Array.prototype.every()，要每一個都符合條件才回傳 true。`

```javascript =
const allAdult = people.every(function (adult) {
	if (new Date().getFullYear() - adult.year >= 19) {
		return true;
	}
});
console.log(allAdult);
```

### 3. 評論(comments)是否有 id = 823423

-   find():有點類似 filter()，但是 filter 會回傳全部符合的項目，find()則回傳單一項目。

```javascript =
const target = comments.find(function (comment) {
	if (comment.id === 823423) {
		return true;
	}
});
console.log(target);
```

### 4. 找出評論中，id = 542328 是第幾筆

-   findIndex():和 find()功能一樣，只是會查找 index。

```javascript =
const index = comments.findIndex(function (comment) {
	if (comment.id === 542328) {
		return true;
	}
});
console.log(index);
```

### 5. 刪除上提找到該 index 之元素。

-   slice(切割) 寫法

```javascript =
const newComment = [...comments.slice(0, index), ...comments.slice(index + 1)];
console.table(newComment);
// 顯示的是: 全部comments 唯獨沒有 { text: 'Super good', id: 823423 }
```

-   splice(拼接) 寫法
    -   splice(起始位置,刪除幾個元素,要插入的值)
    -   會改變原有的陣列

```javascript =
const newComment = comments.splice(1, 1);
console.log(newComment); // 被刪除的 { text: 'Super good', id: 823423 }
console.table(comments);
//原始陣列，但已經被砍掉 { text: 'Super good', id: 823423 }
```
